export default function ProductCard({ producto, agregarAlCarrito }) {
  return (
    <div
      className="
        bg-[#1f1e1d]
        border border-[#2a2928]
        rounded-xl
        p-4
        flex flex-col
        items-center
        text-center
        hover:scale-[1.02]
        transition
      "
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-32 h-32 object-cover mb-3 rounded-lg"
      />

      <h3 className="font-semibold text-sm text-[#f5f5f5] mb-1">
        {producto.nombre}
      </h3>

      {producto.descripcion && (
        <p className="text-xs text-[#9c9484] mb-2 line-clamp-2">
          {producto.descripcion}
        </p>
      )}

      <p className="text-[#c8a96a] font-semibold mb-3">
        ${Number(producto.precio).toLocaleString("es-AR")}
      </p>

      <button
        onClick={() => agregarAlCarrito({
          ...producto,
          precio: Number(producto.precio)
        })}
        className="
          bg-[#c8a96a]
          hover:bg-[#b99758]
          text-[#1f1e1d]
          font-medium
          py-2 px-4
          rounded-lg
          text-sm
          transition
          w-full
        "
      >
        Agregar al carrito
      </button>
    </div>
  );
}
