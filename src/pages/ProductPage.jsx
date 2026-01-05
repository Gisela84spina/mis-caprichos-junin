import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductPage({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const ref = doc(db, "productos", id);
        const snap = await getDoc(ref);
        const data = snap.data();

        if (!snap.exists()) {
          setProducto(null);
        } else {
          let imagenes = [];

if (Array.isArray(data.imagenes) && data.imagenes.length > 0) {
  imagenes = data.imagenes;
} else if (data.imagen) {
  imagenes = [data.imagen];
}

setProducto({
  id: snap.id,
  ...data,
  imagenes
});

        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (loading) {
    return <p className="text-center p-6">Cargando producto...</p>;
  }

  if (!producto) {
    return <p className="text-center p-6">Producto no encontrado</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="
  bg-[#1f1e1d]
  border border-[#2a2928]
  rounded-xl
  p-6
  flex flex-col items-center
">

      <div
  className="w-full flex gap-3 overflow-x-scroll snap-x snap-proximity mb-4"
  style={{ WebkitOverflowScrolling: "touch" }}
>
  {producto.imagenes.length > 0 ? (
    producto.imagenes.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`${producto.nombre}-${i}`}
        className="min-w-[240px] h-60 object-cover rounded-lg flex-shrink-0 snap-center"
      />
    ))
  ) : (
    <img
      src="/placeholder.png"
      alt="sin imagen"
      className="w-60 h-60 object-cover rounded-lg"
    />
  )}
</div>



<h1 className="text-2xl font-semibold mb-2
 text-[#f5f5f5] text-center">
{producto.nombre}</h1>

<p className="text-xl text-[#c8a96a] font-semibold mb-3">

        ${Number(producto.precio).toLocaleString("es-AR")}

        </p>

        {producto.descripcion && (
  <p className="text-[#e6dcc6] mb-4 text-center text-sm leading-relaxed">

    {producto.descripcion}
  </p>
)}

<div className="flex gap-2 mb-4 flex-wrap justify-center">
  {producto.vegetariano && (
    <span className="text-xs bg-[#2a2928] text-[#c8a96a] px-2 py-1 rounded-full">

      Vegetariano
    </span>
  )}
  {producto.promo && (
    <span className="text-xs bg-[#2a2928] text-[#c8a96a] px-2 py-1 rounded-full">
 Promo
    </span>
  )}
  {producto.destacado && (
    <span className="text-xs bg-[#2a2928] text-[#c8a96a] px-2 py-1 rounded-full">
 Destacado
    </span>
  )}
</div>


<p className="text-[#9c9484] mb-4 text-xs uppercase tracking-wide ">

          Categoría: <span className="font-medium">{producto.categoria}</span>
        </p>



        <button
          onClick={() => agregarAlCarrito({
            ...producto,
          precio: Number(producto.precio)
          }
        )}
          className="
          bg-[#c8a96a]
          hover:bg-[#b99758]
          text-[#1f1e1d]
          font-semibold
          py-2 px-5
          rounded-lg
          text-lg
          transition
          w-full max-w-xs

        "
        >
        
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
