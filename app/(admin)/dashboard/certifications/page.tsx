import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminCertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function deleteCert(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.certification.delete({ where: { id } });
    revalidatePath('/dashboard/certifications');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Manage Certifications</h1>
        <Link href="/dashboard/certifications/new" className="btn-primary gap-2 text-sm py-2">
          <Plus size={16} /> Add Certification
        </Link>
      </div>

      <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-subtle border-b border-border">
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Title</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Category</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Bundle</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Active</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certifications.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-foreground-muted">No certifications found.</td>
              </tr>
            ) : (
              certifications.map(cert => (
                <tr key={cert.id} className="hover:bg-background-subtle/50">
                  <td className="p-4 text-sm font-medium">{cert.title}</td>
                  <td className="p-4 text-sm capitalize">{cert.category}</td>
                  <td className="p-4 text-sm">{cert.isBundle ? 'Yes' : 'No'}</td>
                  <td className="p-4 text-sm">{cert.isActive ? 'Yes' : 'No'}</td>
                  <td className="p-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/certifications/${cert.id}/edit`} className="p-1.5 text-primary hover:bg-primary/10 rounded">
                        <Edit size={16} />
                      </Link>
                      <form action={deleteCert}>
                        <input type="hidden" name="id" value={cert.id} />
                        <button type="submit" className="p-1.5 text-error hover:bg-error/10 rounded" onClick={(e) => {
                          if (!confirm('Are you sure you want to delete this certification?')) e.preventDefault();
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
