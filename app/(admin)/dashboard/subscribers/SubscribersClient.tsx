'use client';

import { useState, useEffect } from 'react';
import { Mail, Users, CheckCircle, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card } from '@/components/admin/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/admin/ui/Table';
import { Badge } from '@/components/admin/ui/Badge';

export default function SubscribersClient() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin/subscribers?limit=100');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: `Broadcast sent to ${data.count} active subscribers successfully.` });
        setSubject('');
        setMessage('');
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to send broadcast.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSending(false);
    }
  };

  const activeCount = subscribers.filter(s => s.isActive).length;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Newsletter Subscribers" 
        description="Manage your subscribers and send broadcast emails."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-md">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Send Broadcast Email</h3>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              This will send an email to all <strong>{activeCount} active</strong> subscribers.
            </p>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  placeholder="Newsletter Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (HTML supported)</label>
                <textarea
                  required
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                  placeholder="<p>Hello subscribers...</p>"
                />
              </div>
              
              {statusMsg && (
                <div className={`p-3 rounded-md text-sm flex items-start gap-2 ${statusMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {statusMsg.type === 'success' ? <CheckCircle size={16} className="mt-0.5" /> : <XCircle size={16} className="mt-0.5" />}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSending || activeCount === 0}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                {isSending ? 'Sending...' : 'Send Broadcast'}
              </button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-md">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">Recent Subscribers</h3>
              </div>
              <Badge variant="outline">{subscribers.length} Total</Badge>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center text-gray-500 text-sm">Loading subscribers...</div>
            ) : subscribers.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No subscribers found.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((sub, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{sub.email}</TableCell>
                      <TableCell className="text-gray-500">{sub.name || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={sub.isActive ? 'success' : 'secondary'}>
                          {sub.isActive ? 'Active' : 'Unsubscribed'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 whitespace-nowrap">
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
