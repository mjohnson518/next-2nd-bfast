// src/components/blog/PostContent.tsx
import React from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';

import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';

import CardDouble from '@/components/CardDouble';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import Divider from '@/components/Divider';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <CardDouble title={post.title}>
      <div className="post-header">
        <div className="post-meta">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && (
            <span> • {post.readingTime} min read</span>
          )}
        </div>
        
        <div className="post-categories">
          {post.categories.map(category => (
            <Badge key={category.slug}>
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {post.coverImage && (
        <div className="post-cover">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            width={1200}
            height={600}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      
      <div className="post-content">
        {/* This assumes you're using MDX for content */}
        <MDXRemote {...post.content} />
      </div>
      
      <Divider type="DOUBLE" />
      
      <div className="post-author">
        <Avatar 
          src={post.author.avatar} 
          href={`/author/${post.author.id}`}
        >
          <div>
            {post.author.name}
            <br />
            {post.author.bio && <small>{post.author.bio}</small>}
          </div>
        </Avatar>
      </div>
      
      <div className="post-tags">
        {post.tags.map(tag => (
          <Badge key={tag.slug}>
            #{tag.name}
          </Badge>
        ))}
      </div>
    </CardDouble>
  );
}