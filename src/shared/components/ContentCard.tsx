import { useState } from "react";
import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";

type ContentCardProps = {
  badge?: string;
  image?: string;
  author?: string;
  designation?: string;
  preview?: string;
  fullContent?: string;
  actionText?: string;
  children?: ReactNode;
};

export default function ContentCard({
  badge,
  image,
  author,
  designation,
  preview,
  fullContent,
  actionText = "Read More",
  children,
}: ContentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {badge && (
        <div
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            padding: "8px 16px",
            background: COLORS.primaryLight,
            color: COLORS.primary,
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          {badge}
        </div>
      )}

      {/* Generic cards */}
      {!image && children}

      {/* Leadership Card */}
      {image && (
        <>
          <img
            src={image}
            alt={author}
            style={{
              width: "240px",
              height: "300px",
              objectFit: "cover",
              borderRadius: 18,
              marginBottom: 22,
            }}
          />

          <h2
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1.2,
            }}
          >
            {author}
          </h2>

          <p
            style={{
              marginTop: 8,
              marginBottom: 22,
              color: COLORS.primary,
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {designation}
          </p>

          <p
            style={{
              margin: 0,
              color: COLORS.textSecondary,
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            {expanded ? fullContent : preview}
          </p>

          {fullContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginTop: 20,
                padding: 0,
                border: "none",
                background: "transparent",
                color: COLORS.primary,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              {expanded ? "Read Less ▲" : `${actionText} ▼`}
            </button>
          )}
        </>
      )}
    </div>
  );
}