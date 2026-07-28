import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";

type HeroAction = {
  title: string;
  onClick: () => void;
};
type HeroPill = {
  title: string;
  value: string;
  color: string;
};
type HeroBannerProps = {
  badge: string;
  title: string;
  onClick?: () => void;
  subtitle: string;
  actions: HeroAction[];
  pills?: HeroPill[];
  summaryCard: ReactNode;
};
export default function HeroBanner({
  badge,
  title,
  subtitle,
  actions,
  pills = [],
  summaryCard,
}: HeroBannerProps) {
  return (
    <section
      style={{
        minHeight: "280px",
        borderRadius: "24px",
        overflow: "hidden",
        background:
          "linear-gradient(120deg,#0A1B3D 0%,#123A7A 45%,#2563EB 78%,#38BDF8 100%)",
        color: "#FFFFFF",
        display: "grid",
        gridTemplateColumns: "minmax(0,1.35fr) minmax(280px,.65fr)",
        alignItems: "stretch",
        boxShadow: "0 24px 60px rgba(15,27,61,.28)",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          padding: "38px 42px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            opacity: .82,
          }}
        >
          {badge}
        </p>

        <h2
          style={{
            margin: "14px 0 0",
            color: "#fff",
            fontSize: "42px",
            fontWeight: 850,
            lineHeight: 1.08,
            maxWidth: "720px",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            marginTop: "16px",
            maxWidth: "680px",
            color: "rgba(255,255,255,.86)",
            fontSize: "15px",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "36px",
          }}
        >
          {actions.map((item) => (
             <button
              key={item.title}
              onClick={item.onClick}
              style={{
                borderRadius: "999px",
                background: "rgba(255,255,255,.18)",
                border: "1px solid rgba(255,255,255,.28)",
                padding: "13px 22px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(0,0,0,.12)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.28)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.18)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* STATUS PILLS */}
        {pills.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            {pills.map((pill) => (
              <div
                key={pill.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,.10)",
                  border: "1px solid rgba(255,255,255,.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: pill.color,
                  }}
                />

                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,.82)",
                    fontWeight: 600,
                  }}
                >
                  {pill.title}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {pill.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
        <div
        style={{
          padding: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "320px",
            borderRadius: "22px",
            background: "rgba(255,255,255,.95)",
            padding: "24px",
            color: COLORS.text,
            boxShadow: "0 20px 45px rgba(15,23,42,.18)",
          }}
        >
          {summaryCard}
        </div>
      </div>
    </section>
  );
}