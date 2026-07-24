import { useEffect } from "react";
import { COLORS } from "../theme/colors";

type ToastType = "success" | "error" | "warning" | "info";

type ToastProps = {
  show: boolean;
  type?: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  show,
  type = "success",
  title,
  message,
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const colors = {
    success: {
      background: "#ECFDF3",
      border: "#16A34A",
      title: "#166534",
    },
    error: {
      background: "#FEF2F2",
      border: "#DC2626",
      title: "#991B1B",
    },
    warning: {
      background: "#FFF7ED",
      border: "#F59E0B",
      title: "#92400E",
    },
    info: {
      background: "#EFF6FF",
      border: COLORS.primary,
      title: COLORS.primary,
    },
  };

  const style = colors[type];

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: "480px",
        maxWidth: "90%",
        background: style.background,
        borderLeft: `5px solid ${style.border}`,
        borderRadius: "16px",
        padding: "18px 20px",
        boxShadow:"0 14px 36px rgba(15,23,42,.12)",
        zIndex: 9999,
        animation: "fadeIn 0.3s ease",
      }}
    >
      <h4
        style={{
          margin: 0,
          color: style.title,
          fontSize: "17px",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          marginTop: "8px",
          marginBottom: 0,
          color: COLORS.textSecondary,
          lineHeight: 1.6,
          fontSize: "14px",
        }}
      >
        {message}
      </p>
    </div>
  );
}