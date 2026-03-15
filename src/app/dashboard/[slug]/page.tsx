// All dashboard sub-pages have been built individually.
// This file is kept as a fallback for any unknown routes.
export default async function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-saas-text capitalize">
        {slug ?? "Page"}
      </h1>
      <p className="text-saas-subtext text-sm mt-1">This page is not yet available.</p>
    </div>
  );
}
