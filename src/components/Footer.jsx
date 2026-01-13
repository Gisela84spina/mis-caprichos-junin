import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#8B2C3A] border-t border-[#E2B857]/20 py-6">

      <div className="flex flex-col items-center gap-2 text-sm opacity-90  ">
        
      <p className="font-medium tracking-wide text-[#F6EAD7]">
   Mis Caprichos
</p>

<p className="text-xs text-[#F6EAD7]/80">
  Detalles para el hogar
</p>

<p className="text-xs text-[#F6EAD7]/60">
  Junín
</p>


        <div className="flex gap-4 text-lg mt-1 text-gray-200">
        <a
        className="
        hover:text-[#E2B857]
        active:text-[#d6b87c]
        active:scale-95
        transition"
      
  href="#"
  aria-label="Instagram"

>
  <FaInstagram />
</a>


<a
  href="https://www.facebook.com/share/1HqKioZNqq/"
  aria-label="Facebook"
  className="
  hover:text-[#E2B857]
  active:text-[#d6b87c]
  active:scale-95
  transition"

>
  <FaFacebookF />
</a>

<a
  href="https://wa.me/5492364539044"
  aria-label="WhatsApp"
  className="
  hover:text-[#E2B857]
  active:text-[#d6b87c]
  active:scale-95
  transition"

>
  <FaWhatsapp />
</a>

        </div>

      
      <div className="mt-4 text-[11px] text-[#F6EAD7]/60">
  © {new Date().getFullYear() } 
   Mis Caprichos · Articulos seleccionados
</div>

<div className="text-[10px] text-gray-400 opacity-60 mt-1">
  Desarrollado por Gisela Spina
</div>
</div>

    </footer>
  );
}
