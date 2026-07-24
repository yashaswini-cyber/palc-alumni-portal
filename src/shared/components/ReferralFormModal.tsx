import { useState } from "react";
import { Dialog, DialogSurface } from "@fluentui/react-components";
import PrimaryButton from "../..//shared/components/PrimaryButton";
import { COLORS } from "../..//shared/theme/colors";

type ReferralForm = {
  candidate: string;
  email: string;
  phone: string;
  company: string;
  experience: string;
  position: string;
  linkedin: string;
  notes: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReferralForm) => void;
};

const emptyForm: ReferralForm = {
  candidate: "",
  email: "",
  phone: "",
  company: "",
  experience: "",
  position: "",
  linkedin: "",
  notes: "",
};

export default function ReferralFormModal({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [validationError, setValidationError] = useState("");
  const updateField = (key: keyof ReferralForm, value: string) => {
  setForm((prev) => ({ ...prev, [key]: value }));
  if (validationError) setValidationError("");
};

  const handleSubmit = () => {
  if (!form.candidate.trim() || !form.email.trim() || !form.phone.trim() || !form.position.trim()) {
    setValidationError("Please fill all the mandatory fields.");
    return;
  }

  setValidationError("");
  onSubmit(form);
  setForm(emptyForm);
  onClose();
};

  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "14px", outline: "none", boxSizing: "border-box" } as const;

  return (
    <Dialog open={open} onOpenChange={(_, data) => !data.open && onClose()}>
      <DialogSurface style={{ width: "720px", maxWidth: "95vw", padding: 0, overflow: "hidden" }}>

        <div style={{ padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",borderBottom: "1px solid rgba(255,255,255,.15)", background: COLORS.primary, color: "#fff" }}>
          <h2 style={{ margin: 0, fontSize: "22px" }}>Submit Referral</h2>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{ width: "40px", height: "40px", border: "none", borderRadius: "50%", background: "rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 500, lineHeight: 1 }}
            >
            ×
            </button>
        </div>

        <div style={{ padding: "24px", background: "#F8FAFC" }}>
            <div style={{ background: "#FFFFFF", border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "24px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "18px", boxShadow: "0 6px 18px rgba(15,76,129,0.08)" }}>
          <input placeholder="Candidate Name *" value={form.candidate} onChange={(e) => updateField("candidate", e.target.value)} style={inputStyle} />
          <input placeholder="Email *" value={form.email} onChange={(e) => updateField("email", e.target.value)} style={inputStyle} />
          <input placeholder="Phone Number *" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} style={inputStyle} />
          <input placeholder="Current Company" value={form.company} onChange={(e) => updateField("company", e.target.value)} style={inputStyle} />
          <input placeholder="Years of Experience (if any)" value={form.experience} onChange={(e) => updateField("experience", e.target.value)} style={inputStyle} />
          <input placeholder="Position Applied For *" value={form.position} onChange={(e) => updateField("position", e.target.value)} style={inputStyle} />
          <input placeholder="LinkedIn Profile" value={form.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / span 2" }} />
          <textarea placeholder="Additional Notes" value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical", gridColumn: "1 / span 2" }} />
        </div>
            </div>

        {validationError && (
        <div style={{ padding: "0 28px 16px", color: "#DC2626", fontSize: "14px", fontWeight: 500 }}>
          {validationError}
        </div>
      )}
        <div style={{ padding: "20px 28px", display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: `1px solid ${COLORS.border}`, background: "#F8FAFC" }}>
          <button onClick={onClose} style={{ minWidth: "110px", height: "44px", padding: "0 20px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: "#FFFFFF", color: COLORS.text, fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}>
            Cancel
          </button>

          <PrimaryButton onClick={handleSubmit}>
            Submit Referral
          </PrimaryButton>

        </div>

      </DialogSurface>
    </Dialog>
  );
}