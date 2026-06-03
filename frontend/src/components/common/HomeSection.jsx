import {
  Users,
  Clock,
  Wrench,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Gauge,
  Star,
} from 'lucide-react';
import Carrusel from '../carousel/CarouselLogos';
import ImageCarousel from '../carousel/CarouselImagenes';

export default function HomeSection() {
  return (
    <section className="relative -m-4 sm:-m-6 lg:-m-8 min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#38BDF8_0%,transparent_28%),radial-gradient(circle_at_bottom_right,#2563EB_0%,transparent_30%),linear-gradient(135deg,#0F172A_0%,#1E3A8A_38%,#1E40AF_72%,#2563EB_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Fondo decorativo general */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#22D3EE]/25 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#38BDF8]/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#0F172A]/60 blur-3xl" />
        <div className="absolute bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#1E40AF]/25 blur-3xl" />

        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.35)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      </div>

      <div className="relative z-10 space-y-14 sm:space-y-20">
        {/* HERO PRINCIPAL */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#0F172A]/70 bg-white/10 p-4 shadow-2xl shadow-[#0F172A]/50 backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="absolute inset-0 border border-white/10 rounded-[2.5rem]" />

          {/* Forma diagonal llamativa */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#38BDF8]/20" />
          <div className="absolute -right-32 top-0 h-full w-2/3 skew-x-[-12deg] border-l border-[#0F172A]/40 bg-gradient-to-br from-[#22D3EE]/20 via-[#2563EB]/20 to-white/10 blur-sm" />
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-[#38BDF8]/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Texto */}
            <div className="space-y-6 rounded-[2rem] border border-[#334155]/80 bg-[#0F172A]/55 p-6 shadow-2xl shadow-[#0F172A]/40 backdrop-blur sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1E40AF]/70 bg-[#0F172A]/50 px-4 py-2 text-sm font-semibold text-blue-100 shadow-lg shadow-[#0F172A]/30 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Servicio automotriz premium
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                  Bienvenido a{' '}
                  <span className="bg-gradient-to-r from-white via-[#DBEAFE] to-[#22D3EE] bg-clip-text text-transparent drop-shadow">
                    TM Premium
                  </span>
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-slate-200 leading-relaxed">
                  Tu taller mecánico de confianza con profesionales altamente calificados
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F172A]/40 bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] px-5 py-3 text-sm font-bold text-navy shadow-lg shadow-[#0F172A]/30 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Conocer servicios
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#quienes-somos"
                  className="inline-flex items-center justify-center rounded-xl border border-[#334155]/80 bg-[#0F172A]/45 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#0F172A]/70"
                >
                  ¿Quiénes somos?
                </a>
              </div>

              {/* Indicadores */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="rounded-2xl border border-[#334155]/80 bg-[#0F172A]/45 p-4 shadow-lg shadow-[#0F172A]/25 backdrop-blur">
                  <p className="text-2xl font-black text-white">10+</p>
                  <p className="text-xs text-slate-300">Años de experiencia</p>
                </div>

                <div className="rounded-2xl border border-[#334155]/80 bg-[#0F172A]/45 p-4 shadow-lg shadow-[#0F172A]/25 backdrop-blur">
                  <p className="text-2xl font-black text-white">24h</p>
                  <p className="text-xs text-slate-300">Atención rápida</p>
                </div>

                <div className="rounded-2xl border border-[#334155]/80 bg-[#0F172A]/45 p-4 shadow-lg shadow-[#0F172A]/25 backdrop-blur">
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-slate-300">Compromiso</p>
                </div>
              </div>
            </div>

            {/* Fotos con diseño más grande y llamativo */}
            <div className="relative min-h-[420px] lg:min-h-[520px]">
              <div className="absolute -left-6 top-10 hidden h-28 w-28 rotate-12 rounded-[2rem] border border-[#334155]/80 bg-[#0F172A]/35 backdrop-blur lg:block" />
              <div className="absolute -right-8 bottom-14 hidden h-32 w-32 -rotate-12 rounded-full border border-[#334155]/80 bg-[#0F172A]/45 backdrop-blur lg:block" />
              <div className="absolute left-10 bottom-0 hidden h-20 w-20 rounded-full bg-[#38BDF8]/30 blur-2xl lg:block" />

              <div className="absolute inset-0 scale-105 rounded-[3rem] bg-gradient-to-br from-[#38BDF8]/30 via-[#1E40AF]/25 to-[#0F172A]/40 blur-2xl" />

              <div className="relative h-[420px] overflow-hidden rounded-[3rem] rounded-tr-[9rem] border border-[#0F172A]/80 bg-[#0F172A]/35 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:rotate-0 lg:h-[520px] lg:rotate-1">
                <div className="absolute inset-0 rounded-[3rem] rounded-tr-[9rem] border border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-[#38BDF8]/25" />

                <div className="absolute -right-20 top-0 h-full w-1/2 skew-x-[-12deg] border-l border-[#0F172A]/60 bg-gradient-to-b from-white/20 to-[#22D3EE]/20" />

                <div className="relative h-full overflow-hidden rounded-[2.5rem] rounded-tr-[8rem] border border-[#334155]/70">
                  <div className="h-full [&>*]:h-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
                    <ImageCarousel />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 rounded-2xl border border-[#334155]/80 bg-[#0F172A]/80 px-5 py-4 text-white shadow-xl shadow-[#0F172A]/50 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#0F172A]/40 bg-gradient-to-br from-[#22D3EE] to-[#1E40AF] shadow-lg shadow-cyan-400/20">
                      <Gauge className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-base font-black">Diagnóstico rápido</p>
                      <p className="text-xs text-slate-300">Tecnología y precisión</p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-[#334155]/80 bg-[#0F172A]/65 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#0F172A]/40 backdrop-blur">
                  <Star className="h-4 w-4 fill-current text-[#22D3EE]" />
                  Premium
                </div>

                <div className="absolute bottom-6 right-6 hidden rounded-2xl border border-[#334155]/80 bg-[#0F172A]/65 px-4 py-3 text-white shadow-lg shadow-[#0F172A]/40 backdrop-blur sm:block">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                    Taller
                  </p>
                  <p className="text-lg font-black">TM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CINTA EXTENDIDA DE MARCAS */}
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-[#0F172A]/80 bg-[#0F172A]/65 py-6 shadow-2xl shadow-[#0F172A]/50 backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#1E40AF]/35 to-[#0F172A]" />
          <div className="absolute inset-0 border-y border-white/10" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#38BDF8]">
                  Marcas y tecnología automotriz
                </p>
                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Trabajamos con las principales marcas del mercado
                </h2>
              </div>

              <div className="rounded-full border border-[#334155]/80 bg-[#0F172A]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                TM Premium
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#334155]/80 bg-white/10 px-4 py-5 shadow-xl shadow-[#0F172A]/40 backdrop-blur">
              <Carrusel />
            </div>
          </div>
        </div>

        {/* QUIÉNES SOMOS */}
        <div id="quienes-somos" className="space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
              Confianza, calidad y experiencia
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              ¿Quiénes Somos?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              En TM Premium combinamos experiencia, atención rápida y servicios profesionales
              para mantener tu vehículo en las mejores condiciones.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-3xl border border-[#0F172A]/80 bg-[#0F172A]/40 p-6 shadow-xl shadow-[#0F172A]/40 backdrop-blur transition hover:-translate-y-1 hover:bg-[#0F172A]/55">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#38BDF8]/20 transition group-hover:bg-[#22D3EE]/25" />

              <div className="relative space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0F172A]/40 bg-gradient-to-br from-[#38BDF8] to-[#1E40AF] text-white shadow-lg shadow-[#0F172A]/30">
                  <Users className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-base font-black text-white sm:text-lg">
                    Equipo Profesional
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Contamos con mecánicos capacitados y certificados con más de 10 años de experiencia en la Mecánica Automotriz.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-[#0F172A]/80 bg-[#0F172A]/40 p-6 shadow-xl shadow-[#0F172A]/40 backdrop-blur transition hover:-translate-y-1 hover:bg-[#0F172A]/55">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#38BDF8]/20 transition group-hover:bg-[#22D3EE]/25" />

              <div className="relative space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0F172A]/40 bg-gradient-to-br from-[#38BDF8] to-[#1E40AF] text-white shadow-lg shadow-[#0F172A]/30">
                  <Wrench className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-base font-black text-white sm:text-lg">
                    Servicios de Calidad
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Ofrecemos servicios de mantenimiento, reparación y diagnóstico con garantía!.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-[#0F172A]/80 bg-[#0F172A]/40 p-6 shadow-xl shadow-[#0F172A]/40 backdrop-blur transition hover:-translate-y-1 hover:bg-[#0F172A]/55">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#38BDF8]/20 transition group-hover:bg-[#22D3EE]/25" />

              <div className="relative space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0F172A]/40 bg-gradient-to-br from-[#38BDF8] to-[#1E40AF] text-white shadow-lg shadow-[#0F172A]/30">
                  <Clock className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-base font-black text-white sm:text-lg">
                    Atención Rápida
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Nos centramos en realizar diagnósticos rápidos y eficientes para q no estés sin tu auto por mucho tiempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE DE MISIÓN */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#0F172A]/80 bg-[#0F172A]/45 p-6 text-white shadow-2xl shadow-[#0F172A]/50 backdrop-blur sm:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-[#38BDF8]/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0F172A]/40 bg-gradient-to-br from-[#38BDF8] to-[#1E40AF] shadow-lg shadow-[#0F172A]/30">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100">
                  Compromiso TM Premium
                </p>

                <h2 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
                  Nuestra Misión
                </h2>
              </div>
            </div>

            <div className="rounded-3xl border border-[#334155]/80 bg-[#0F172A]/60 p-5 shadow-lg shadow-[#0F172A]/30 backdrop-blur sm:p-6">
              <p className="text-sm leading-relaxed text-blue-50 sm:text-base">
                Proporcionar servicios mecánicos de excelencia con tecnología de vanguardia, garantizando la satisfacción y confianza de nuestros clientes. Nos comprmetemos a mantener los más altos estándares de calidad, seguridad y profesionalismo en cada trabajo.
              </p>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div id="servicios" className="rounded-[2.5rem] border border-[#0F172A]/80 bg-[#0F172A]/45 p-6 text-center shadow-xl shadow-[#0F172A]/50 backdrop-blur sm:p-8">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Tu vehículo merece atención profesional
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Agenda una revisión, solicita un diagnóstico o consulta nuestros servicios disponibles desde la plataforma.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-[#0F172A]/40 bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] px-5 py-3 text-sm font-bold text-navy shadow-lg shadow-[#0F172A]/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Iniciar sesión
            </a>

            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-xl border border-[#334155]/80 bg-[#0F172A]/50 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0F172A]/70"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}