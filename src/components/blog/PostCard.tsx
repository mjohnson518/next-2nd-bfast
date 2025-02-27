// src/components/blog/PostCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { PostListItem } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';

import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ActionButton from '@/components/ActionButton';

interface PostCardProps {
  post: PostListItem;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card title={post.title}>
      {post.coverImage && (
        <div className="post-image">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            width={800}
            height={400}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      
      <div className="post-meta">
        <span>{formatDate(post.publishedAt)}</span>
        {post.readingTime && (
          <span> • {post.readingTime} min read</span>
        )}
      </div>
      
      <div className="post-excerpt">{post.excerpt}</div>
      
      <div className="post-categories">
        {post.categories.map(category => (
          <Badge key={category.slug}>
            {category.name}
          </Badge>
        ))}
      </div>
      
      <Link href={`/post/${post.slug}`} passHref>
        <ActionButton>
          Read More
        </ActionButton>
      </Link>
    </Card>
  );
}