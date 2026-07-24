import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";

type StatsCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  accentColor?: string;
  onClick?: () => void;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  accentColor = COLORS.primary,
  onClick,
}: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "18px",
        padding: "22px",
        boxShadow: "0 14px 34px rgba(15,23,42,0.06)",
        cursor: onClick ? "pointer" : "default",
        transition: "0.2s ease",
        minHeight: "150px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: COLORS.textSecondary,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              margin: "12px 0 6px",
              color: accentColor,
              fontSize: "26px",
              lineHeight: 1,
            }}
          >
            {value}
          </h2>

          {subtitle && (
            <p
              style={{
                margin: 0,
                color: COLORS.textSecondary,
                fontSize: "13px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "16px",
              background: COLORS.primaryLight,
              color: accentColor,
              display: "grid",
              placeItems: "center",
              fontSize: "22px",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}