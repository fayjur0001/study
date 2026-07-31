// ============================================================
// StudyBridge — Mock Data & Type Definitions
// All types are exported from this file only. Do not create '@/types'.
// ============================================================

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "agency" | "admin"
  avatar?: string
  createdAt: string
  isVerified: boolean
  isBanned: boolean
}

export interface StudentProfile {
  userId: string
  fullName: string
  ssc: string
  hsc: string
  bachelorsDegree?: string
  cgpa: number
  yearOfPassing: number
  major: string
  ielts?: number
  toefl?: number
  pte?: number
  duolingo?: number
  annualTuitionBudget: number
  livingCostBudget: number
  scholarshipNeed: "none" | "partial" | "full"
  targetCountries: string[]
  targetDegreeLevel: "UG" | "PG" | "PhD"
  preferredMajors: string[]
  intakeSeason: string
  profileCompletion: number
  eligibilityScore: number
}

export interface Country {
  id: string
  name: string
  flagEmoji: string
  image: string
  overview: string
  avgTuition: number
  avgLivingCost: number
  visaSuccessRate: number
  processingTimeWeeks: number
  partTimeWorkAllowed: boolean
  pswpDurationMonths: number
  prOpportunity: "low" | "medium" | "high"
  climate: string
  language: string
  currency: string
  documentChecklist: string[]
}

export interface University {
  id: string
  name: string
  slug: string
  countryId: string
  countryName: string
  city: string
  logo?: string
  campusImages: string[]
  worldRanking?: number
  nationalRanking?: number
  programs: string[]
  tuitionMin: number
  tuitionMax: number
  entryRequirements: string
  minCgpa: number
  minIelts?: number
  acceptanceRate: number
  hasAccommodation: boolean
  facilities: string[]
  applicationDeadline: string
  rating: number
  reviewCount: number
}

export interface MatchResult {
  universityId: string
  overallMatch: number
  academicMatch: number
  budgetMatch: number
  languageMatch: number
  scholarshipChance: "low" | "medium" | "high"
}

export interface Scholarship {
  id: string
  title: string
  provider: string
  countryId: string
  countryName: string
  amount: number
  coverageType: "full" | "partial"
  deadline: string
  requiredDocuments: string[]
  eligibilityCriteria: string
}

export interface Agency {
  id: string
  userId: string
  name: string
  logo?: string
  coverImage?: string
  description: string
  countrySpecialties: string[]
  serviceFeeRange: string
  rating: number
  reviewCount: number
  successCount: number
  isVerified: boolean
  isApproved: boolean
  createdAt: string
}

export interface AgencyService {
  id: string
  agencyId: string
  title: string
  description: string
  fee: number
  countryFocus: string
}

export interface Application {
  id: string
  studentId: string
  studentName: string
  universityId: string
  universityName: string
  countryName: string
  program: string
  agencyId?: string
  agencyName?: string
  stage:
    | "draft"
    | "submitted"
    | "under_review"
    | "documents_required"
    | "accepted"
    | "tuition_paid_visa_applied"
    | "visa_approved"
  submittedAt?: string
  updatedAt: string
  documents: { name: string; uploaded: boolean; url?: string }[]
}

export interface Document {
  id: string
  studentId: string
  type: "passport" | "transcript" | "certificate" | "test_score" | "cv" | "sop" | "lor"
  fileName: string
  uploadedAt: string
  verified: boolean
}

export interface ForumPost {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  category: string
  title: string
  content: string
  replyCount: number
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  content: string
  createdAt: string
  isRead: boolean
}

export interface Notification {
  id: string
  userId: string
  type: "application" | "deadline" | "message" | "system"
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

// ============================================================
// MOCK USERS
// ============================================================

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Rezwan Karim",
    email: "rezwan.karim@studybridge.com",
    role: "admin",
    createdAt: "2025-01-10",
    isVerified: true,
    isBanned: false,
  },
  {
    id: "user-002",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@gmail.com",
    role: "student",
    createdAt: "2026-02-14",
    isVerified: true,
    isBanned: false,
  },
  {
    id: "user-003",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@gmail.com",
    role: "student",
    createdAt: "2026-03-02",
    isVerified: true,
    isBanned: false,
  },
  {
    id: "user-004",
    name: "Bright Future Overseas",
    email: "contact@brightfutureoverseas.com",
    role: "agency",
    createdAt: "2025-06-20",
    isVerified: true,
    isBanned: false,
  },
  {
    id: "user-005",
    name: "Global Education Consultants",
    email: "info@globaleduconsult.com",
    role: "agency",
    createdAt: "2025-04-11",
    isVerified: true,
    isBanned: false,
  },
  {
    id: "user-006",
    name: "Farhan Rahman",
    email: "farhan.rahman@gmail.com",
    role: "student",
    createdAt: "2026-04-18",
    isVerified: false,
    isBanned: false,
  },
]

