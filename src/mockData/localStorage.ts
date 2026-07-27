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

const DOCUMENTS_KEY = "palc-employment-documents";

const defaultDocuments: EmploymentDocument[] = [
  { id: "DOC-001", employeeId: "PALC-1023", employeeName: "Rahul Sharma", name: "Experience Certificate", category: "Employment Record", uploadedBy: "HR Operations", version: "v1.0", date: "12-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-002", employeeId: "PALC-1047", employeeName: "Sneha Iyer", name: "Relieving Letter", category: "Employment Record", uploadedBy: "HR Operations", version: "v1.2", date: "15-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-003", employeeId: "PALC-1008", employeeName: "Karan Mehta", name: "Form 16", category: "Tax Document", uploadedBy: "Finance", version: "v2.0", date: "30-Mar-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-004", employeeId: "PALC-1061", employeeName: "Priya Nair", name: "Last Payslip", category: "Payroll", uploadedBy: "Payroll Team", version: "v1.0", date: "31-Dec-2024", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-005", employeeId: "PALC-1084", employeeName: "Arjun Rao", name: "Full & Final (F&F) Settlement Statement", category: "Settlement", uploadedBy: "Finance", version: "v1.0", date: "18-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-006", employeeId: "PALC-1096", employeeName: "Neha Kapoor", name: "PF Transfer Documents", category: "Provident Fund", uploadedBy: "HR Operations", version: "v1.1", date: "20-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" }
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