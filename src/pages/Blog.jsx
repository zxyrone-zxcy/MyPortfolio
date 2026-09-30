import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import '../styles/blog.css';

const posts = [
  {
    category: 'Notes on learning',
    title: 'Turning curiosity into a practice',
    excerpt: 'A few thoughts on learning technical skills steadily, asking better questions, and letting small projects teach you what to explore next.',
    date: 'A work in progress',
  },
  {
    category: 'Software & systems',
    title: 'Making useful things feel simple',
    excerpt: 'Good interfaces and dependable systems often come from noticing friction and making the next step easier to understand.',
    date: 'A work in progress',
  },
  {
    category: 'Data & decisions',
    title: 'From information to insight',
    excerpt: 'Data becomes more useful when the question is clear, the context is visible, and the result can support a real decision.',
    date: 'A work in progress',
  },
];

export default function Blog() {
  const pageRef = useRef(null);
  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll('.reveal-on-scroll');
    if (!nodes?.length) return undefined;
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <main className="blog-page page-width" ref={pageRef}>
      <header className="blog-heading">
        <h1 className="section-title">Ideas, in progress.</h1>
        <p className="section-subtitle">A journal about building with code, learning from data, and finding clarity in the details.</p>
      </header>
      <section className="blog-grid" aria-label="Blog posts">
        {posts.map((post, index) => (
          <article className="blog-card reveal-on-scroll" key={post.title} style={{ transitionDelay: `${index * 100}ms` }}>
            <div className="blog-card-top"><span><BookOpen size={15} /> {post.category}</span><span>{post.date}</span></div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </section>
      <p className="blog-note">More writing will appear here as projects and ideas take shape.</p>
    </main>
  );
}
