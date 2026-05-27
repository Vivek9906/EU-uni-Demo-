import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(200),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(20).optional().default(''),
  subject: z.string().min(2, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required').max(200),
  program: z.string().min(2, 'Program is required').max(200),
  content: z.string().min(20, 'Testimonial must be at least 20 characters').max(1000),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

export const certificateVerifySchema = z.object({
  certificateId: z.string().min(5, 'Certificate ID is required').max(50),
});

export type CertificateVerifyData = z.infer<typeof certificateVerifySchema>;