// ============================================================
// MOCK COUNTRIES
// ============================================================

export const mockCountries: Country[] = [
  {
    id: "country-001",
    name: "United Kingdom",
    flagEmoji: "🇬🇧",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    overview:
      "The UK offers world-renowned universities, a rich academic tradition, and a Graduate Route visa allowing 2 years of post-study work.",
    avgTuition: 22000,
    avgLivingCost: 14000,
    visaSuccessRate: 87,
    processingTimeWeeks: 6,
    partTimeWorkAllowed: true,
    pswpDurationMonths: 24,
    prOpportunity: "medium",
    climate: "Temperate maritime",
    language: "English",
    currency: "GBP",
    documentChecklist: [
      "Valid passport",
      "CAS letter from university",
      "Financial evidence (28-day bank statement)",
      "IELTS/UKVI test result",
      "TB test certificate (if applicable)",
    ],
  },
  {
    id: "country-002",
    name: "United States",
    flagEmoji: "🇺🇸",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    overview:
      "Home to the largest number of top-ranked universities globally, with strong OPT work opportunities for STEM graduates.",
    avgTuition: 32000,
    avgLivingCost: 16000,
    visaSuccessRate: 72,
    processingTimeWeeks: 8,
    partTimeWorkAllowed: true,
    pswpDurationMonths: 36,
    prOpportunity: "medium",
    climate: "Varies by region",
    language: "English",
    currency: "USD",
    documentChecklist: [
      "Valid passport",
      "Form I-20 from university",
      "SEVIS fee receipt",
      "DS-160 confirmation",
      "Financial affidavit of support",
    ],
  },
  {
    id: "country-003",
    name: "Canada",
    flagEmoji: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    overview:
      "Canada combines affordable quality education with one of the most immigrant-friendly post-study work and PR pathways in the world.",
    avgTuition: 18000,
    avgLivingCost: 12000,
    visaSuccessRate: 81,
    processingTimeWeeks: 10,
    partTimeWorkAllowed: true,
    pswpDurationMonths: 36,
    prOpportunity: "high",
    climate: "Continental, cold winters",
    language: "English / French",
    currency: "CAD",
    documentChecklist: [
      "Valid passport",
      "Letter of acceptance",
      "GIC or proof of funds",
      "Statement of purpose",
      "Medical exam (if required)",
    ],
  },
  {
    id: "country-004",
    name: "Australia",
    flagEmoji: "🇦🇺",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    overview:
      "Australia offers a high quality of life, globally ranked universities, and a Temporary Graduate visa for post-study work.",
    avgTuition: 24000,
    avgLivingCost: 15000,
    visaSuccessRate: 78,
    processingTimeWeeks: 8,
    partTimeWorkAllowed: true,
    pswpDurationMonths: 24,
    prOpportunity: "medium",
    climate: "Varies, mostly temperate",
    language: "English",
    currency: "AUD",
    documentChecklist: [
      "Valid passport",
      "Confirmation of Enrolment (CoE)",
      "Genuine Temporary Entrant statement",
      "OSHC health cover",
      "Financial capacity evidence",
    ],
  },
  {
    id: "country-005",
    name: "Germany",
    flagEmoji: "🇩🇪",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    overview:
      "Germany is known for low or no tuition fees at public universities and strong engineering and research programs.",
    avgTuition: 3000,
    avgLivingCost: 11000,
    visaSuccessRate: 84,
    processingTimeWeeks: 12,
    partTimeWorkAllowed: true,
    pswpDurationMonths: 18,
    prOpportunity: "high",
    climate: "Temperate, seasonal",
    language: "German / English",
    currency: "EUR",
    documentChecklist: [
      "Valid passport",
      "University admission letter",
      "Blocked account (Sperrkonto) proof",
      "Health insurance confirmation",
      "APS certificate (for some applicants)",
    ],
  },
  {
    id: "country-006",
    name: "Malaysia",
    flagEmoji: "🇲🇾",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    overview:
      "Malaysia offers affordable, internationally accredited degrees with many branch campuses of UK and Australian universities.",
    avgTuition: 6000,
    avgLivingCost: 4500,
    visaSuccessRate: 91,
    processingTimeWeeks: 4,
    partTimeWorkAllowed: false,
    pswpDurationMonths: 12,
    prOpportunity: "low",
    climate: "Tropical",
    language: "Malay / English",
    currency: "MYR",
    documentChecklist: [
      "Valid passport",
      "Offer letter (EMGS approved)",
      "Single entry visa approval letter",
      "Medical screening report",
      "Financial proof",
    ],
  },
]

