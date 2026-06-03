import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="space-y-12 sm:space-y-16">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy">Contacto</h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600">
          Ponte en contacto con nosotros
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        <div className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100">
              <Phone className="h-7 w-7 text-steel" />
            </div>
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Teléfono</h3>
          <p className="text-xs sm:text-sm text-slate-600">Llámanos durante horario comercial</p>
          <p className="text-xs sm:text-sm text-slate-600">Lunes a Viernes de 8:00 a 16:00</p>
          <div className="space-y-2">
            <a
              href="tel:+56912345678"
              className="block text-base sm:text-lg font-semibold text-steel hover:underline transition"
            >
              +52 492 203 6767
            </a>
            <a
              href="tel:+56212345678"
              className="block text-base sm:text-lg font-semibold text-steel hover:underline transition"
            >
              +52 492 302 4321
            </a>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100">
              <Mail className="h-7 w-7 text-steel" />
            </div>
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Email</h3>
          <p className="text-xs sm:text-sm text-slate-600">Envíanos un correo</p>
          <a
            href="mailto:contacto@tmpremium.cl"
            className="block text-base sm:text-lg font-semibold text-steel hover:underline transition break-all"
          >
            contacto@itz.edu.mx
          </a>
        </div>
        <div className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100">
              <MapPin className="h-7 w-7 text-steel" />
            </div>
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Ubicación</h3>
          <p className="text-xs sm:text-sm text-slate-600">Visítanos en</p>
          <p className="text-sm font-semibold text-slate-900">
            Carretera Panamericana, Entronque a GDL S/N
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Zacatecas Centro, 98160, Zacatecas, Zac.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-navy">Síguenos</h3>
        <div className="mt-6 sm:mt-8 flex justify-center gap-6 flex-wrap">
          <a
            href="https://www.facebook.com/ITZOficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-steel transition hover:bg-steel hover:text-white"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/tecnm.zac/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-steel transition hover:bg-steel hover:text-white"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://media1.tenor.com/m/qRZ8z0bUsFgAAAAd/meme-scuba.gif"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-steel transition hover:bg-steel hover:text-white"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
