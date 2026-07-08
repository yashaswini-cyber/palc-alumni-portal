import type { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({
  children,
  fullWidth = false,
  loading = false,
  disabled,
  style,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        minHeight: "48px",
        padding: "12px 22px",
        border: "none",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 700,
        fontFamily: "inherit",
        color: "#FFFFFF",
        background:
          "linear-gradient(90deg,#004CC7 0%,#389DE8 58%,#00B1F7 100%)",
        boxShadow:
          "0 12px 24px rgba(0,76,199,.25)",
        cursor:
          disabled || loading
            ? "not-allowed"
            : "pointer",
        width: fullWidth ? "100%" : "auto",
        transition:
          "all .25s ease",
        opacity: disabled ? 0.6 : 1,
        userSelect: "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.transform =
          "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 18px 34px rgba(0,76,199,.35)";
        e.currentTarget.style.filter =
          "brightness(1.05)";
      }}
      onMouseLeave={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.transform =
          "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(0,76,199,.25)";
        e.currentTarget.style.filter =
          "brightness(1)";
      }}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}