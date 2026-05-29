import { z } from 'zod';

export const applicationSchema = z.object({
  // Section 1: Personal Information
  fullName: z.string().min(2, 'Full name is required').max(200),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Prefer not to say'], {
    required_error: 'Gender is required',
  }),
  nationality: z.string().min(1, 'Nationality is required'),
  passportNumber: z.string().min(1, 'Passport/National ID is required').max(50),
  
  // Section 2: Contact Details
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Phone number is required').max(20),
  currentAddress: z.string().min(5, 'Current address is required').max(500),
  mailingAddress: z.string().max(500).optional().default(''),
  
  // Section 3: Program Selection
  programLevel: z.enum(['bachelors', 'masters', 'phd', 'phd-honorary', 'phd-professorship'], {
    required_error: 'Program level is required',
  }),
  programName: z.string().min(1, 'Program name is required'),
  modeOfStudy: z.literal('Online', {
    errorMap: () => ({ message: 'Mode of study must be Online' }),
  }),
  intendedStart: z.string().min(1, 'Intended start date is required'),
  
  // Section 4: Academic Background
  highestQualification: z.string().min(1, 'Highest qualification is required'),
  institutionName: z.string().min(1, 'Institution name is required'),
  graduationYear: z.string().min(4, 'Graduation year is required'),
  transcriptsUploaded: z.boolean().refine((val) => val === true, {
    message: 'You must upload your transcripts',
  }),
  
  // Section 5: Professional Background
  currentJobTitle: z.string().max(200).optional().default(''),
  employer: z.string().max(200).optional().default(''),
  yearsExperience: z.string().optional().default(''),
  
  // Section 6: Statement of Purpose
  statementOfPurpose: z.string()
    .min(100, 'Statement of purpose must be at least 100 characters')
    .max(5000, 'Statement of purpose must not exceed 5000 characters'),
  
  // Section 7: Reference
  referenceName: z.string().max(200).optional().default(''),
  referenceEmail: z.string().email('Please enter a valid reference email').optional().or(z.literal('')),
  referenceRelationship: z.string().max(100).optional().default(''),
  
  // Section 8: Declarations
  confirmAccuracy: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm the accuracy of your information' }),
  }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Privacy Policy and Terms' }),
  }),
  consentContact: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to being contacted by AMU' }),
  }),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
