import GlobitosCategorias from "../components/Globitos";
import CarruselProductos from "../components/CarruselProductos";

import { globitosMock } from "../data/globitosMock";
import { productosMock } from "../data/productosMock";

const Dot = () => (
  <span className="inline-block w-1.5 h-1.5 bg-[#C8A96A]/70 rounded-full shrink-0" />
);

export default function Home() {
  return (
    <>
      {/* TOP BAR */}
      <section className="bg-[#8B2C3A] px-6 py-4">
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-4 animate-scroll hover:[animation-play-state:paused] text-sm text-[#F6EAD7]">
            <span className="whitespace-nowrap">Pedidos por encargo</span>
            <Dot />
            <a
              href="https://wa.me/5492364539044?text=Hola%20😊%20Quería%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap hover:underline hover:text-[#6B5E3C]"
            >
              Escribinos y te acompañamos
            </a>
            <Dot />
            <span className="whitespace-nowrap">Envíos disponibles</span>
            <span className="whitespace-nowrap">Pedidos por encargo</span>
            <Dot />
            <a
              href="https://wa.me/5492364539044?text=Hola%20😊%20Quería%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap hover:underline hover:text-[#6B5E3C]"
            >
              Escribinos y te acompañamos
            </a>
            <Dot />
            <span className="whitespace-nowrap">Envíos disponibles</span>
          
          
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="bg-[#F6EAD7] border-t border-[#E4CFA6]">
        <div className="p-6">
          {/* GLOBITOS */}
          <GlobitosCategorias globitos={globitosMock} />
          <div className="my-8 h-px bg-[#E4CFA6]" />

          {/* DESTACADOS */}
          <div className="mt-6 ">
            <CarruselProductos
              titulo="Destacados"
              productos={productosMock.filter(p =>
                p.etiquetas?.includes("destacado")
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
}
