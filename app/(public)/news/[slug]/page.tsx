import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return (
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <Link href="/news" className="text-sm text-primary hover:text-primary-light mb-6 inline-flex items-center gap-1"><ArrowLeft size={14} /> Back to News</Link>
        <article>
          <span className="badge-primary mb-3 block w-fit">News</span>
          <h1 className="text-3xl font-heading font-bold mb-4">News Article</h1>
          <p className="text-foreground-secondary">Article: {params.slug}</p>
        </article>
      </div>
    </section>
  );
}
