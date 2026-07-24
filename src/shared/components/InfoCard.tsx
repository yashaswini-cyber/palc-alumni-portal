import type { CSSProperties, ReactNode } from "react";
import { COLORS } from "../theme/colors";

type InfoCardProps = {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  action?: ReactNode;
  hoverable?: boolean;
};

export default function InfoCard({
  title,
  subtitle,
  icon,
  action,
  hoverable = false,
}: InfoCardProps) {
  return (
    <div
  style={{
    border: `1px solid ${COLORS.border}`,
    borderRadius: "16px",
    padding: "20px",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "all 0.25s ease",
    cursor: hoverable ? "pointer" : "default",
    boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
  }}
  onMouseEnter={(e) => {
    if (!hoverable) return;

    Object.assign(e.currentTarget.style, {
      transform: "translateY(-4px)",
      borderColor: COLORS.primary,
      boxShadow: "0 18px 36px rgba(37,99,235,0.18)",
    } satisfies CSSProperties);
  }}
  onMouseLeave={(e) => {
    if (!hoverable) return;

    Object.assign(e.currentTarget.style, {
      transform: "translateY(0)",
      borderColor: COLORS.border,
      boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
    } satisfies CSSProperties);
  }}
>
      {icon && (
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: COLORS.primaryLight,
            display: "grid",
            placeItems: "center",
            marginBottom: "18px",
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          margin: "0 0 8px",
          color: COLORS.text,
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: COLORS.textSecondary,
          lineHeight: 1.7,
          fontSize: "14px",
          flex: 1,
        }}
      >
        {subtitle}
      </p>

      {action && (
        <div style={{ marginTop: "24px" }}>
          {action}
        </div>
      )}
    </div>
  );
}