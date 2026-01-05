import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useSearchParams } from "react-router-dom";
import { CATEGORIAS } from "../data/categorias";


export default function ListadoProductos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoria = searchParams.get("categoria") || "all";
  const orden = searchParams.get("orden") || "precio-asc";
  const q = searchParams.get("q") || "";

  const filtro = searchParams.get("filtro");

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const qRef = query(
          collection(db, "productos"),
          where("eliminado", "==", false)
        );

        const snap = await getDocs(qRef);
        let data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // búsqueda texto
        if (q) {
          data = data.filter(p =>
            p.nombre.toLowerCase().includes(q.toLowerCase())
          );
        }

        // filtro categoría
        if (categoria !== "all") {
          data = data.filter(p => p.categoria === categoria);
        }

        // filtros por globitos
if (filtro === "veg") {
  data = data.filter(p => p.vegetariano === true);
}

if (filtro === "promo") {
  data = data.filter(p => p.promo === true);
}

if (filtro === "destacado") {
  data = data.filter(p => p.destacado === true);
}


        // orden
        if (orden === "precio-asc") {
          data.sort((a, b) => a.precio - b.precio);
        } else {
          data.sort((a, b) => b.precio - a.precio);
        }

        setProductos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoria, orden, q, filtro]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  if (loading) {
    return <p className="text-center p-6">Cargando productos...</p>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto bg-[#141413] min-h-screen">

<h1 className="text-2xl font-semibold mb-4 text-[#f5f5f5]">
  Productos
</h1>


      {/* filtros */}
      <div className="flex gap-3 mb-6 flex-wrap">
      <select
  value={categoria}
  onChange={(e) => updateParam("categoria", e.target.value)}
  className="
  bg-[#1f1e1d]
  border border-[#2a2928]
  text-[#f5f5f5]
  rounded-lg
  px-3 py-2
"

>
  <option value="all">Todas las categorías</option>
  {CATEGORIAS.map(c => (
    <option key={c.id} value={c.id}>
      {c.nombre}
    </option>
  ))}
</select>


        <select
          value={orden}
          onChange={(e) => updateParam("orden", e.target.value)}
          className="
          bg-[#1f1e1d]
          border border-[#2a2928]
          text-[#f5f5f5]
          rounded-lg
          px-3 py-2
        
          focus:outline-none
          focus:ring-0
          focus:border-[#c8a96a]
          active:border-[#c8a96a]


        "
        

        >
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
        </select>
      </div>

      {/* grid */}
      {productos.length === 0 ? (
        <p className="text-[#e6dcc6]">
        No hay productos disponibles
      </p>
      
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productos.map(p => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              className="
  bg-[#1f1e1d]
  border border-[#2a2928]
  text-[#f5f5f5]
  rounded-lg
  px-3 py-2

  focus:outline-none
  focus:ring-0
  focus:border-[#c8a96a]
  active:border-[#c8a96a]

"


            >
              <img
                src={p.imagen}
                alt={p.nombre}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h2 className="text-sm font-medium text-[#f5f5f5]">
  {p.nombre}
</h2>

<p className="text-[#c8a96a] font-semibold">
  ${Number(p.precio).toLocaleString("es-AR")}
</p>

            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
