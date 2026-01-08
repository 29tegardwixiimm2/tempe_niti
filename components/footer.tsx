import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black">Keripik Tempe Niti</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Produsen keripik tempe berkualitas premium dari Purwokerto sejak 1967. Dibuat dengan cinta dan resep turun
              temurun.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-black text-lg">Menu</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="/" className="hover:text-background transition font-semibold">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-background transition font-semibold">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-background transition font-semibold">
                  Produk
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-black text-lg">Kontak</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex gap-3 items-start hover:text-background transition cursor-pointer">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span className="font-semibold">+62 281-12345</span>
              </li>
              <li className="flex gap-3 items-start hover:text-background transition cursor-pointer">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span className="font-semibold">info@keripiktempeniti.com</span>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="font-semibold">Purwokerto, Jawa Tengah, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="font-black text-lg">Informasi</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition font-semibold">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition font-semibold">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition font-semibold">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
          <p className="font-semibold">© 2025 Keripik Tempe Niti Purwokerto. Semua hak dilindungi.</p>
          <p className="text-xs mt-2">
            Dibuat dengan cinta untuk Anda. Terima kasih telah menjadi bagian dari keluarga kami.
          </p>
        </div>
      </div>
    </footer>
  )
}
