type StatusBadgeProps = {
  status: string;
};

const getBadgeStyle = (status: string) => {
  switch (status) {
    case "Approved":
    case "Available":
    case "Open":
    case "Low":
      return {
        background: "#ECFDF3",
        color: "#027A48",
        border: "#ABEFC6",
      };

    case "Pending":
    case "Medium":
      return {
        background: "#FFFAEB",
        color: "#B54708",
        border: "#FEDF89",
      };

    case "Rejected":
    case "High":
      return {
        background: "#FEF3F2",
        color: "#B42318",
        border: "#FECDCA",
      };

    case "Upcoming":
      return {
        background: "#EFF6FF",
        color: "#0F6CBD",
        border: "#BFDBFE",
      };

    case "Closed":
      return {
        background: "#F1F5F9",
        color: "#475569",
        border: "#CBD5E1",
      };

    default:
      return {
        background: "#F8FAFC",
        color: "#475569",
        border: "#D6E4F0",
      };
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const badge = getBadgeStyle(status);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: badge.background,
        color: badge.color,
        border: `1px solid ${badge.border}`,
        padding: "5px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        lineHeight: 1,
        fontWeight: 800,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
