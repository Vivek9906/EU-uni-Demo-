import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminLegalPage() {
  const pages = await prisma.legalPage.findMany({
    orderBy: { updatedAt: 'desc' }
  });

  async function deletePage(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.legalPage.delete({ where: { id } });
    revalidatePath('/dashboard/legal');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Manage Legal Pages</h1>
        <Link href="/dashboard/legal/new" className="btn-primary gap-2 text-sm py-2">
          <Plus size={16} /> Add Legal Page
        </Link>
      </div>

      <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-subtle border-b border-border">
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Title</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Slug</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Last Updated</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-foreground-muted">No legal pages found.</td>
              </tr>
            ) : (
              pages.map(page => (
                <tr key={page.id} className="hover:bg-background-subtle/50">
                  <td className="p-4 text-sm font-medium">{page.title}</td>
                  <td className="p-4 text-sm">{page.slug}</td>
                  <td className="p-4 text-sm">{new Date(page.updatedAt).toLocaleDateString()}</td>
                  <td className="p-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/legal/${page.id}/edit`} className="p-1.5 text-primary hover:bg-primary/10 rounded">
                        <Edit size={16} />
                      </Link>
                      <form action={deletePage}>
                        <input type="hidden" name="id" value={page.id} />
                        <button type="submit" className="p-1.5 text-error hover:bg-error/10 rounded" onClick={(e) => {
                          if (!confirm('Are you sure you want to delete this page?')) e.preventDefault();
                        }}>
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
