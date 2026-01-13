import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/misCaprichos/logo/logo.jpg";


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
    <header className="bg-[#F6EAD7] px-4 py-3 ">
    <div className="flex items-center justify-between gap-4">
   
   

  
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
        src={logo}
        alt="Mis Caprichos"
        className="rounded-md h-12 w-auto object-contain"
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
          bg-white
          text-[#2E2E2E]
          text-sm
          border border-[#E6D8BE]
          rounded-md
          focus:outline-none
          focus:border-[#8B2C3A]
        "
        
        />
      </form>

      {/* Carrito */}
      <Link
  to="/cart"
  className="
    flex items-center gap-1
    text-xl
    text-[#8B2C3A]
    transition
    duration-200
    hover:text-[#E2B857]
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
        text-[#E2B857]
        
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
