// src/components/blog/PostList.tsx
import React from 'react';
import { PostListItem } from '@/lib/types';
import PostCard from './PostCard';
import Grid from '@/components/Grid';
import Row from '@/components/Row';

interface PostListProps {
  posts: PostListItem[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="no-posts">
        No posts found. Check back soon!
      </div>
    );
  }

  return (
    <Grid>
      {posts.map(post => (
        <Row key={post.id}>
          <PostCard post={post} />
        </Row>
      ))}
    </Grid>
  );
}