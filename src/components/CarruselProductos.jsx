import { Link } from "react-router-dom";

export default function CarruselProductos({ titulo, productos }) {
  if (!productos?.length) return null;

  return (
    <section className="my-10">
      <h2 className="text-lg font-medium mb-4 text-[#e6dcc6] tracking-wide">
        {titulo}
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {productos.slice(0, 5).map(prod => (
          <Link
            key={prod.id}
            to={`/producto/${prod.id}`}
            className="
             min-w-[160px]
             bg-[#1f1e1d]
             border border-[#2a2928]
             rounded-lg
             p-3 flex-shrink-0
             transition hover:border-[#c8a96a]
            "

          >
            <img
              src={prod.imagenes?.[0] || "/placeholder.png"}
              alt={prod.nombre}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="mt-2 text-sm font-medium text-[#f5f5f5]">
              {prod.nombre}
            </h3>

            <p className="text-sm text-[#c8a96a] font-medium">
             ${prod.precio}
            </p>

          </Link>
        ))}

        {/* VER TODO */}
        <Link
          to="/productos"
          className="
           min-w-[160px] flex items-center justify-center
           border border-[#2a2928] rounded-lg
           text-sm text-[#e6dcc6] hover:border-[#c8a96a]
           hover:text-white bg-gradient-to-r from-transparent
           via-[#1f1e1d]/70 to-[#1f1e1d] 
           transition
          "

        >
          Ver todo →
        </Link>
      </div>
    </section>
  );
}
