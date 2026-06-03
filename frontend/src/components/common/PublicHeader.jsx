import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import MobileNav from './MobileNav';
import MainNav from './MainNav';

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-steel text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <Link to="/inicio" className="flex items-center gap-3 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
            <Wrench className="h-6 w-6 text-steel" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-blue-100">Taller mecánico</p>
            <h1 className="text-lg font-black">TM Premium</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <MainNav />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