// ============================================================
// MOCK UNIVERSITIES
// ============================================================

export const mockUniversities: University[] = [
  {
    id: "uni-001",
    name: "University of Manchester",
    slug: "university-of-manchester",
    countryId: "country-001",
    countryName: "United Kingdom",
    city: "Manchester",
    campusImages: [
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=80",
    ],
    worldRanking: 32,
    nationalRanking: 6,
    programs: ["Computer Science MSc", "Data Science MSc", "Business Analytics MSc"],
    tuitionMin: 24000,
    tuitionMax: 29000,
    entryRequirements: "2:1 Honours degree or equivalent, relevant background preferred.",
    minCgpa: 3.0,
    minIelts: 6.5,
    acceptanceRate: 38,
    hasAccommodation: true,
    facilities: ["Library", "Student union", "Sports centre", "Career hub"],
    applicationDeadline: "2027-01-15",
    rating: 4.5,
    reviewCount: 312,
  },
  {
    id: "uni-002",
    name: "University of Toronto",
    slug: "university-of-toronto",
    countryId: "country-003",
    countryName: "Canada",
    city: "Toronto",
    campusImages: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80",
    ],
    worldRanking: 21,
    nationalRanking: 1,
    programs: ["Computer Science MSc", "Engineering MASc", "MBA"],
    tuitionMin: 28000,
    tuitionMax: 42000,
    entryRequirements: "Bachelor's degree with minimum B+ average, GRE optional.",
    minCgpa: 3.3,
    minIelts: 7.0,
    acceptanceRate: 27,
    hasAccommodation: true,
    facilities: ["Research labs", "Library", "Innovation hub", "Health services"],
    applicationDeadline: "2026-12-01",
    rating: 4.7,
    reviewCount: 489,
  },
  {
    id: "uni-003",
    name: "University of Bologna",
    slug: "university-of-bologna",
    countryId: "country-005",
    countryName: "Germany",
    city: "Bologna",
    campusImages: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=900&q=80",
    ],
    worldRanking: 160,
    nationalRanking: 3,
    programs: ["International Business MSc", "Data Analytics MSc"],
    tuitionMin: 2500,
    tuitionMax: 4000,
    entryRequirements: "Bachelor's degree, minimum CGPA 3.0, English proficiency proof.",
    minCgpa: 3.0,
    minIelts: 6.0,
    acceptanceRate: 42,
    hasAccommodation: false,
    facilities: ["Historic library", "Language centre", "Student clubs"],
    applicationDeadline: "2027-02-28",
    rating: 4.3,
    reviewCount: 178,
  },
  {
    id: "uni-004",
    name: "Technical University of Munich",
    slug: "technical-university-of-munich",
    countryId: "country-005",
    countryName: "Germany",
    city: "Munich",
    campusImages: [
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80",
    ],
    worldRanking: 37,
    nationalRanking: 1,
    programs: ["Mechanical Engineering MSc", "Informatics MSc", "Robotics MSc"],
    tuitionMin: 300,
    tuitionMax: 1500,
    entryRequirements: "Relevant Bachelor's degree, strong quantitative background.",
    minCgpa: 3.2,
    minIelts: 6.5,
    acceptanceRate: 22,
    hasAccommodation: true,
    facilities: ["Engineering labs", "Robotics centre", "Library", "Sports facilities"],
    applicationDeadline: "2027-01-31",
    rating: 4.6,
    reviewCount: 264,
  },
  {
    id: "uni-005",
    name: "University of Melbourne",
    slug: "university-of-melbourne",
    countryId: "country-004",
    countryName: "Australia",
    city: "Melbourne",
    campusImages: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    ],
    worldRanking: 14,
    nationalRanking: 1,
    programs: ["Information Technology MSc", "Commerce Master", "Public Health MPH"],
    tuitionMin: 28000,
    tuitionMax: 38000,
    entryRequirements: "Bachelor's degree with distinction average, IELTS 6.5+.",
    minCgpa: 3.3,
    minIelts: 6.5,
    acceptanceRate: 31,
    hasAccommodation: true,
    facilities: ["Research institutes", "Library", "Student wellbeing centre"],
    applicationDeadline: "2026-11-30",
    rating: 4.6,
    reviewCount: 401,
  },
  {
    id: "uni-006",
    name: "Arizona State University",
    slug: "arizona-state-university",
    countryId: "country-002",
    countryName: "United States",
    city: "Tempe",
    campusImages: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80",
    ],
    worldRanking: 183,
    nationalRanking: 121,
    programs: ["Computer Science MS", "Data Science MS", "Business Analytics MS"],
    tuitionMin: 29000,
    tuitionMax: 34000,
    entryRequirements: "Bachelor's degree, minimum GPA 3.0 on 4.0 scale.",
    minCgpa: 3.0,
    minIelts: 6.0,
    acceptanceRate: 54,
    hasAccommodation: true,
    facilities: ["Innovation labs", "Career services", "Recreation centre"],
    applicationDeadline: "2027-03-01",
    rating: 4.1,
    reviewCount: 227,
  },
  {
    id: "uni-007",
    name: "University of British Columbia",
    slug: "university-of-british-columbia",
    countryId: "country-003",
    countryName: "Canada",
    city: "Vancouver",
    campusImages: [
      "https://images.unsplash.com/photo-1607013407627-6ba0552c85ab?w=900&q=80",
    ],
    worldRanking: 34,
    nationalRanking: 3,
    programs: ["Computer Science MSc", "Forestry MSc", "Public Policy MPP"],
    tuitionMin: 26000,
    tuitionMax: 39000,
    entryRequirements: "Bachelor's degree with B+ average, statement of purpose required.",
    minCgpa: 3.2,
    minIelts: 6.5,
    acceptanceRate: 33,
    hasAccommodation: true,
    facilities: ["Botanical gardens", "Library", "Aquatic centre"],
    applicationDeadline: "2026-12-15",
    rating: 4.5,
    reviewCount: 356,
  },
  {
    id: "uni-008",
    name: "University of Sydney",
    slug: "university-of-sydney",
    countryId: "country-004",
    countryName: "Australia",
    city: "Sydney",
    campusImages: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    ],
    worldRanking: 19,
    nationalRanking: 2,
    programs: ["Engineering Master", "Data Science MSc", "Finance Master"],
    tuitionMin: 30000,
    tuitionMax: 40000,
    entryRequirements: "Bachelor's degree with credit average, IELTS 6.5+.",
    minCgpa: 3.2,
    minIelts: 6.5,
    acceptanceRate: 29,
    hasAccommodation: true,
    facilities: ["Research labs", "Library", "Sports and fitness centre"],
    applicationDeadline: "2026-12-10",
    rating: 4.5,
    reviewCount: 378,
  },
  {
    id: "uni-009",
    name: "University of Leeds",
    slug: "university-of-leeds",
    countryId: "country-001",
    countryName: "United Kingdom",
    city: "Leeds",
    campusImages: [
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=900&q=80",
    ],
    worldRanking: 75,
    nationalRanking: 12,
    programs: ["Data Science MSc", "International Business MSc", "AI MSc"],
    tuitionMin: 21000,
    tuitionMax: 26000,
    entryRequirements: "2:1 Honours degree, IELTS 6.5 overall.",
    minCgpa: 2.9,
    minIelts: 6.5,
    acceptanceRate: 45,
    hasAccommodation: true,
    facilities: ["Library", "Student union", "Innovation hub"],
    applicationDeadline: "2027-01-20",
    rating: 4.3,
    reviewCount: 241,
  },
  {
    id: "uni-010",
    name: "Taylor's University",
    slug: "taylors-university",
    countryId: "country-006",
    countryName: "Malaysia",
    city: "Subang Jaya",
    campusImages: [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=900&q=80",
    ],
    worldRanking: 284,
    nationalRanking: 4,
    programs: ["Computer Science BSc", "Hospitality Management BSc", "Business MBA"],
    tuitionMin: 5000,
    tuitionMax: 8000,
    entryRequirements: "HSC/A-Level equivalent with minimum CGPA 2.75.",
    minCgpa: 2.75,
    minIelts: 5.5,
    acceptanceRate: 62,
    hasAccommodation: true,
    facilities: ["Modern campus", "Culinary studios", "Library", "Sports complex"],
    applicationDeadline: "2027-04-30",
    rating: 4.0,
    reviewCount: 156,
  },
]

