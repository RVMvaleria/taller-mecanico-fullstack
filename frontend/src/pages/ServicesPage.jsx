import PublicHeader from '../components/common/PublicHeader';
import ServicesSection from '../components/common/ServicesSection';
import PublicFooter from '../components/common/PublicFooter';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
        <ServicesSection />
      </main>
      <PublicFooter />
    </div>
  );
}
