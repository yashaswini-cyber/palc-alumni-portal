import { alumniAccounts } from "../../data/mockEmployeeData";

export interface EmploymentDocument {
  id: string;
  employeeId: string;
  employeeName: string;
  name: string;
  category: string;
  uploadedBy: string;
  version: string;
  date: string;
  format: string;
  status: string;
  path: string;
}
export interface VerificationRequest {
  id: string;
  company: string;
  requester: string;
  date: string;
  type: string;
  stage: string;
  status: string;
}

const DOCUMENTS_KEY = "palc-employment-documents";
const VERIFICATION_REQUESTS_KEY = "palc-verification-requests";
const ALUMNI_ACCOUNTS_KEY = "palc-alumni-accounts";
const defaultDocuments: EmploymentDocument[] = [
  { id: "DOC-001", employeeId: "PALC-1023", employeeName: "Rahul Sharma", name: "Experience Certificate", category: "Employment Record", uploadedBy: "HR Operations", version: "v1.0", date: "12-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-002", employeeId: "PALC-1047", employeeName: "Sneha Iyer", name: "Relieving Letter", category: "Employment Record", uploadedBy: "HR Operations", version: "v1.2", date: "15-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-003", employeeId: "PALC-1008", employeeName: "Karan Mehta", name: "Form 16", category: "Tax Document", uploadedBy: "Finance", version: "v2.0", date: "30-Mar-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-004", employeeId: "PALC-1061", employeeName: "Priya Nair", name: "Last Payslip", category: "Payroll", uploadedBy: "Payroll Team", version: "v1.0", date: "31-Dec-2024", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-005", employeeId: "PALC-1084", employeeName: "Arjun Rao", name: "Full & Final (F&F) Settlement Statement", category: "Settlement", uploadedBy: "Finance", version: "v1.0", date: "18-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-006", employeeId: "PALC-1096", employeeName: "Neha Kapoor", name: "PF Transfer Documents", category: "Provident Fund", uploadedBy: "HR Operations", version: "v1.1", date: "20-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" }
];
const defaultVerificationRequests: VerificationRequest[] = [
  {
    id: "VR001",
    company: "Microsoft",
    requester: "HR Team",
    date: "10 June 2026",
    type: "Employment Verification",
    stage: "HR Review",
    status: "Approved",
  },
  {
    id: "VR002",
    company: "Google",
    requester: "Background Verification Agency",
    date: "18 June 2026",
    type: "Background Verification",
    stage: "Processing",
    status: "Pending",
  },
  {
    id: "VR003",
    company: "Amazon",
    requester: "Recruitment Team",
    date: "20 June 2026",
    type: "Employment Verification",
    stage: "Completed",
    status: "Approved",
  },
];

export function getDocuments(): EmploymentDocument[] {
  const stored = localStorage.getItem(DOCUMENTS_KEY);

  if (!stored) {
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(defaultDocuments));
    return defaultDocuments;
  }

  return JSON.parse(stored);
}

export function saveDocuments(documents: EmploymentDocument[]) {
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
}

export function addDocument(document: EmploymentDocument) {
  const documents = getDocuments();
  documents.unshift(document);
  saveDocuments(documents);
}

export function replaceDocuments(documents: EmploymentDocument[]) {
  saveDocuments(documents);
}
export function getVerificationRequests(): VerificationRequest[] {
  const stored = localStorage.getItem(
    VERIFICATION_REQUESTS_KEY
  );

  if (!stored) {
    localStorage.setItem(
      VERIFICATION_REQUESTS_KEY,
      JSON.stringify(defaultVerificationRequests)
    );

    return defaultVerificationRequests;
  }

  return JSON.parse(stored);
}
export function saveVerificationRequests(
  requests: VerificationRequest[]
) {
  localStorage.setItem(
    VERIFICATION_REQUESTS_KEY,
    JSON.stringify(requests)
  );
}
export function addVerificationRequest(
  request: VerificationRequest
) {
  const requests = getVerificationRequests();

  requests.unshift(request);

  saveVerificationRequests(requests);
}
export function getAlumniAccounts() {
  const stored = localStorage.getItem(ALUMNI_ACCOUNTS_KEY);

  if (!stored) {
    localStorage.setItem(
      ALUMNI_ACCOUNTS_KEY,
      JSON.stringify(alumniAccounts)
    );

    return alumniAccounts;
  }

  return JSON.parse(stored);
}

export function saveAlumniAccounts(accounts: typeof alumniAccounts) {
  localStorage.setItem(
    ALUMNI_ACCOUNTS_KEY,
    JSON.stringify(accounts)
  );
}

export function updateAlumniAccount(
  employeeId: string,
  password: string
) {
  const accounts = getAlumniAccounts();

  const account = accounts.find(
    (a: any) => a.employeeId === employeeId
  );

  if (!account) return;

  account.password = password;
  account.activated = true;

  saveAlumniAccounts(accounts);
}