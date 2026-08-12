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
  resume: File | null;
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
  resume: null,
};

export default function ReferralFormModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ReferralForm>(emptyForm);
  const [validationError, setValidationError] = useState("");

  const updateField = (
    key: keyof ReferralForm,
    value: string | File | null
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (validationError) {
      setValidationError("");
    }
  };

  const handleSubmit = () => {
    if (
      !form.candidate.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.position.trim()
    ) {
      setValidationError("Please fill all the mandatory fields.");
      return;
    }

    if (!form.resume) {
      setValidationError("Please attach the candidate's resume.");
      return;
    }

    setValidationError("");

    onSubmit(form);

    setForm(emptyForm);
    onClose();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: `1px solid ${COLORS.border}`,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  } as const;

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => !data.open && onClose()}
    >
      <DialogSurface
        style={{
          width: "720px",
          maxWidth: "95vw",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,.15)",
            background:
              "linear-gradient(120deg,#0A1B3D 0%,#123A7A 45%,#2563EB 78%,#38BDF8 100%)",
            color: "#FFFFFF",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            Submit Referral
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              color: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <div
          style={{
            padding: "24px",
            background: "#F8FAFC",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${COLORS.border}`,
              borderRadius: "18px",
              padding: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              gap: "18px",
              boxShadow: "0 6px 18px rgba(15,76,129,0.08)",
            }}
          >
            {/* Candidate Name */}
            <input
              placeholder="Candidate Name *"
              value={form.candidate}
              onChange={(e) =>
                updateField("candidate", e.target.value)
              }
              style={inputStyle}
            />

            {/* Email */}
            <input
              placeholder="Email *"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              style={inputStyle}
            />

            {/* Phone */}
            <input
              placeholder="Phone Number *"
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              style={inputStyle}
            />

            {/* Company */}
            <input
              placeholder="Current Company"
              value={form.company}
              onChange={(e) =>
                updateField("company", e.target.value)
              }
              style={inputStyle}
            />

            {/* Experience */}
            <input
              placeholder="Years of Experience (if any)"
              value={form.experience}
              onChange={(e) =>
                updateField("experience", e.target.value)
              }
              style={inputStyle}
            />

            {/* Position */}
            <input
              placeholder="Position Applied For *"
              value={form.position}
              onChange={(e) =>
                updateField("position", e.target.value)
              }
              style={inputStyle}
            />

            {/* LinkedIn */}
            <input
              placeholder="LinkedIn Profile"
              value={form.linkedin}
              onChange={(e) =>
                updateField("linkedin", e.target.value)
              }
              style={{
                ...inputStyle,
                gridColumn: "1 / span 2",
              }}
            />

            {/* RESUME */}
            <label
              style={{
                gridColumn: "1 / span 2",
                width: "100%",
                minHeight: "90px",
                padding: "16px",
                borderRadius: "10px",
                border: `1px dashed ${COLORS.border}`,
                background: "#F8FAFC",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                {form.resume
                  ? form.resume.name
                  : "Attach Resume *"}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: COLORS.textSecondary,
                }}
              >
                Supported formats: PDF, DOC, DOCX
              </div>

              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;

                  if (file) {
                    updateField("resume", file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* VALIDATION ERROR */}
        {validationError && (
          <div
            style={{
              padding: "0 28px 16px",
              color: "#DC2626",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {validationError}
          </div>
        )}

        {/* FOOTER */}
        <div
          style={{
            padding: "20px 28px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            borderTop: `1px solid ${COLORS.border}`,
            background: "#F8FAFC",
          }}
        >
          <button
            onClick={onClose}
            style={{
              minWidth: "110px",
              height: "44px",
              padding: "0 20px",
              borderRadius: "10px",
              border: `1px solid ${COLORS.border}`,
              background: "#FFFFFF",
              color: COLORS.text,
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F8FAFC";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
            }}
          >
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
