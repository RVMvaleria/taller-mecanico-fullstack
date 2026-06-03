import PublicHeader from '../components/common/PublicHeader';
import ContactSection from '../components/common/ContactSection';
import PublicFooter from '../components/common/PublicFooter';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}
