// src/app/page.tsx
import { getPosts, getFeaturedPosts } from '@/lib/posts';
import PostList from '@/components/blog/PostList';
import Grid from '@/components/Grid';
import Row from '@/components/Row';
import Card from '@/components/Card';

export default async function Home() {
  const { data: posts } = await getPosts(1, 5);
  const featuredPosts = await getFeaturedPosts(3);
  
  return (
    <main>
      <Grid>
        <Row>
          <Card title="FEATURED POSTS">
            <PostList posts={featuredPosts} />
          </Card>
        </Row>
        
        <Row>
          <Card title="LATEST POSTS">
            <PostList posts={posts} />
          </Card>
        </Row>
      </Grid>
    </main>
  );
}