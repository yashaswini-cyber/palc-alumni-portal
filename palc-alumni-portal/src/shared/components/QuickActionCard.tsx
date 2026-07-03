import { COLORS } from "../theme/colors";

type Props = {
  title: string;
 subtitle: string;
  onClick?: () => void;
};

export default function QuickActionCard({
  title,
  subtitle,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "14px",
        padding: "18px",
        cursor: "pointer",
        minHeight: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-4px) rotate(-0.6deg)";

        e.currentTarget.style.boxShadow =
          "0 14px 30px rgba(37,99,235,0.18)";

        e.currentTarget.style.borderColor =
          COLORS.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0) rotate(0deg)";

        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(15,23,42,0.06)";

        e.currentTarget.style.borderColor =
          COLORS.border;
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            color: COLORS.text,
            fontSize: "17px",
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: COLORS.textSecondary,
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          marginTop: "14px",
          display: "flex",
          justifyContent: "flex-end",
          color: COLORS.primary,
          fontWeight: 700,
          fontSize: "13px",
        }}
      >
        Open →
      </div>
    </div>
  );
}