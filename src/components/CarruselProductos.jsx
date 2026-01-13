import { Link } from "react-router-dom";

export default function CarruselProductos({ titulo, productos }) {
  if (!productos?.length) return null;

  return (
    <section className="my-10">
   <h2 className="text-lg font-semibold mb-4 text-[#5F1D27] tracking-wide">
  {titulo}
</h2>


      <div className="flex gap-4 overflow-x-auto pb-2">
        {productos.map(prod => (
          <Link
            key={prod.id}
            to={`/producto/${prod.id}`}
            className="
  min-w-[160px]
  bg-[#8B2C3A]
  border border-[#E4CFA6]
  rounded-lg
  p-3 flex-shrink-0
  transition hover:border-[#8B2C3A]
"


          >
            <img
            
            src={prod.imagen || prod.imagenes?.[0] || "/placeholder.png"}
          
              //src={prod.imagenes?.[0] || "/placeholder.png"}
              alt={prod.nombre}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="mt-2 text-sm font-medium text-[#f5f5f5]">
              {prod.nombre}
            </h3>

            <p className="text-sm text-[#c8a96a] font-medium">
            ${Number(prod.precio).toLocaleString("es-AR")}

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
           via-[#8B2C3A]/70 to-[#8B2C3A] 
           transition
          "

        >
          Ver todo →
        </Link>
      </div>
    </section>
  );
}
