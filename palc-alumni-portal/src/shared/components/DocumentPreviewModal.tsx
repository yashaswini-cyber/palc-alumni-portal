import { Dialog, DialogSurface } from "@fluentui/react-components";

type Props = {
  open: boolean;
  onClose: () => void;
  pdfPath: string;
  title: string;
};

export default function DocumentPreviewModal({
  open,
  onClose,
  pdfPath,
  title,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(_, data) => !data.open && onClose()}>
      <DialogSurface
        style={{
          width: "90vw",
          maxWidth: "1000px",
          height: "90vh",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}

        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            background: "#2563EB",
            color: "white",
          }}
        >
          <h2
            style={{
              margin: 0,
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close Preview"
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "22px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.28)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            }}
            >
            ✕
            </button>
        </div>

        {/* Watermark */}

        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "20%",
            fontSize: "42px",
            color: "rgba(0,0,0,.08)",
            transform: "rotate(-30deg)",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 20,
          }}
        >
          PALC CONFIDENTIAL
        </div>

        {/* PDF */}

        <iframe
          src={pdfPath}
          width="100%"
          height="100%"
          title={title}
          style={{
            border: "none",
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </DialogSurface>
    </Dialog>
  );
}