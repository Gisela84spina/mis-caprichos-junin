
import { useCarrusel } from "../hooks/useCarrusel";

import GlobitosCategorias from "../components/Globitos";
import CarruselProductos from "../components/CarruselProductos";
import bg from "../assets/carmela/background/bg.png";
import { Link } from "react-router-dom";


export default function Home({ productos, globitos }) {
  const activos = productos.filter(p => !p.eliminado);
  const { carruseles, loading } = useCarrusel();
  console.log("carruseles en home:", carruseles);


  return (
    <>
    <section
    className="home-hero"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)),
        url(${bg})
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
    <div className="p-6">

      {/* GLOBITOS */}
      <GlobitosCategorias globitos={globitos} />


{/* CARRUSELES */}
{loading && <p className="text-white">Cargando carruseles...</p>}

{!loading && carruseles.length === 0 && (
  <p className="text-white">No hay carruseles</p>
)}

{!loading && carruseles.map(c => {
  console.log("carruseles:", c);
  console.log("ids en carruseles:", c.productos);
  const productosCarrusel = activos.filter(p =>
    c.productos?.includes(p.id)
  );
  console.log("productos resueltos:", productosCarrusel);

  // Carrusel visual / promo
  if (!c.productos || c.productos.length === 0) {
    return (
      <section
        key={c.id}
        className="mb-12"
      >
        {/* TITULO DESTACADO */}
        <h3 className="text-[#c8a96a] uppercase tracking-widest text-sm mb-2">
          Promo
        </h3>
  
        
  
        {/* CARRUSEL DE IMÁGENES */}
        <div className="flex gap-4 overflow-x-auto">
          {c.imagenes?.map((img, i) => (
            <Link
            key={i}
            to="/productos"
            className="min-w-[80%]"
            >
            <img
              
              src={img}
              className="
                h-[220px]
                w-full
                rounded-2xl
                object-cover
                shadow-lg
                cursor-pointer
                hover:opacity-90
                transition
              "
            />
            </Link>
          ))}
        </div>
      </section>
    );
  }
  


  return (
    <CarruselProductos
      key={c.id}
      titulo={c.titulo}
      productos={productosCarrusel}
      categoria={c.categoria}
    />
  );
})}

    </div>
    </section>

    </>
  );
}
