import Image from "next/image";
import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/smartcloud.png"
            alt="Smart Cloud Logo"
            width={56}
            height={56}
            className="h-14 w-auto"
            priority
          />
        </div>

        {/* Navigation Links - Centered */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          <a
            href="#home"
            className="cursor-pointer text-sm font-medium text-white transition-colors duration-300 hover:text-[#E5B838]"
          >
            HOME
          </a>
          <a
            href="#services"
            className="cursor-pointer text-sm font-medium text-white transition-colors duration-300 hover:text-[#E5B838]"
          >
            SERVICES
          </a>
          <a
            href="#projects"
            className="cursor-pointer text-sm font-medium text-white transition-colors duration-300 hover:text-[#E5B838]"
          >
            PROJECTS
          </a>
          <a
            href="#about"
            className="cursor-pointer text-sm font-medium text-white transition-colors duration-300 hover:text-[#E5B838]"
          >
            ABOUT
          </a>
          <a
            href="#contact"
            className="cursor-pointer text-sm font-medium text-white transition-colors duration-300 hover:text-[#E5B838]"
          >
            CONTACT
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button className="cursor-pointer rounded-full bg-[#67A1BF] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#5a8fa8]">
            Request Service
          </button>
          <button className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white transition-colors duration-300 hover:bg-slate-600">
            <Globe className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
