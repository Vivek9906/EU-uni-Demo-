'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/admin/ui/Table';
import { Button } from '@/components/admin/ui/Button';
import { Badge } from '@/components/admin/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { toast } from 'react-hot-toast';

interface Testimonial {
  id: string;
  name: string;
  program: string;
  content: string;
  isApproved: boolean;
  submittedAt: string;
}

export function TestimonialsClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: !currentStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(currentStatus ? 'Testimonial rejected' : 'Testimonial approved');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Testimonial</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Loading testimonials...
              </TableCell>
            </TableRow>
          ) : testimonials.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No testimonials found.
              </TableCell>
            </TableRow>
          ) : (
            testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-medium text-gray-900 whitespace-nowrap">{testimonial.name}</TableCell>
                <TableCell className="whitespace-nowrap">{testimonial.program}</TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 max-w-[300px] truncate" title={testimonial.content}>
                    {testimonial.content}
                  </p>
                </TableCell>
                <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(testimonial.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={testimonial.isApproved ? 'success' : 'warning'}>
                    {testimonial.isApproved ? 'Approved' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleApproval(testimonial.id, testimonial.isApproved)}
                      className={testimonial.isApproved ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50" : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"}
                    >
                      {testimonial.isApproved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <DeleteButton onDelete={() => handleDelete(testimonial.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
