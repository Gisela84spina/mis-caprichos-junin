import { useState, useEffect } from "react";
import { useCarrusel } from "../hooks/useCarrusel";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CLOUD_NAME = "dy2lgqgk6";
const UPLOAD_PRESET = "tienda_upload";
const MAX_PRODUCTOS = 5;

export default function CarruselAdmin() {
  const {
    carruseles,
    agregarCarrusel,
    eliminarCarrusel,
    moverCarrusel,
    actualizarCarrusel
  } = useCarrusel();

  const [productosLocal, setProductosLocal] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // agregar
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [previews, setPreviews] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  // editar
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [imagenesEdit, setImagenesEdit] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const snap = await getDocs(collection(db, "productos"));
      setProductosLocal(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
      );
    };
    cargarProductos();
  }, []);

  /* ================= SUBIR IMÁGENES ================= */
  const subirImagenes = async (files) => {
    setSubiendo(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESET);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
          );

          const data = await res.json();
          return data.secure_url;
        })
      );
      return uploads;
    } finally {
      setSubiendo(false);
    }
  };

  /* ================= AGREGAR ================= */
  const handleAgregar = async () => {
    if (!titulo || previews.length === 0 || subiendo) return;

    await agregarCarrusel({
      titulo,
      categoria,
      imagenes: previews,
      url: previews[0],
      productos: [],
      orden: carruseles.length
    });

    setTitulo("");
    setCategoria("");
    setPreviews([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Carruseles</h1>

      {/* ================= AGREGAR ================= */}
      <div className="border rounded-lg p-4 mb-10 space-y-4">
        <input
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Categoría (opcional)"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={async e => {
            const imgs = await subirImagenes(e.target.files);
            setPreviews(prev => [...prev, ...imgs]);
          }}
        />

        <div className="flex gap-2 flex-wrap">
          {previews.map((img, i) => (
            <img key={i} src={img} className="w-32 h-20 rounded object-cover" />
          ))}
        </div>

        <button
          onClick={handleAgregar}
          disabled={subiendo || previews.length === 0 || !titulo}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Agregar carrusel
        </button>
      </div>

      {/* ================= LISTA ================= */}
      <div className="space-y-4">
        {carruseles.map((c, index) => (
          <div key={c.id} className="border rounded-lg p-4 space-y-3">

            {/* ---------- HEADER ---------- */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={c.url} className="w-16 h-10 rounded object-cover" />
                <div>
                  {editandoId !== c.id && (
                    <p className="font-medium">{c.titulo}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Productos: {c.productos?.length || 0} / {MAX_PRODUCTOS}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditandoId(c.id);
                    setTituloEdit(c.titulo);
                    setImagenesEdit(c.imagenes || []);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => moverCarrusel(c, "up")}
                  disabled={index === 0}
                  className="px-2 bg-gray-200 rounded"
                >
                  ↑
                </button>

                <button
                  onClick={() => moverCarrusel(c, "down")}
                  disabled={index === carruseles.length - 1}
                  className="px-2 bg-gray-200 rounded"
                >
                  ↓
                </button>

                <button
                  onClick={() => eliminarCarrusel(c.id)}
                  className="px-3 bg-red-600 text-white rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ---------- EDITOR ---------- */}
            {editandoId === c.id && (
              <div className="bg-gray-50 border rounded p-4 space-y-3">
                <input
                  value={tituloEdit}
                  onChange={e => setTituloEdit(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async e => {
                    const imgs = await subirImagenes(e.target.files);
                    setImagenesEdit(prev => [...prev, ...imgs]);
                  }}
                />

                <div className="flex gap-2 flex-wrap">
                  {imagenesEdit.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={img} className="w-32 h-20 rounded object-cover" />
                      <button
                        onClick={() =>
                          setImagenesEdit(prev =>
                            prev.filter((_, idx) => idx !== i)
                          )
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      await actualizarCarrusel(c.id, {
                        titulo: tituloEdit,
                        imagenes: imagenesEdit,
                        url: imagenesEdit[0] || ""
                      });
                      setEditandoId(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Guardar
                  </button>

                  <button
                    onClick={() => setEditandoId(null)}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* ---------- PRODUCTOS ---------- */}
            <div className="border-t pt-3">
              <input
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full border p-2 rounded mb-2 text-sm"
              />

              <div className="max-h-48 overflow-y-auto space-y-2">
                {productosLocal
                  .filter(
                    p =>
                      !p.eliminado &&
                      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
                  )
                  .map(p => {
                    const activos = c.productos || [];
                    const activo = activos.includes(p.id);

                    return (
                      <label key={p.id} className="flex gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={activo}
                          onChange={() => {
                            if (!activo && activos.length >= MAX_PRODUCTOS) {
                              alert("Máximo 5 productos");
                              return;
                            }

                            const nuevos = activo
                              ? activos.filter(id => id !== p.id)
                              : [...activos, p.id];

                            actualizarCarrusel(c.id, { productos: nuevos });
                          }}
                        />
                        {p.nombre}
                      </label>
                    );
                  })}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
