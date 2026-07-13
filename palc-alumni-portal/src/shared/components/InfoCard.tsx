import type { ReactNode } from "react";
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
      className={hoverable ? "info-card hoverable" : "info-card"}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color .18s ease, background-color .18s ease",
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
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          marginTop: "8px",
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