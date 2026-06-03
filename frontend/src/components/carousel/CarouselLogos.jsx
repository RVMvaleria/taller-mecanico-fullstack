import React from 'react';

const brands = [
  { name: 'Brembo', logo: '/brands/brembo.png' },
  { name: 'Bosch', logo: '/brands/bosch-logo-simple.svg' },
  { name: 'Mobil 1', logo: '/brands/mobil.png' },
  { name: 'Michelin', logo: '/brands/michelin.webp' },
  { name: 'Castrol', logo: '/brands/castrol.png' },
  { name: 'ACDelco', logo: '/brands/acdelco.svg' },
];

export default function Carrusel() {
  //array duplicado para que no vaya a haber huecos
  const brandLogos = [...brands, ...brands];

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Trabajamos con las mejores marcas y refacciones
        </h3>
      </div>
      
      <div className="relative w-full overflow-x-hidden border-y border-slate-100 bg-slate-50 py-6">
        {/* que se vea desvanecido en los bordes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        {/*aqui va la animacion */}
        <div className="flex w-max animate-marquee flex-nowrap gap-16 pr-16">
          {brandLogos.map((brand, index) => (
            <div 
              key={index} 
             
              className="flex h-16 w-40 flex-shrink-0 items-center justify-center transition duration-300 hover:scale-110"
            >
              <img
                src={brand.logo}
                alt={`Logo de ${brand.name}`}
               
                className="max-h-full max-w-full object-contain block"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}