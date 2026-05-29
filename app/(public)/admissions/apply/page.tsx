'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormData } from '@/lib/validations/application';
import { PROGRAM_LEVELS, PROGRAM_NAMES, PHD_SPECIALIZATIONS, countWords } from '@/lib/utils';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Upload, Loader2 } from 'lucide-react';

const countries = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria','Azerbaijan',
  'Bahrain','Bangladesh','Belgium','Bolivia','Bosnia and Herzegovina','Brazil','Bulgaria','Cambodia','Cameroon',
  'Canada','Chile','China','Colombia','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark',
  'Dominican Republic','Ecuador','Egypt','Estonia','Ethiopia','Finland','France','Georgia','Germany','Ghana',
  'Greece','Guatemala','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel',
  'Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kuwait','Latvia','Lebanon','Libya','Lithuania',
  'Luxembourg','Malaysia','Mexico','Mongolia','Morocco','Mozambique','Myanmar','Nepal','Netherlands','New Zealand',
  'Nigeria','North Macedonia','Norway','Oman','Pakistan','Palestine','Panama','Paraguay','Peru','Philippines',
  'Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saudi Arabia','Senegal','Serbia','Singapore',
  'Slovakia','Slovenia','Somalia','South Africa','South Korea','Spain','Sri Lanka','Sudan','Sweden',
  'Switzerland','Syria','Taiwan','Tanzania','Thailand','Tunisia','Turkey','Uganda','Ukraine',
  'United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

function generateFutureSemesters() {
  const semesters = [];
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); // 0-11

  // Determine starting point
  let nextSeason = month >= 6 ? 'Spring' : 'Fall';
  if (nextSeason === 'Spring') year++;

  for (let i = 0; i < 3; i++) {
    semesters.push(`${nextSeason} ${year}`);
    if (nextSeason === 'Spring') {
      nextSeason = 'Fall';
    } else {
      nextSeason = 'Spring';
      year++;
    }
  }
  return semesters;
}