// ============================================================
// MOCK MATCH RESULTS (per student per university)
// ============================================================

export const mockMatchResults: (MatchResult & { studentId: string })[] = [
  {
    studentId: "user-002",
    universityId: "uni-003",
    overallMatch: 94,
    academicMatch: 92,
    budgetMatch: 100,
    languageMatch: 95,
    scholarshipChance: "high",
  },
  {
    studentId: "user-002",
    universityId: "uni-004",
    overallMatch: 88,
    academicMatch: 90,
    budgetMatch: 95,
    languageMatch: 82,
    scholarshipChance: "high",
  },
  {
    studentId: "user-002",
    universityId: "uni-009",
    overallMatch: 79,
    academicMatch: 76,
    budgetMatch: 70,
    languageMatch: 88,
    scholarshipChance: "medium",
  },
  {
    studentId: "user-002",
    universityId: "uni-001",
    overallMatch: 71,
    academicMatch: 68,
    budgetMatch: 60,
    languageMatch: 85,
    scholarshipChance: "medium",
  },
  {
    studentId: "user-002",
    universityId: "uni-002",
    overallMatch: 58,
    academicMatch: 62,
    budgetMatch: 40,
    languageMatch: 78,
    scholarshipChance: "low",
  },
]

// ============================================================
// MOCK SCHOLARSHIPS
// ============================================================

