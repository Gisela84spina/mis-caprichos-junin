import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/carmela/logo/logo.jpg";


export default function Header({ cartCount }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/productos?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <header className="bg-[#181716] px-4 py-3">
    <div className="flex items-center justify-between gap-4">
   
   

  
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
        src={logo}
        alt="Carmela pastas caseras"
        className="h-7 opacity-90 w-auto object-contain rounded-sm"
        />
      </Link>

      {/* Buscador */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
  w-full
  px-4 py-2
  bg-[#1f1e1d]
  text-[#f5f5f5]
  text-sm
  border border-[#2a2928]
  rounded-md
  focus:outline-none
  focus:border-[#c8a96a]
"

        />
      </form>

      {/* Carrito */}
      <Link
  to="/cart"
  className="
    flex items-center gap-1
    text-xl
    text-[#f5f5f5]
    transition
    duration-200
    hover:text-[#c8a96a]
    active:scale-95
  "
>
  🛒
  {cartCount > 0 && (
    <span
      className="
        text-[11px]
        opacity-90
        font-medium
        text-[#c8a96a]
        leading-none
      "
    >
      {cartCount}
    </span>
  )}
</Link>

      </div>
    </header>
  );
}
