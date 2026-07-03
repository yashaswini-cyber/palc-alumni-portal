import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SectionCard({ title, children }: Props) {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "24px",
        borderRadius: "18px",
        boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
        border: "1px solid #D6E4F0",
        marginBottom: "24px",
      }}
    >
      <h3
        style={{
          margin: "0 0 18px",
          color: "#0F172A",
          fontSize: "20px",
          lineHeight: 1.25,
          fontWeight: 800,
        }}
      >
        {title}
      </h3>

      {children}
    </section>
  );
}
