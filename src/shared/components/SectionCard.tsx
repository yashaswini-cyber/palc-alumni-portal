import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";

type Props = {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  children: ReactNode;
};

export default function SectionCard({
  title,
  subtitle,
  actionText,
  onActionClick,
  children,
}: Props) {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "28px",
        borderRadius: "20px",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 18px 42px rgba(15,23,42,0.07)",
        marginBottom: "28px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: COLORS.text,
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                color: COLORS.textSecondary,
                fontSize: "14px",
                lineHeight: 1.6,
                maxWidth: "700px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actionText && (
          <button
            onClick={onActionClick}
            style={{
              background: COLORS.primary,
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {actionText}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}