export const mockScholarships: Scholarship[] = [
  {
    id: "sch-001",
    title: "DAAD Excellence Scholarship",
    provider: "DAAD",
    countryId: "country-005",
    countryName: "Germany",
    amount: 18000,
    coverageType: "full",
    deadline: "2026-08-15",
    requiredDocuments: ["Transcript", "CV", "Motivation letter", "Two LORs"],
    eligibilityCriteria: "Bachelor's graduates with CGPA 3.5+ applying to a Master's program in Germany.",
  },
  {
    id: "sch-002",
    title: "Chevening Scholarship",
    provider: "UK Government",
    countryId: "country-001",
    countryName: "United Kingdom",
    amount: 35000,
    coverageType: "full",
    deadline: "2026-11-02",
    requiredDocuments: ["Passport copy", "Two references", "Essays", "Degree certificate"],
    eligibilityCriteria: "Minimum 2 years of work experience, leadership potential, returning to home country post-study.",
  },
  {
    id: "sch-003",
    title: "Vanier Canada Graduate Scholarship",
    provider: "Government of Canada",
    countryId: "country-003",
    countryName: "Canada",
    amount: 50000,
    coverageType: "full",
    deadline: "2026-11-05",
    requiredDocuments: ["Research proposal", "Transcripts", "Three references"],
    eligibilityCriteria: "Doctoral students nominated by a Canadian institution with strong research record.",
  },
  {
    id: "sch-004",
    title: "Australia Awards Scholarship",
    provider: "Australian Government",
    countryId: "country-004",
    countryName: "Australia",
    amount: 40000,
    coverageType: "full",
    deadline: "2026-09-30",
    requiredDocuments: ["Academic transcripts", "IELTS score", "Development impact statement"],
    eligibilityCriteria: "Citizens of eligible developing countries with a commitment to return home after study.",
  },
  {
    id: "sch-005",
    title: "Fulbright Foreign Student Program",
    provider: "US Department of State",
    countryId: "country-002",
    countryName: "United States",
    amount: 45000,
    coverageType: "full",
    deadline: "2026-10-15",
    requiredDocuments: ["Statement of purpose", "Three references", "TOEFL/IELTS score"],
    eligibilityCriteria: "Bachelor's degree holders with strong academic record and leadership experience.",
  },
  {
    id: "sch-006",
    title: "University of Manchester Global Futures Scholarship",
    provider: "University of Manchester",
    countryId: "country-001",
    countryName: "United Kingdom",
    amount: 10000,
    coverageType: "partial",
    deadline: "2026-08-01",
    requiredDocuments: ["Offer letter", "Personal statement"],
    eligibilityCriteria: "Self-funded international postgraduate students with an offer from the university.",
  },
  {
    id: "sch-007",
    title: "Taylor's University Merit Scholarship",
    provider: "Taylor's University",
    countryId: "country-006",
    countryName: "Malaysia",
    amount: 4000,
    coverageType: "partial",
    deadline: "2027-03-15",
    requiredDocuments: ["Academic transcript", "Application form"],
    eligibilityCriteria: "Applicants with CGPA 3.5+ in their most recent qualification.",
  },
  {
    id: "sch-008",
    title: "TUM International Talent Scholarship",
    provider: "Technical University of Munich",
    countryId: "country-005",
    countryName: "Germany",
    amount: 9000,
    coverageType: "partial",
    deadline: "2026-12-01",
    requiredDocuments: ["Transcript", "Motivation letter", "Proof of financial need"],
    eligibilityCriteria: "International students admitted to a TUM Master's program with demonstrated financial need.",
  },
]

// ============================================================
// MOCK AGENCIES
// ============================================================

