import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminStudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function deleteStudent(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.student.delete({ where: { id } });
    revalidatePath('/dashboard/students');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Manage Students</h1>
        <Link href="/dashboard/students/new" className="btn-primary gap-2 text-sm py-2">
          <Plus size={16} /> Add Student
        </Link>
      </div>

      <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-subtle border-b border-border">
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Enrollment ID</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Name</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Program</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Status</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary">Public</th>
              <th className="p-4 font-semibold text-sm text-foreground-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-foreground-muted">No students found.</td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id} className="hover:bg-background-subtle/50">
                  <td className="p-4 text-sm font-medium">{student.enrollmentId}</td>
                  <td className="p-4 text-sm">{student.fullName}</td>
                  <td className="p-4 text-sm">{student.programName} ({student.programLevel})</td>
                  <td className="p-4 text-sm capitalize">{student.status}</td>
                  <td className="p-4 text-sm">{student.isPubliclyVisible ? 'Yes' : 'No'}</td>
                  <td className="p-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/students/${student.id}/edit`} className="p-1.5 text-primary hover:bg-primary/10 rounded">
                        <Edit size={16} />
                      </Link>
                      <form action={deleteStudent}>
                        <input type="hidden" name="id" value={student.id} />
                        <button type="submit" className="p-1.5 text-error hover:bg-error/10 rounded" onClick={(e) => {
                          if (!confirm('Are you sure you want to delete this student?')) e.preventDefault();
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
