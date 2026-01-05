import React from "react";

const CartPage = ({
  carrito,
  restarDelCarrito,
  eliminarDelCarrito,
  aumentarCantidad,
  total,
  enviarCarritoPorWhatsApp
}) => {
  return (
    <section className="max-w-3xl mx-auto my-10 p-6 w-[90%] md:w-3/4 lg:w-2/3">
      
      <div className="bg-[#1f1e1d] border border-[#2a2928] rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-6 text-center">
          Confirmar pedido
        </h2>

        {carrito.length === 0 ? (
          <p className="text-[#e6dcc6] text-center">
            Aún no agregaste productos.
          </p>
        ) : (
          <div className="space-y-5">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#2a2928] pb-4"
              >
                <div className="flex items-center gap-4">
                <img
  src={item.imagenes?.[0] || "/placeholder.png"}
  alt={item.nombre}
  className="w-20 h-20 object-cover rounded-lg"
/>


                  <div>
                    <h3 className="text-lg font-medium text-[#f5f5f5]">
                      {item.nombre}
                    </h3>

                   
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => restarDelCarrito(item)}
                        className="px-2 py-1 border border-[#2a2928] text-[#f5f5f5] rounded hover:bg-[#2a2928]"
                      >
                        −
                      </button>

                      <span className="text-[#f5f5f5]">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() => aumentarCantidad(item.id)}
                        className="px-2 py-1 border border-[#2a2928] text-[#f5f5f5] rounded hover:bg-[#2a2928]"
                      >
                        +
                      </button>

                      <button
                        onClick={() => eliminarDelCarrito(item)}
                        className="text-sm text-red-400 hover:text-red-500 ml-3"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[#c8a96a] font-semibold">
                  ${item.precio * item.cantidad}
                </div>
              </div>
            ))}
          </div>
        )}

        {carrito.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#2a2928]">
            <div className="flex justify-between items-center text-xl font-semibold mb-6">
              <span className="text-[#f5f5f5]">Total</span>
              <span className="text-[#c8a96a]">${total}</span>
            </div>

            <button
              onClick={enviarCarritoPorWhatsApp}
              className="w-full bg-[#c8a96a] text-[#1f1e1d] font-semibold py-3 rounded-lg hover:bg-[#b99758] transition"
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
