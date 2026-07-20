import type{ ReactNode } from "react";
import { COLORS } from "../theme/colors";

type DetailsModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
};

export default function DetailsModal({
  open,
  title,
  onClose,
  children,
  maxWidth,
}: DetailsModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#FFFFFF",
          borderRadius: "18px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "22px 28px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: COLORS.text,
              fontSize: "22px",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "24px",
              cursor: "pointer",
              color: COLORS.textSecondary,
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: "28px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}