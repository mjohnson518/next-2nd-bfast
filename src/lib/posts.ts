import db from './db';
import { Post, PostListItem, PaginatedResult, Category, Tag } from './types';

export async function getPosts(page = 1, pageSize = 10): Promise<PaginatedResult<PostListItem>> {
  const offset = (page - 1) * pageSize;
  
  // Get the total count
  const countResult = db.prepare('SELECT COUNT(*) as count FROM posts WHERE status = ?').get('published');
  const total = countResult.count;
  
  // Get the posts for the current page
  const posts = db.prepare(`
    SELECT 
      id, title, slug, excerpt, cover_image as coverImage,
      published_at as publishedAt, featured, reading_time as readingTime
    FROM posts
    WHERE status = ?
    ORDER BY published_at DESC
    LIMIT ? OFFSET ?
  `).all('published', pageSize, offset);
  
  // For each post, get the author, categories, etc.
  const postsWithRelations = posts.map(post => {
    const author = db.prepare(`
      SELECT id, name, avatar FROM authors WHERE id = (
        SELECT author_id FROM posts WHERE id = ?
      )
    `).get(post.id);
    
    const categories = db.prepare(`
      SELECT c.name, c.slug FROM categories c
      JOIN post_categories pc ON c.id = pc.category_id
      WHERE pc.post_id = ?
    `).all(post.id);
    
    return {
      ...post,
      author,
      categories
    };
  });
  
  return {
    data: postsWithRelations,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const categories = db.prepare(`
    SELECT id, name, slug, description FROM categories
  `).all();
  
  return categories;
}

// Get all tags
export async function getTags(): Promise<Tag[]> {
  const tags = db.prepare(`
    SELECT id, name, slug FROM tags
  `).all();
  
  return tags;
}

// Add this to your posts.ts file
export async function getPostBySlug(slug: string): Promise<Post | null> {
    // First check if the post exists
    const post = db.prepare(`
      SELECT 
        id, title, slug, excerpt, content, cover_image as coverImage,
        published_at as publishedAt, featured, reading_time as readingTime,
        author_id as authorId, status
      FROM posts
      WHERE slug = ? AND status = ?
    `).get(slug, 'published');
    
    if (!post) {
      return null;
    }
    
    // Get the author
    const author = db.prepare(`
      SELECT id, name, avatar, bio FROM authors WHERE id = ?
    `).get(post.authorId);
    
    // Get categories
    const categories = db.prepare(`
      SELECT c.id, c.name, c.slug, c.description FROM categories c
      JOIN post_categories pc ON c.id = pc.category_id
      WHERE pc.post_id = ?
    `).all(post.id);
    
    // Get tags
    const tags = db.prepare(`
      SELECT t.id, t.name, t.slug FROM tags t
      JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `).all(post.id);
    
    return {
      ...post,
      author,
      categories,
      tags
    };
  }