import { COLORS } from "../theme/colors";

type Props = {
  title: string;
  value: string;
  status: string;
  description: string;
  buttonText: string;
  color: string;
  onClick?: () => void;
};

export default function DashboardCard({
  title,
  value,
  status,
  description,
  buttonText,
  color,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.surface,
        borderRadius: 18,
        padding: 22,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 220,
        cursor: "pointer",
        transition: "all .25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 18px 30px rgba(37,99,235,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(15,23,42,.06)";
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: COLORS.textSecondary,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "10px 0 6px",
            color,
            fontSize: 34,
          }}
        >
          {value}
        </h2>

        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            background: COLORS.primaryLight,
            color,
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {status}
        </span>

        <p
          style={{
            marginTop: 16,
            color: COLORS.textSecondary,
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      <button
        style={{
          marginTop: 18,
          padding: "10px 14px",
          borderRadius: 10,
          border: "none",
          background: color,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}