import { BadgePercent, MapPin, BrainCircuit, Truck, ShieldCheck } from 'lucide-react';

export default function WhyFarmart() {
  const features = [
    {
      icon: <BadgePercent className="w-8 h-8 text-brand-500" />,
      title: "Zero Platform Commission",
      description: "Farmer controls the base selling price. No hidden cuts."
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand-500" />,
      title: "Hyperlocal Discovery",
      description: "Nearby supply is prioritized to ensure freshness and reduce logistics."
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-brand-500" />,
      title: "AI-Assisted Decisions",
      description: "AI recommends dynamic prices and provides demand insights."
    },
    {
      icon: <Truck className="w-8 h-8 text-brand-500" />,
      title: "Smart Delivery",
      description: "Distance and order details influence transparent delivery feasibility."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-500" />,
      title: "Trust & Reputation",
      description: "Verified farmers and community-driven buyer ratings."
    }
  ];

  return (
    <div className="py-12 bg-white rounded-2xl shadow-sm border border-gray-100 my-8">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900">Why Farmart?</h2>
        <p className="mt-4 text-lg text-gray-600">Empowering farmers and consumers through a transparent hyperlocal network.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-brand-50 transition-colors">
            <div className="bg-brand-100 p-4 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
