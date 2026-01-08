import { CheckCircle2, Award, Leaf, Truck } from "lucide-react"

export default function CompanyHighlight() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-6 bg-gradient-to-r from-secondary via-primary to-accent rounded-3xl blur-2xl opacity-20"></div>
            <img
              src="/traditional-tempe-chip-production-purwokerto.jpg"
              alt="Proses Produksi Keripik Tempe Niti"
              className="w-full rounded-3xl shadow-2xl relative border-4 border-white"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 md:order-2">
            <div>
              <p className="text-primary font-black text-lg mb-3 tracking-wide">KOMITMEN KUALITAS</p>
              <h2 className="text-5xl md:text-6xl font-black text-foreground">Mengapa Pilih Kami?</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Leaf,
                  title: "Bahan Premium 100%",
                  desc: "Tempe pilihan terbaik dengan rempah-rempah autentik berkualitas tinggi",
                },
                {
                  icon: Award,
                  title: "Resep Legendaris 58 Tahun",
                  desc: "Proses pembuatan tradisional yang sudah teruji dan dipercaya generasi",
                },
                {
                  icon: CheckCircle2,
                  title: "Higienis & Tersertifikasi",
                  desc: "Produksi dengan standar kebersihan internasional yang ketat",
                },
                {
                  icon: Truck,
                  title: "Pengiriman Cepat & Aman",
                  desc: "Jaminan barang sampai dalam kondisi sempurna dan fresh",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-lg text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
