import { Instagram, Facebook, Globe } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <Image
              src="/images/sesc-logo.png"
              alt="Student Community Logo"
              width={280}
              height={100}
              className="h-24 w-auto"
            />
          </div>

          <div className="flex gap-6 mb-8">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-orange-500/20 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-6 h-6 text-white hover:text-orange-500 transition-colors" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-orange-500/20 flex items-center justify-center transition-colors"
            >
              <Facebook className="w-6 h-6 text-white hover:text-orange-500 transition-colors" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-orange-500/20 flex items-center justify-center transition-colors"
            >
              <Globe className="w-6 h-6 text-white hover:text-orange-500 transition-colors" />
            </a>
          </div>

          <p className="text-white/40 text-sm text-center">© 2025 SESC T-shirt Tracking System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
