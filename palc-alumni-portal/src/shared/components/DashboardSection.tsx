import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";

type DashboardSectionProps = {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  children: ReactNode;
};

export default function DashboardSection({
  title,
  subtitle,
  actionText,
  onActionClick,
  children,
}: DashboardSectionProps) {
  return (
    <div
      style={{
        background: COLORS.surface,
        borderRadius: 18,
        border: `1px solid ${COLORS.border}`,
        boxShadow: `0 6px 16px ${COLORS.shadow}`,
        padding: 28,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: COLORS.text,
              fontSize: 24,
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              style={{
                marginTop: 6,
                marginBottom: 0,
                color: COLORS.textSecondary,
                fontSize: 14,
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
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {actionText}
          </button>
        )}
      </div>

      {children}
    </div>
  );
}