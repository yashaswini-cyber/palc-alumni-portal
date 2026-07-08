import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";

type InfoCardProps = {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function InfoCard({
  title,
  subtitle,
  icon,
  action,
}: InfoCardProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
          margin: 0,
          color: COLORS.text,
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginTop: "12px",
          color: COLORS.textSecondary,
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {subtitle}
      </p>

      {action && (
        <div
          style={{
            marginTop: "24px",
          }}
        >
          {action}
        </div>
      )}
    </div>
  );
}