export const mockAgencies: Agency[] = [
  {
    id: "agency-001",
    userId: "user-005",
    name: "Global Education Consultants",
    description:
      "With over a decade of experience, Global Education Consultants has guided thousands of Bangladeshi students to top universities in the UK, Canada, and Australia.",
    countrySpecialties: ["United Kingdom", "Canada", "Australia"],
    serviceFeeRange: "$200 – $800",
    rating: 4.8,
    reviewCount: 212,
    successCount: 340,
    isVerified: true,
    isApproved: true,
    createdAt: "2025-04-11",
  },
  {
    id: "agency-002",
    userId: "user-004",
    name: "Bright Future Overseas",
    description:
      "Bright Future Overseas specializes in end-to-end application support for Germany and the US, from SOP drafting to visa interview preparation.",
    countrySpecialties: ["Germany", "United States"],
    serviceFeeRange: "$150 – $600",
    rating: 4.6,
    reviewCount: 158,
    successCount: 201,
    isVerified: true,
    isApproved: true,
    createdAt: "2025-06-20",
  },
  {
    id: "agency-003",
    userId: "user-006",
    name: "NextStep Education Advisors",
    description:
      "A newer agency focused on Malaysia and Australia pathways for undergraduate students, currently under admin review before marketplace listing.",
    countrySpecialties: ["Malaysia", "Australia"],
    serviceFeeRange: "$100 – $400",
    rating: 0,
    reviewCount: 0,
    successCount: 6,
    isVerified: false,
    isApproved: false,
    createdAt: "2026-07-05",
  },
]

// ============================================================
// MOCK AGENCY SERVICES
// ============================================================

export const mockAgencyServices: AgencyService[] = [
  {
    id: "svc-001",
    agencyId: "agency-001",
    title: "Full Application Package",
    description: "End-to-end support: university shortlisting, SOP review, application submission, and visa guidance.",
    fee: 500,
    countryFocus: "United Kingdom",
  },
  {
    id: "svc-002",
    agencyId: "agency-001",
    title: "Visa Interview Preparation",
    description: "Mock interviews and document review tailored to Canadian study permit interviews.",
    fee: 150,
    countryFocus: "Canada",
  },
  {
    id: "svc-003",
    agencyId: "agency-001",
    title: "Scholarship Application Support",
    description: "Identify and apply to matching scholarships with essay editing and deadline tracking.",
    fee: 200,
    countryFocus: "Australia",
  },
  {
    id: "svc-004",
    agencyId: "agency-002",
    title: "Blocked Account Setup Assistance",
    description: "Guidance through opening a Sperrkonto and preparing financial documents for German student visas.",
    fee: 180,
    countryFocus: "Germany",
  },
  {
    id: "svc-005",
    agencyId: "agency-002",
    title: "SEVIS & DS-160 Support",
    description: "Step-by-step help completing SEVIS registration and the DS-160 visa application form.",
    fee: 220,
    countryFocus: "United States",
  },
]

// ============================================================
// MOCK APPLICATIONS
// ============================================================

export const mockApplications: Application[] = [
  {
    id: "app-001",
    studentId: "user-002",
    studentName: "Tanvir Ahmed",
    universityId: "uni-003",
    universityName: "University of Bologna",
    countryName: "Germany",
    program: "International Business MSc",
    agencyId: "agency-001",
    agencyName: "Global Education Consultants",
    stage: "under_review",
    submittedAt: "2026-05-10",
    updatedAt: "2026-06-20",
    documents: [
      { name: "Passport", uploaded: true },
      { name: "Transcript", uploaded: true },
      { name: "SOP", uploaded: true },
      { name: "LOR", uploaded: false },
    ],
  },
  {
    id: "app-002",
    studentId: "user-002",
    studentName: "Tanvir Ahmed",
    universityId: "uni-004",
    universityName: "Technical University of Munich",
    countryName: "Germany",
    program: "Informatics MSc",
    agencyId: "agency-001",
    agencyName: "Global Education Consultants",
    stage: "documents_required",
    submittedAt: "2026-05-15",
    updatedAt: "2026-07-01",
    documents: [
      { name: "Passport", uploaded: true },
      { name: "Transcript", uploaded: true },
      { name: "SOP", uploaded: false },
      { name: "LOR", uploaded: false },
    ],
  },
  {
    id: "app-003",
    studentId: "user-002",
    studentName: "Tanvir Ahmed",
    universityId: "uni-009",
    universityName: "University of Leeds",
    countryName: "United Kingdom",
    program: "Data Science MSc",
    stage: "draft",
    updatedAt: "2026-07-20",
    documents: [
      { name: "Passport", uploaded: true },
      { name: "Transcript", uploaded: false },
      { name: "SOP", uploaded: false },
      { name: "LOR", uploaded: false },
    ],
  },
  {
    id: "app-004",
    studentId: "user-003",
    studentName: "Nusrat Jahan",
    universityId: "uni-002",
    universityName: "University of Toronto",
    countryName: "Canada",
    program: "Computer Science MSc",
    agencyId: "agency-001",
    agencyName: "Global Education Consultants",
    stage: "accepted",
    submittedAt: "2026-03-01",
    updatedAt: "2026-06-15",
    documents: [
      { name: "Passport", uploaded: true },
      { name: "Transcript", uploaded: true },
      { name: "SOP", uploaded: true },
      { name: "LOR", uploaded: true },
    ],
  },
  {
    id: "app-005",
    studentId: "user-003",
    studentName: "Nusrat Jahan",
    universityId: "uni-008",
    universityName: "University of Sydney",
    countryName: "Australia",
    program: "Finance Master",
    agencyId: "agency-002",
    agencyName: "Bright Future Overseas",
    stage: "tuition_paid_visa_applied",
    submittedAt: "2026-02-10",
    updatedAt: "2026-07-10",
    documents: [
      { name: "Passport", uploaded: true },
      { name: "Transcript", uploaded: true },
      { name: "SOP", uploaded: true },
      { name: "LOR", uploaded: true },
      { name: "Offer Letter", uploaded: true },
    ],
  },
  {
    id: "app-006",
    studentId: "user-006",
    studentName: "Farhan Rahman",
    universityId: "uni-010",
    universityName: "Taylor's University",
    countryName: "Malaysia",
    program: "Computer Science BSc",
    stage: "visa_approved",
    submittedAt: "2026-01-05",
    updatedAt: "2026-04-01",
    documents: [
      { name: "Passport", uploaded: true },
      { name: "HSC Certificate", uploaded: true },
      { name: "Offer Letter", uploaded: true },
      { name: "Visa Approval", uploaded: true },
    ],
  },
]

