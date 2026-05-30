'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Image as ImageIcon, FileText, LayoutTemplate, Film } from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/admin/ui/Table';
import { Button } from '@/components/admin/ui/Button';
import { Badge } from '@/components/admin/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { toast } from 'react-hot-toast';

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  category: string;
  isPublished: boolean;
  imageUrl?: string;
  bannerImage?: string;
  thumbnailImage?: string;
  galleryImages?: string;
  brochurePdf?: string;
}

export function EventsClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', endDate: '', venue: '', category: 'Conference',
    imageUrl: '', bannerImage: '', thumbnailImage: '', galleryImages: '', brochurePdf: '', isPublished: false
  });

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: (event as any).description || '',
        date: new Date(event.date).toISOString().slice(0, 16),
        endDate: (event as any).endDate ? new Date((event as any).endDate).toISOString().slice(0, 16) : '',
        venue: event.venue,
        category: event.category,
        imageUrl: event.imageUrl || '',
        bannerImage: event.bannerImage || '',
        thumbnailImage: event.thumbnailImage || '',
        galleryImages: event.galleryImages || '',
        brochurePdf: event.brochurePdf || '',
        isPublished: event.isPublished
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '', description: '', date: '', endDate: '', venue: '', category: 'Conference',
        imageUrl: '', bannerImage: '', thumbnailImage: '', galleryImages: '', brochurePdf: '', isPublished: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEvent ? `/api/admin/events/${editingEvent.id}` : '/api/admin/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');
      
      toast.success(editingEvent ? 'Event updated' : 'Event created');
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Event deleted');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Manage Events</h2>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Media Assets</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Loading events...
                </TableCell>
              </TableRow>
            ) : events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No events found.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                    {event.title}
                    <div className="text-xs text-gray-500 mt-1">{event.category}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(event.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 text-gray-400">
                      <span title="Main Image"><ImageIcon className={`h-4 w-4 ${event.imageUrl ? 'text-emerald-500' : ''}`} /></span>
                      <span title="Banner"><LayoutTemplate className={`h-4 w-4 ${event.bannerImage ? 'text-emerald-500' : ''}`} /></span>
                      <span title="Gallery"><Film className={`h-4 w-4 ${event.galleryImages ? 'text-emerald-500' : ''}`} /></span>
                      <span title="Brochure PDF"><FileText className={`h-4 w-4 ${event.brochurePdf ? 'text-emerald-500' : ''}`} /></span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={event.isPublished ? 'success' : 'secondary'}>
                      {event.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(event)}>
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </Button>
                      <DeleteButton onDelete={() => handleDelete(event.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
              {editingEvent ? 'Edit Event' : 'Add Event'}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input type="datetime-local" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
              </div>

              {/* Media Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Media & Attachments
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Main Image URL</label>
                    <input type="url" placeholder="https://" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Banner Image URL</label>
                    <input type="url" placeholder="https://" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={formData.bannerImage} onChange={e => setFormData({...formData, bannerImage: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Thumbnail Image URL</label>
                    <input type="url" placeholder="https://" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={formData.thumbnailImage} onChange={e => setFormData({...formData, thumbnailImage: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Event Brochure (PDF URL)</label>
                    <input type="url" placeholder="https://" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={formData.brochurePdf} onChange={e => setFormData({...formData, brochurePdf: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gallery Images (Comma separated URLs)</label>
                    <textarea rows={2} placeholder="https://image1.jpg, https://image2.jpg" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={formData.galleryImages} onChange={e => setFormData({...formData, galleryImages: e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#1B3A6B] rounded border-gray-300" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
                  <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update Event' : 'Save Event'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
