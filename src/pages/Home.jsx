
import { useCarrusel } from "../hooks/useCarrusel";

import GlobitosCategorias from "../components/Globitos";
import CarruselProductos from "../components/CarruselProductos";
import bg from "../assets/carmela/background/bg.png";


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
      {!loading && carruseles.map(c => {
  const productosCarrusel = activos.filter(p =>
    c.productos?.some(id => id.trim() === p.id)
  );
  

  if (!productosCarrusel.length) return null;

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
