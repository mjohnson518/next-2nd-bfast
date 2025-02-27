// src/lib/types/index.ts

// Basic user/author information
export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  }
  
  // Category for organizing posts
  export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
  }
  
  // Tags for posts
  export interface Tag {
    id: string;
    name: string;
    slug: string;
  }
  
  // Basic post type
  export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    author: Author;
    categories: Category[];
    tags: Tag[];
    publishedAt: string; // ISO date string
    updatedAt?: string;  // ISO date string
    featured?: boolean;
    status: 'draft' | 'published';
    readingTime?: number; // estimated reading time in minutes
  }
  
  // Type for a post list item (less data than a full post)
  export interface PostListItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: string;
    author: {
      name: string;
      avatar?: string;
    };
    categories: Pick<Category, 'name' | 'slug'>[];
    publishedAt: string;
    featured?: boolean;
    readingTime?: number;
  }
  
  // Type for paginated results
  export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }