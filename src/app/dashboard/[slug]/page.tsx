const pages = ["contacts", "campaigns", "agents", "knowledge", "automations", "analytics", "whatsapp", "billing", "settings"];

// This is a catch-all placeholder — each will be built out individually
export default function PlaceholderPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-ink-600 embossed capitalize">
        {params?.slug ?? "Page"}
      </h1>
      <p className="text-ink-300 text-sm mt-1">This module will be built next.</p>
    </div>
  );
}
