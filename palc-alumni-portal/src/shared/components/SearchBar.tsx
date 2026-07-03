export default function SearchBar() {
  return (
    <label
      style={{
        width: "min(100%, 420px)",
        height: "46px",
        padding: "0 16px",
        borderRadius: "14px",
        border: "1px solid #D6E4F0",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
      }}
    >
      <span style={{ color: "#64748B", fontSize: "12px", fontWeight: 850 }}>
        SR
      </span>

      <input
        type="search"
        placeholder="Search documents, records, requests"
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          color: "#0F172A",
          fontSize: "14px",
          fontFamily: "inherit",
        }}
      />
    </label>
  );
}
