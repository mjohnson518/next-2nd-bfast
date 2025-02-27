// src/app/post/[slug]/page.tsx
import { getPostBySlug } from '@/lib/posts';
import PostContent from '@/components/blog/PostContent';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Serialize the Markdown content
  const mdxSource = await serialize(post.content);
  
  return (
    <main>
      <PostContent post={post} mdxSource={mdxSource} />
    </main>
  );
}