// ============================================================
// MOCK DOCUMENTS (Student Document Vault)
// ============================================================

export const mockDocuments: Document[] = [
  { id: "doc-001", studentId: "user-002", type: "passport", fileName: "tanvir_passport.pdf", uploadedAt: "2026-02-20", verified: true },
  { id: "doc-002", studentId: "user-002", type: "transcript", fileName: "iubat_transcript.pdf", uploadedAt: "2026-02-22", verified: true },
  { id: "doc-003", studentId: "user-002", type: "test_score", fileName: "ielts_result.pdf", uploadedAt: "2026-03-01", verified: true },
  { id: "doc-004", studentId: "user-002", type: "cv", fileName: "tanvir_cv.pdf", uploadedAt: "2026-03-05", verified: false },
  { id: "doc-005", studentId: "user-002", type: "sop", fileName: "sop_draft_v2.pdf", uploadedAt: "2026-04-10", verified: false },
]

// ============================================================
// MOCK FORUM POSTS
// ============================================================

export const mockForumPosts: ForumPost[] = [
  {
    id: "post-001",
    authorId: "user-002",
    authorName: "Tanvir Ahmed",
    category: "Germany",
    title: "How long did your blocked account verification take?",
    content:
      "I opened my Sperrkonto three weeks ago and I'm still waiting on the confirmation letter. Anyone else facing delays this intake season? Would love to hear realistic timelines before I plan my visa appointment.",
    replyCount: 14,
    createdAt: "2026-06-18",
  },
  {
    id: "post-002",
    authorId: "user-003",
    authorName: "Nusrat Jahan",
    category: "Canada",
    title: "GIC vs regular bank statement for study permit — what worked for you?",
    content:
      "My agency suggested a GIC but I've read some people got approved with just a bank statement. Trying to decide the safer route given tighter scrutiny this year.",
    replyCount: 22,
    createdAt: "2026-05-30",
  },
  {
    id: "post-003",
    authorId: "user-006",
    authorName: "Farhan Rahman",
    category: "Malaysia",
    title: "Taylor's University hostel vs private apartment — costs breakdown",
    content:
      "Sharing my research after emailing a few students already there. On-campus is more convenient but private apartments nearby end up cheaper if you split with roommates.",
    replyCount: 9,
    createdAt: "2026-04-22",
  },
  {
    id: "post-004",
    authorId: "user-002",
    authorName: "Tanvir Ahmed",
    category: "General Q&A",
    title: "Is it worth applying to both a full scholarship and a partial one?",
    content:
      "Wondering if applying to multiple scholarships for the same intake looks bad, or if it's completely normal and expected practice.",
    replyCount: 17,
    createdAt: "2026-06-02",
  },
  {
    id: "post-005",
    authorId: "user-003",
    authorName: "Nusrat Jahan",
    category: "University of Toronto",
    title: "Accepted for Fall 2026 — happy to answer questions!",
    content:
      "Just got my offer letter for the CS Master's program. Ask me anything about the application process, the SOP, or what interviewers focused on.",
    replyCount: 31,
    createdAt: "2026-06-16",
  },
]

// ============================================================
// MOCK MESSAGES
// ============================================================

