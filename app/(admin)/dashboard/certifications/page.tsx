import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { PageHeader } from '@/components/admin/PageHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/admin/ui/Table';
import { Badge } from '@/components/admin/ui/Badge';

export const dynamic = 'force-dynamic';

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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <PageHeader 
          title="Manage Certifications" 
          description="Create, update, and manage professional certifications." 
        />
        <Link 
          href="/dashboard/certifications/new" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] disabled:pointer-events-none disabled:opacity-50 bg-[#1B3A6B] text-white hover:bg-[#0F2347] shadow-sm h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Certification
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Bundle</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No certifications found.
                </TableCell>
              </TableRow>
            ) : (
              certifications.map(cert => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium text-gray-900">{cert.title}</TableCell>
                  <TableCell className="capitalize">{cert.category}</TableCell>
                  <TableCell>
                    {cert.isBundle ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {cert.isActive ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="danger">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link 
                        href={`/dashboard/certifications/${cert.id}/edit`} 
                        className="inline-flex items-center justify-center rounded-md h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <form action={deleteCert}>
                        <input type="hidden" name="id" value={cert.id} />
                        <DeleteButton confirmMessage="Are you sure you want to delete this certification?" />
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
