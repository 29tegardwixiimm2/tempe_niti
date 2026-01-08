import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-amber-50 -z-20"></div>
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-primary/20">
              <div className="w-24 h-24 flex-shrink-0">
                <Image
                  src="/keripik-niti-logo.png"
                  alt="Keripik Tempe Niti Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="text-primary font-black text-3xl leading-tight">KERIPIK TEMPE</p>
                <p className="text-secondary font-black text-2xl leading-tight">NITI</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold tracking-wide pt-1">
                  <span className="inline-block w-8 h-0.5 bg-primary"></span>
                  SEJAK 1967 • PURWOKERTO
                  <span className="inline-block w-8 h-0.5 bg-primary"></span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-primary font-bold text-lg">Kelezatan Tradisional yang Legendaris</p>
              <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight text-balance">
                <span className="text-primary">Keripik Tempe</span> Asli{" "}
                <span className="text-secondary">Purwokerto</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Dibuat dengan cinta dan resep turun temurun, setiap gigitan membawa cita rasa autentik yang tak
                terlupakan. Gurih, bergizi, dan sempurna untuk keluarga Anda.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/produk" className="flex-shrink-0">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 font-bold shadow-lg hover:shadow-xl transition-all px-8">
                  Pesan Sekarang
                </Button>
              </Link>
              <Link href="/tentang" className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 text-lg h-14 font-bold bg-white"
                >
                  Tentang Kami
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-primary/20">
              <div>
                <p className="text-4xl font-black text-primary">58+</p>
                <p className="text-xs text-muted-foreground font-bold tracking-wide mt-1">TAHUN BEROPERASI</p>
              </div>
              <div>
                <p className="text-4xl font-black text-secondary">10K+</p>
                <p className="text-xs text-muted-foreground font-bold tracking-wide mt-1">PELANGGAN SETIA</p>
              </div>
              <div>
                <p className="text-4xl font-black text-accent">100%</p>
                <p className="text-xs text-muted-foreground font-bold tracking-wide mt-1">BAHAN ALAMI</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-6 bg-gradient-to-r from-secondary via-primary to-accent rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary/10">
              <img
                src="/images/s8a8ffe6f8e3741acb4ed7897637e20fcd.png"
                alt="Keripik Tempe Niti - Produk Original MOTU UTAMA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
