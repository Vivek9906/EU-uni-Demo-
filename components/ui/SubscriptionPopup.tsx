'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

export function SubscriptionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem('euau_newsletter_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('euau_newsletter_seen', 'true');
      }, 15000); // 15 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 bg-background-subtle rounded-full text-foreground-secondary hover:text-foreground transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="bg-primary p-8 text-center text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send size={24} className="text-white" />
          </div>
          <h3 className="font-heading font-bold text-2xl mb-2">Join Our Community</h3>
          <p className="text-white/80 text-sm">
            Subscribe to get the latest university news, application deadlines, and exclusive event invitations.
          </p>
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <h4 className="font-bold text-lg text-foreground">You're Subscribed!</h4>
              <p className="text-foreground-secondary text-sm">Thank you for joining our newsletter.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="subscribe-email" className="sr-only">Email Address</label>
                <input 
                  id="subscribe-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="input-field w-full text-center"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full justify-center gap-2"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>
              <p className="text-xs text-center text-foreground-muted mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
