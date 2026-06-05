-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "photoUrl" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "mailingAddress" TEXT,
    "programLevel" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "modeOfStudy" TEXT NOT NULL DEFAULT 'online',
    "intendedStart" TEXT NOT NULL,
    "highestQualification" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "graduationYear" TEXT NOT NULL,
    "transcriptsUrls" TEXT,
    "currentJobTitle" TEXT,
    "employer" TEXT,
    "yearsExperience" TEXT,
    "cvUrl" TEXT,
    "statementOfPurpose" TEXT NOT NULL,
    "referenceName" TEXT,
    "referenceEmail" TEXT,
    "referenceRelationship" TEXT,
    "confirmAccuracy" BOOLEAN NOT NULL DEFAULT false,
    "agreeTerms" BOOLEAN NOT NULL DEFAULT false,
    "consentContact" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photo" TEXT,
    "email" TEXT,
    "publications" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "venue" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "bannerImage" TEXT,
    "galleryImages" TEXT,
    "thumbnailImage" TEXT,
    "brochurePdf" TEXT,
    "attendees" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'EU American University Communications',
    "publishedAt" TIMESTAMP(3),
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "attachmentUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "photo" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "degreeType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unread',
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "album" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'EDITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'site_settings',
    "data" TEXT NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "applicationId" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "programLevel" TEXT NOT NULL,
    "enrollmentYear" INTEGER NOT NULL,
    "intendedStartDate" TEXT,
    "expectedCompletion" TEXT,
    "photo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'enrolled',
    "isPubliclyVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isBundle" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationEnrollment" (
    "id" TEXT NOT NULL,
    "certificationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CertificationEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "noticeUpdates" BOOLEAN NOT NULL DEFAULT true,
    "newsUpdates" BOOLEAN NOT NULL DEFAULT true,
    "eventUpdates" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "source" TEXT NOT NULL DEFAULT 'popup',

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "website" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "partnershipType" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "adminNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSettings" (
    "id" TEXT NOT NULL DEFAULT 'system_settings',
    "isMaintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "maintenanceMessage" TEXT NOT NULL DEFAULT 'Website is currently under maintenance. We''ll be back shortly.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_referenceNumber_key" ON "Application"("referenceNumber");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_programLevel_idx" ON "Application"("programLevel");

-- CreateIndex
CREATE INDEX "Application_submittedAt_idx" ON "Application"("submittedAt");

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "Application"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateId_key" ON "Certificate"("certificateId");

-- CreateIndex
CREATE INDEX "Certificate_certificateId_idx" ON "Certificate"("certificateId");

-- CreateIndex
CREATE INDEX "Faculty_department_idx" ON "Faculty"("department");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_slug_idx" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");

-- CreateIndex
CREATE INDEX "Event_isPublished_idx" ON "Event"("isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_slug_idx" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_publishedAt_idx" ON "News"("publishedAt");

-- CreateIndex
CREATE INDEX "News_isPublished_idx" ON "News"("isPublished");

-- CreateIndex
CREATE INDEX "Notice_category_idx" ON "Notice"("category");

-- CreateIndex
CREATE INDEX "Notice_postedAt_idx" ON "Notice"("postedAt");

-- CreateIndex
CREATE INDEX "Notice_isActive_idx" ON "Notice"("isActive");

-- CreateIndex
CREATE INDEX "Testimonial_isApproved_idx" ON "Testimonial"("isApproved");

-- CreateIndex
CREATE INDEX "ContactInquiry_status_idx" ON "ContactInquiry"("status");

-- CreateIndex
CREATE INDEX "ContactInquiry_receivedAt_idx" ON "ContactInquiry"("receivedAt");

-- CreateIndex
CREATE INDEX "GalleryImage_album_idx" ON "GalleryImage"("album");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_email_idx" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AuditLog_adminId_idx" ON "AuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "FAQ_category_idx" ON "FAQ"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentId_key" ON "Student"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_applicationId_key" ON "Student"("applicationId");

-- CreateIndex
CREATE INDEX "Student_enrollmentId_idx" ON "Student"("enrollmentId");

-- CreateIndex
CREATE INDEX "Student_status_idx" ON "Student"("status");

-- CreateIndex
CREATE INDEX "Student_programLevel_idx" ON "Student"("programLevel");

-- CreateIndex
CREATE INDEX "Student_enrollmentYear_idx" ON "Student"("enrollmentYear");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_slug_key" ON "Certification"("slug");

-- CreateIndex
CREATE INDEX "Certification_slug_idx" ON "Certification"("slug");

-- CreateIndex
CREATE INDEX "Certification_category_idx" ON "Certification"("category");

-- CreateIndex
CREATE INDEX "CertificationEnrollment_certificationId_idx" ON "CertificationEnrollment"("certificationId");

-- CreateIndex
CREATE INDEX "CertificationEnrollment_status_idx" ON "CertificationEnrollment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "LegalPage_slug_key" ON "LegalPage"("slug");

-- CreateIndex
CREATE INDEX "LegalPage_slug_idx" ON "LegalPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationEnrollment" ADD CONSTRAINT "CertificationEnrollment_certificationId_fkey" FOREIGN KEY ("certificationId") REFERENCES "Certification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
