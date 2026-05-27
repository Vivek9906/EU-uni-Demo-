import type { Metadata } from 'next';
import { Image as ImageIcon } from 'lucide-react';

export const metadata: Metadata = { title: 'Gallery', description: 'Photo gallery showcasing AMU campus, events, and student life.' };

const albums = [
  { name: 'Campus Life', count: 12 }, { name: 'Commencement Ceremonies', count: 8 }, { name: 'Leadership Summits', count: 6 }, { name: 'Student Activities', count: 10 },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main"><span className="section-label">Media</span><h1 className="text-4xl font-heading font-bold mb-4">Photo Gallery</h1><p className="text-lg text-foreground-secondary">Explore moments from AMU&apos;s campus, events, and academic life.</p></div>
      </section>
      <section className="section-padding">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div key={album.name} className="card group cursor-pointer overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
                </div>
                <div className="p-4"><h3 className="font-heading text-sm font-bold">{album.name}</h3><p className="text-xs text-foreground-muted">{album.count} photos</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
