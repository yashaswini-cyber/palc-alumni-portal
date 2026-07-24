type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div
      style={{
        marginBottom: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "24px",
      }}
    >
      <div style={{ maxWidth: "820px" }}>
        <p
          style={{
            margin: "0 0 10px",
            color: "#2563EB",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
        </p>

        <h1
          style={{
            margin: 0,
            color: "#0F172A",
            fontSize: "28px",
            fontWeight: 850,
            lineHeight: 1.12,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            marginTop: "12px",
            marginBottom: 0,
            color: "#64748B",
            fontSize: "15px",
            lineHeight: 1.65,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