export default function ApplyPage() {
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; referenceNumber?: string; error?: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
    defaultValues: {
      modeOfStudy: 'Online',
    },
  });

  const futureSemesters = generateFutureSemesters();

  const programLevel = watch('programLevel');
  const statementOfPurpose = watch('statementOfPurpose') || '';
  const wordCount = countWords(statementOfPurpose);

  const handleProgramLevelChange = (value: string) => {
    setValue('programLevel', value as ApplicationFormData['programLevel']);
    if (value === 'phd') {
      // PhD uses a specialization dropdown, clear the auto-fill
      setValue('programName', '');
    } else {
      const programName = PROGRAM_NAMES[value] || '';
      setValue('programName', programName);
    }
  };

  const totalSections = 8;

  const sectionFields: Record<number, (keyof ApplicationFormData)[]> = {
    1: ['fullName', 'dateOfBirth', 'gender', 'nationality', 'passportNumber'],
    2: ['email', 'phone', 'currentAddress'],
    3: ['programLevel', 'programName', 'modeOfStudy', 'intendedStart'],
    4: ['highestQualification', 'institutionName', 'graduationYear', 'transcriptsUploaded'],
    5: [],
    6: ['statementOfPurpose'],
    7: [],
    8: ['confirmAccuracy', 'agreeTerms', 'consentContact'],
  };

  const goNext = async () => {
    const fields = sectionFields[currentSection];
    if (fields.length > 0) {
      const isValid = await trigger(fields);
      if (!isValid) return;
    }
    setCurrentSection((s) => Math.min(s + 1, totalSections));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    setCurrentSection((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({ success: true, referenceNumber: result.referenceNumber });
      } else {
        setSubmitResult({ success: false, error: result.error || 'Submission failed. Please try again.' });
      }
    } catch {
      setSubmitResult({ success: false, error: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <section className="section-padding">
        <div className="container-main max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-heading font-bold mb-4">Application Submitted Successfully</h1>
          <p className="text-foreground-secondary mb-6">
            Thank you for applying to American Management University. Your application has been received and is being processed.
          </p>
          <div className="bg-background-subtle border border-border rounded-card p-6 mb-8">
            <p className="text-sm text-foreground-muted mb-1">Your Application Reference Number</p>
            <p className="text-3xl font-heading font-bold text-primary">{submitResult.referenceNumber}</p>
            <p className="text-sm text-foreground-muted mt-2">Please save this number for future correspondence.</p>
          </div>
          <p className="text-sm text-foreground-secondary">
            A confirmation email has been sent to your email address. You will be notified of any updates to your application status.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12">
        <div className="container-main">
          <span className="section-label">Admissions</span>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">Application Form</h1>
          <p className="text-foreground-secondary">Complete all sections to submit your application to AMU.</p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="sticky top-16 lg:top-20 z-40 bg-white border-b border-border py-3">
        <div className="container-main">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-accent font-medium text-foreground-muted">
              Section {currentSection} of {totalSections}
            </span>
            <span className="text-xs font-accent font-medium text-primary">
              {Math.round((currentSection / totalSections) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-background-subtle rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentSection / totalSections) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          {submitResult?.error && (
            <div className="bg-error/5 border border-error/20 rounded-card p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error">{submitResult.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Section 1: Personal Information */}
            {currentSection === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 1: Personal Information</h2>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">Full Legal Name *</label>
                  <input id="fullName" {...register('fullName')} className="input-field" placeholder="Enter your full legal name" />
                  {errors.fullName && <p className="text-sm text-error mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1.5">Date of Birth *</label>
                    <input id="dateOfBirth" type="date" {...register('dateOfBirth')} className="input-field" />
                    {errors.dateOfBirth && <p className="text-sm text-error mt-1">{errors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Gender *</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {['Male', 'Female', 'Prefer not to say'].map((g) => (
                        <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" value={g} {...register('gender')} className="w-4 h-4 text-primary" />
                          {g}
                        </label>
                      ))}
                    </div>
                    {errors.gender && <p className="text-sm text-error mt-1">{errors.gender.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium mb-1.5">Nationality *</label>
                    <select id="nationality" {...register('nationality')} className="input-field">
                      <option value="">Select country</option>
                      {countries.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                    {errors.nationality && <p className="text-sm text-error mt-1">{errors.nationality.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="passportNumber" className="block text-sm font-medium mb-1.5">Passport / National ID Number *</label>
                    <input id="passportNumber" {...register('passportNumber')} className="input-field" placeholder="Enter passport or ID number" />
                    {errors.passportNumber && <p className="text-sm text-error mt-1">{errors.passportNumber.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Contact Details */}
            {currentSection === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 2: Contact Details</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email Address *</label>
                    <input id="email" type="email" {...register('email')} className="input-field" placeholder="your@email.com" />
                    {errors.email && <p className="text-sm text-error mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone Number *</label>
                    <input id="phone" type="tel" {...register('phone')} className="input-field" placeholder="+1 234 567 8900" />
                    {errors.phone && <p className="text-sm text-error mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="currentAddress" className="block text-sm font-medium mb-1.5">Current Address *</label>
                  <textarea id="currentAddress" {...register('currentAddress')} className="input-field" rows={3} placeholder="Street, City, Country" />
                  {errors.currentAddress && <p className="text-sm text-error mt-1">{errors.currentAddress.message}</p>}
                </div>
                <div>
                  <label htmlFor="mailingAddress" className="block text-sm font-medium mb-1.5">Mailing Address (if different)</label>
                  <textarea id="mailingAddress" {...register('mailingAddress')} className="input-field" rows={3} placeholder="Leave blank if same as above" />
                </div>
              </div>
            )}

            {/* Section 3: Program Selection */}
            {currentSection === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 3: Program Selection</h2>
                <div>
                  <label htmlFor="programLevel" className="block text-sm font-medium mb-1.5">Program Level *</label>
                  <select id="programLevel" className="input-field" value={programLevel || ''} onChange={(e) => handleProgramLevelChange(e.target.value)}>
                    <option value="">Select program level</option>
                    {PROGRAM_LEVELS.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                  </select>
                  {errors.programLevel && <p className="text-sm text-error mt-1">{errors.programLevel.message}</p>}
                </div>
                <div>
                  <label htmlFor="programName" className="block text-sm font-medium mb-1.5">Program Name *</label>
                  {programLevel === 'phd' ? (
                    <>
                      <select
                        id="programName"
                        className="input-field"
                        value={watch('programName') || ''}
                        onChange={(e) => setValue('programName', e.target.value)}
                      >
                        <option value="">Select PhD specialization</option>
                        {PHD_SPECIALIZATIONS.map((spec) => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                      <p className="text-xs text-accent mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        This program name will appear exactly as shown on your official certificate.
                      </p>
                    </>
                  ) : (
                    <>
                      <input id="programName" {...register('programName')} className="input-field bg-background-subtle" readOnly />
                      <p className="text-xs text-accent mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        This program name will appear exactly as shown on your official certificate.
                      </p>
                    </>
                  )}
                  {errors.programName && <p className="text-sm text-error mt-1">{errors.programName.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="modeOfStudy" className="block text-sm font-medium mb-1.5">Mode of Study *</label>
                    <input id="modeOfStudy" {...register('modeOfStudy')} className="input-field bg-background-subtle" readOnly value="Online" />
                    {errors.modeOfStudy && <p className="text-sm text-error mt-1">{errors.modeOfStudy.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="intendedStart" className="block text-sm font-medium mb-1.5">Intended Start Date *</label>
                    <select id="intendedStart" {...register('intendedStart')} className="input-field">
                      <option value="">Select semester</option>
                      {futureSemesters.map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                    {errors.intendedStart && <p className="text-sm text-error mt-1">{errors.intendedStart.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Academic Background */}
            {currentSection === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 4: Academic Background</h2>
                <div>
                  <label htmlFor="highestQualification" className="block text-sm font-medium mb-1.5">Highest Qualification *</label>
                  <select id="highestQualification" {...register('highestQualification')} className="input-field">
                    <option value="">Select qualification</option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                    <option value="Master's Degree">Master&apos;s Degree</option>
                    <option value="Doctoral Degree">Doctoral Degree</option>
                    <option value="Professional Certification">Professional Certification</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.highestQualification && <p className="text-sm text-error mt-1">{errors.highestQualification.message}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="institutionName" className="block text-sm font-medium mb-1.5">Institution Name *</label>
                    <input id="institutionName" {...register('institutionName')} className="input-field" placeholder="Name of institution" />
                    {errors.institutionName && <p className="text-sm text-error mt-1">{errors.institutionName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium mb-1.5">Year of Graduation *</label>
                    <input id="graduationYear" {...register('graduationYear')} className="input-field" placeholder="e.g. 2020" />
                    {errors.graduationYear && <p className="text-sm text-error mt-1">{errors.graduationYear.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Upload Transcripts (PDF, max 5MB each) *</label>
                  <div className="border-2 border-dashed border-border rounded-card p-6 text-center">
                    <Upload className="w-8 h-8 text-foreground-muted mx-auto mb-2" />
                    <p className="text-sm text-foreground-muted">Drag and drop or click to upload</p>
                    <p className="text-xs text-foreground-muted mt-1">PDF files only, up to 3 files, max 5MB each</p>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      multiple 
                      className="mt-2" 
                      onChange={(e) => {
                        setValue('transcriptsUploaded', e.target.files !== null && e.target.files.length > 0);
                        trigger('transcriptsUploaded');
                      }} 
                    />
                  </div>
                  {errors.transcriptsUploaded && <p className="text-sm text-error mt-1">{errors.transcriptsUploaded.message}</p>}
                </div>
              </div>
            )}

            {/* Section 5: Professional Background */}
            {currentSection === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 5: Professional Background</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentJobTitle" className="block text-sm font-medium mb-1.5">Current Job Title</label>
                    <input id="currentJobTitle" {...register('currentJobTitle')} className="input-field" placeholder="e.g. Marketing Director" />
                  </div>
                  <div>
                    <label htmlFor="employer" className="block text-sm font-medium mb-1.5">Employer / Organization</label>
                    <input id="employer" {...register('employer')} className="input-field" placeholder="Company name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium mb-1.5">Years of Experience</label>
                  <select id="yearsExperience" {...register('yearsExperience')} className="input-field">
                    <option value="">Select</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="15+">15+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Upload CV/Resume (PDF, max 5MB)</label>
                  <div className="border-2 border-dashed border-border rounded-card p-6 text-center">
                    <Upload className="w-8 h-8 text-foreground-muted mx-auto mb-2" />
                    <p className="text-sm text-foreground-muted">Drag and drop or click to upload</p>
                    <input type="file" accept=".pdf" className="mt-2" />
                  </div>
                </div>
              </div>
            )}

            {/* Section 6: Statement of Purpose */}
            {currentSection === 6 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 6: Statement of Purpose</h2>
                <div>
                  <label htmlFor="statementOfPurpose" className="block text-sm font-medium mb-1.5">
                    Statement of Purpose * <span className="text-foreground-muted">(200–1000 words)</span>
                  </label>
                  <textarea
                    id="statementOfPurpose"
                    {...register('statementOfPurpose')}
                    className="input-field min-h-[250px]"
                    rows={10}
                    placeholder="Describe your motivations, career goals, and how this program aligns with your aspirations..."
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs ${wordCount < 30 ? 'text-foreground-muted' : wordCount > 1000 ? 'text-error' : 'text-success'}`}>
                      {wordCount} words
                    </p>
                    {errors.statementOfPurpose && <p className="text-xs text-error">{errors.statementOfPurpose.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Section 7: Reference */}
            {currentSection === 7 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 7: Reference</h2>
                <p className="text-sm text-foreground-secondary">Provide details of a professional or academic reference (optional but recommended).</p>
                <div>
                  <label htmlFor="referenceName" className="block text-sm font-medium mb-1.5">Reference Name</label>
                  <input id="referenceName" {...register('referenceName')} className="input-field" placeholder="Full name of reference" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="referenceEmail" className="block text-sm font-medium mb-1.5">Reference Email</label>
                    <input id="referenceEmail" type="email" {...register('referenceEmail')} className="input-field" placeholder="reference@email.com" />
                    {errors.referenceEmail && <p className="text-sm text-error mt-1">{errors.referenceEmail.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="referenceRelationship" className="block text-sm font-medium mb-1.5">Relationship</label>
                    <input id="referenceRelationship" {...register('referenceRelationship')} className="input-field" placeholder="e.g. Former Supervisor" />
                  </div>
                </div>
              </div>
            )}

            {/* Section 8: Declarations */}
            {currentSection === 8 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-bold border-b border-border pb-3">Section 8: Declarations</h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer p-4 border border-border rounded-card hover:border-primary/20 transition-colors">
                    <input type="checkbox" {...register('confirmAccuracy')} className="w-5 h-5 mt-0.5 text-primary rounded" />
                    <span className="text-sm text-foreground-secondary">I confirm that all information provided in this application is accurate and complete to the best of my knowledge. *</span>
                  </label>
                  {errors.confirmAccuracy && <p className="text-sm text-error ml-8">{errors.confirmAccuracy.message}</p>}

                  <label className="flex items-start gap-3 cursor-pointer p-4 border border-border rounded-card hover:border-primary/20 transition-colors">
                    <input type="checkbox" {...register('agreeTerms')} className="w-5 h-5 mt-0.5 text-primary rounded" />
                    <span className="text-sm text-foreground-secondary">I agree to the Privacy Policy and Terms of Use of American Management University. *</span>
                  </label>
                  {errors.agreeTerms && <p className="text-sm text-error ml-8">{errors.agreeTerms.message}</p>}

                  <label className="flex items-start gap-3 cursor-pointer p-4 border border-border rounded-card hover:border-primary/20 transition-colors">
                    <input type="checkbox" {...register('consentContact')} className="w-5 h-5 mt-0.5 text-primary rounded" />
                    <span className="text-sm text-foreground-secondary">I consent to being contacted by AMU regarding my application and related academic programs. *</span>
                  </label>
                  {errors.consentContact && <p className="text-sm text-error ml-8">{errors.consentContact.message}</p>}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              {currentSection > 1 ? (
                <button type="button" onClick={goPrev} className="btn-ghost gap-2">
                  <ArrowLeft size={16} /> Previous
                </button>
              ) : (
                <div />
              )}

              {currentSection < totalSections ? (
                <button type="button" onClick={goNext} className="btn-primary gap-2">
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="btn-primary gap-2 disabled:opacity-60">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <CheckCircle size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
