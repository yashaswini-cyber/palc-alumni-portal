import palcLogo from "../../assets/images/palc-logo.svg";

type LogoProps = {
  size?: number;
  variant?: "light" | "dark";
  showWordmark?: boolean;
};

export default function Logo({
  size = 64,
  variant = "light",
  showWordmark = true,
}: LogoProps) {
  const wordColor = variant === "light" ? "#0F172A" : "#FFFFFF";

  const subColor =
    variant === "light"
      ? "#64748B"
      : "rgba(255,255,255,0.70)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <img
        src={palcLogo}
        alt="PalC Networks"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />

      {showWordmark && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: Math.max(18, size * 0.45),
              fontWeight: 800,
              color: wordColor,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            PalC
          </div>

          <div
            style={{
              marginTop: 2,
              fontSize: 11,
              fontWeight: 600,
              color: subColor,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Alumni Portal
          </div>
        </div>
      )}
    </div>
  );
}