export const mockMessages: Message[] = [
  {
    id: "msg-001",
    senderId: "user-005",
    senderName: "Global Education Consultants",
    receiverId: "user-002",
    content: "Hi Tanvir, we've reviewed your SOP draft for TUM. A few suggestions attached — please check when free.",
    createdAt: "2026-07-25T09:12:00",
    isRead: true,
  },
  {
    id: "msg-002",
    senderId: "user-002",
    senderName: "Tanvir Ahmed",
    receiverId: "user-005",
    content: "Thanks! I'll go through it today and send an updated version by tomorrow.",
    createdAt: "2026-07-25T10:03:00",
    isRead: true,
  },
  {
    id: "msg-003",
    senderId: "user-005",
    senderName: "Global Education Consultants",
    receiverId: "user-002",
    content: "Sounds good. Also, don't forget the LOR deadline for Bologna is next week.",
    createdAt: "2026-07-25T10:10:00",
    isRead: false,
  },
  {
    id: "msg-004",
    senderId: "user-002",
    senderName: "Tanvir Ahmed",
    receiverId: "user-005",
    content: "Right, I'll follow up with my professor today.",
    createdAt: "2026-07-25T10:15:00",
    isRead: false,
  },
]

// ============================================================
// MOCK NOTIFICATIONS
// ============================================================

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    userId: "user-002",
    type: "deadline",
    title: "Scholarship deadline approaching",
    message: "DAAD Excellence Scholarship closes in 12 days.",
    isRead: false,
    createdAt: "2026-07-28T08:00:00",
  },
  {
    id: "notif-002",
    userId: "user-002",
    type: "application",
    title: "Application status updated",
    message: "Your TUM application now requires additional documents.",
    isRead: false,
    createdAt: "2026-07-01T14:22:00",
  },
  {
    id: "notif-003",
    userId: "user-002",
    type: "message",
    title: "New message from Global Education Consultants",
    message: "Don't forget the LOR deadline for Bologna is next week.",
    isRead: false,
    createdAt: "2026-07-25T10:10:00",
  },
  {
    id: "notif-004",
    userId: "user-002",
    type: "system",
    title: "Profile completion reminder",
    message: "You're at 82% profile completion — add your CV to reach 90%.",
    isRead: true,
    createdAt: "2026-06-15T09:00:00",
  },
  {
    id: "notif-005",
    userId: "user-005",
    type: "application",
    title: "New student application to review",
    message: "Nusrat Jahan submitted a new application for University of Sydney.",
    isRead: true,
    createdAt: "2026-02-10T11:00:00",
  },
  {
    id: "notif-006",
    userId: "user-005",
    type: "message",
    title: "New message from Tanvir Ahmed",
    message: "Thanks! I'll go through it today and send an updated version by tomorrow.",
    isRead: true,
    createdAt: "2026-07-25T10:03:00",
  },
  {
    id: "notif-007",
    userId: "user-001",
    type: "system",
    title: "New agency pending approval",
    message: "NextStep Education Advisors has submitted their profile for review.",
    isRead: false,
    createdAt: "2026-07-05T13:00:00",
  },
  {
    id: "notif-008",
    userId: "user-001",
    type: "system",
    title: "Monthly analytics report ready",
    message: "Your July platform analytics summary is now available.",
    isRead: true,
    createdAt: "2026-07-31T06:00:00",
  },
]

// ============================================================
// MOCK STUDENT PROFILES
// ============================================================

export const mockStudentProfiles: StudentProfile[] = [
  {
    userId: "user-002",
    fullName: "Tanvir Ahmed",
    ssc: "GPA 5.00",
    hsc: "GPA 4.83",
    bachelorsDegree: "BSc in Computer Science, CGPA 3.62",
    cgpa: 3.62,
    yearOfPassing: 2026,
    major: "Computer Science",
    ielts: 7.0,
    annualTuitionBudget: 20000,
    livingCostBudget: 12000,
    scholarshipNeed: "partial",
    targetCountries: ["Germany", "United Kingdom", "Canada"],
    targetDegreeLevel: "PG",
    preferredMajors: ["Data Science", "Artificial Intelligence", "Computer Science"],
    intakeSeason: "Fall 2027",
    profileCompletion: 82,
    eligibilityScore: 76,
  },
  {
    userId: "user-003",
    fullName: "Nusrat Jahan",
    ssc: "GPA 5.00",
    hsc: "GPA 5.00",
    bachelorsDegree: "BSc in Electrical Engineering, CGPA 3.85",
    cgpa: 3.85,
    yearOfPassing: 2025,
    major: "Electrical Engineering",
    ielts: 7.5,
    annualTuitionBudget: 30000,
    livingCostBudget: 15000,
    scholarshipNeed: "none",
    targetCountries: ["Canada", "Australia"],
    targetDegreeLevel: "PG",
    preferredMajors: ["Computer Science", "Finance"],
    intakeSeason: "Winter 2027",
    profileCompletion: 96,
    eligibilityScore: 91,
  },
]