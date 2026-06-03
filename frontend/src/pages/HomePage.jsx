import PublicHeader from '../components/common/PublicHeader';
import HomeSection from '../components/common/HomeSection';
import PublicFooter from '../components/common/PublicFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
        <HomeSection />
      </main>
      <PublicFooter />
    </div>
  );
}
