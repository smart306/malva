import RegulationP from "@/components/regulation";
import Regulation from "@/lib/models/regulation";

export default async function RegulationPage({ params }) {
  const { slug } = await params;

  const regulationRaw = await Regulation.findOne({ slug }).lean();

  if (!regulationRaw) {
    return <div className="p-8">Regulation not found.</div>;
  }

  const regulation = {
    ...regulationRaw,
    _id: regulationRaw._id.toString(),
    date: regulationRaw.date.toString(), 
    createdAt: regulationRaw.createdAt?.toISOString(),
    updatedAt: regulationRaw.updatedAt?.toISOString(),
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
        <RegulationP data={regulation}/>
    </main>
  );
}