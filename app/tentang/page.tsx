"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, ShieldCheck, Users, Factory, History, Target, Award, MapPin } from "lucide-react"; 
import Navbar from "@/components/navbar"; 
import Footer from "@/components/footer";

function TentangContent() {
  const searchParams = useSearchParams();
  // Ambil data 'view' dari URL. Kalau kosong, default-nya 'sejarah'
  const currentView = searchParams.get('view') || 'sejarah';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        
        {/* === TAMPILAN 1: SEJARAH (DEFAULT) === */}
        {currentView === 'sejarah' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             {/* HEADER SEJARAH */}
             <div className="relative bg-primary py-16 text-center px-4 text-white rounded-3xl overflow-hidden mb-12 shadow-xl">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 <div className="relative z-10">
                    <Badge variant="secondary" className="mb-4 px-4 py-1 text-primary bg-white font-bold">Est. 1967</Badge>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Sejarah Keripik Niti</h1>
                    <div className="w-24 h-1.5 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">Mengenal lebih dekat dedikasi kami dalam menghadirkan cita rasa warisan Nusantara.</p>
                 </div>
             </div>
             
             {/* KONTEN SEJARAH */}
             <div className="bg-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2 h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-4 text-center border-4 border-dashed border-gray-300 m-2 rounded-xl">
                        <History className="h-10 w-10 mb-2 opacity-50"/>
                        <p className="font-bold">TEMPAT FOTO SEJARAH/OWNER</p>
                        <p className="text-sm">(Siapkan foto `sejarah.jpg` di folder public)</p>
                    </div>
                    {/* GAMBAR SEJARAH ASLI LU (Uncomment kalo file ada) */}
                    {/* <img src="/sejarah.jpg" alt="Sejarah Niti" className="w-full h-full object-cover"/> */}
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <History className="h-8 w-8" />
                        <h2 className="text-3xl font-bold">Perjalanan Kami</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        <strong>Keripik Tempe Niti</strong> adalah kuliner legendaris asli Purwokerto yang berdiri sejak tahun <strong>1967</strong>. Diprakarsai oleh <strong>Ibu Marniti</strong>, kami tumbuh menjadi ikon oleh-oleh khas Banyumas yang dikenal dengan cita rasa otentik.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Kami menggunakan bahan dasar tempe mendoan berkualitas tinggi untuk menghasilkan tekstur yang gurih dan renyah. Dengan motto <em>"Hari ini produksi, hari ini pula habis"</em>, kami menjamin setiap kemasan yang Anda terima adalah produk yang segar dan terjaga kualitasnya.
                    </p>
                </div>
             </div>
          </div>
        )}

        {/* === TAMPILAN 2: VISI & MISI === */}
        {currentView === 'visi' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-5xl mx-auto">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-gray-800 mb-4">Visi & Misi</h1>
                <p className="text-gray-500 text-lg">Komitmen kami untuk terus berkembang dan melayani.</p>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader><CardTitle className="flex items-center gap-3 text-2xl"><Target className="text-primary"/> Visi Kami</CardTitle></CardHeader>
                    <CardContent className="text-lg text-gray-700 leading-relaxed">
                        Menjadi produsen keripik tempe terdepan yang dikenal akan kualitas otentik, inovasi rasa, dan kehigienisan produk, serta membawa cita rasa lokal ke pasar yang lebih luas.
                    </CardContent>
                </Card>
                <Card className="border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader><CardTitle className="flex items-center gap-3 text-2xl"><Award className="text-blue-500"/> Misi Kami</CardTitle></CardHeader>
                    <CardContent className="text-lg text-gray-700">
                        <ul className="list-disc list-inside space-y-3">
                            <li>Menjaga keaslian resep tradisional tanpa bahan pengawet berbahaya.</li>
                            <li>Menggunakan bahan baku kedelai berkualitas dari petani terpercaya.</li>
                            <li>Menerapkan standar produksi yang bersih dan modern.</li>
                            <li>Memberikan pelayanan terbaik bagi setiap pelanggan.</li>
                        </ul>
                    </CardContent>
                </Card>
             </div>
          </div>
        )}

        {/* === TAMPILAN 3: KEUNGGULAN (ID: keunggulan) === */}
        {currentView === 'keunggulan' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-gray-800 mb-4">Kenapa Memilih NITI?</h1>
                <p className="text-gray-500 text-lg">Kualitas adalah prioritas utama kami.</p>
             </div>
             <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-transform border border-gray-100">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"><Leaf size={40}/></div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">Bahan Alami Pilihan</h3>
                    <p className="text-gray-600">Dibuat dari kedelai pilihan dan bumbu rempah asli. Tanpa pengawet buatan yang merugikan kesehatan.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-transform border border-gray-100">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600"><ShieldCheck size={40}/></div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">Proses Higienis</h3>
                    <p className="text-gray-600">Diolah di tempat produksi yang bersih dengan standar kebersihan yang selalu terjaga.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-transform border border-gray-100">
                    <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600"><Award size={40}/></div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">Renyah Maksimal</h3>
                    <p className="text-gray-600">Teknik penggorengan khusus menghasilkan tekstur yang renyah, gurih, dan tidak gampang tengik.</p>
                </div>
             </div>
          </div>
        )}

        {/* === TAMPILAN 4: PRODUKSI (ID: produksi) === */}
        {currentView === 'produksi' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-gray-800 flex items-center justify-center gap-3 mb-4">
                    <Factory className="h-10 w-10 text-primary"/> Intip Dapur Kami
                </h1>
                <p className="text-gray-500 text-lg">Transparansi adalah kunci. Kami bangga menunjukkan bagaimana produk berkualitas ini dibuat.</p>
             </div>

             {/* STATISTIK */}
             <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white p-8 rounded-2xl shadow-sm border flex items-center gap-6 hover:border-primary transition-colors">
                    <div className="bg-primary/10 p-5 rounded-full"><Factory className="h-10 w-10 text-primary" /></div>
                    <div>
                        <h3 className="text-3xl font-black text-primary">1000 Pack +</h3>
                        <p className="text-gray-600 font-medium">Kapasitas Produksi Harian</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border flex items-center gap-6 hover:border-primary transition-colors">
                    <div className="bg-primary/10 p-5 rounded-full"><Users className="h-10 w-10 text-primary" /></div>
                    <div>
                        <h3 className="text-3xl font-black text-primary">18 Orang</h3>
                        <p className="text-gray-600 font-medium">Tim Solid & Berdedikasi</p>
                    </div>
                </div>
             </div>

             <h3 className="text-2xl font-bold text-center mb-8">Dokumentasi Proses Produksi</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* FOTO 1 - GAMBAR ASLI LU */}
                 <div className="h-80 bg-gray-200 rounded-xl relative overflow-hidden group shadow-lg">
                    <img 
                      src="/proses-1.jpg" 
                      alt="Proses Bahan Baku" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    <Badge className="absolute bottom-4 left-4 z-20 text-lg px-4 py-1 bg-primary text-white border-none shadow-lg">1. Pemilihan Bahan</Badge>
                 </div>

                 {/* FOTO 2 - GAMBAR ASLI LU */}
                 <div className="h-80 bg-gray-200 rounded-xl relative overflow-hidden group shadow-lg">
                    <img 
                      src="/proses-2.jpg" 
                      alt="Proses Pengolahan" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    <Badge className="absolute bottom-4 left-4 z-20 text-lg px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-black border-none shadow-lg">2. Pengolahan Higienis</Badge>
                 </div>

                 {/* FOTO 3 - GAMBAR ASLI LU */}
                 <div className="h-80 bg-gray-200 rounded-xl relative overflow-hidden group shadow-lg">
                    <img 
                      src="/proses-3.jpg" 
                      alt="Proses Pengemasan" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    <Badge className="absolute bottom-4 left-4 z-20 text-lg px-4 py-1 bg-green-600 hover:bg-green-700 text-white border-none shadow-lg">3. Pengemasan Aman</Badge>
                 </div>
             </div>
          </div>
        )}

        {/* === TAMPILAN 5: KONTAK (ID: kontak) === */}
        {currentView === 'kontak' && (
          <div className="animate-in fade-in slide-in-from-left-8 duration-500 max-w-5xl mx-auto">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-gray-800 mb-4">Hubungi Kami</h1>
                <p className="text-gray-500 text-lg">Kami siap melayani pesanan Anda setiap hari.</p>
             </div>
             
             <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                <div className="bg-primary p-12 text-white md:w-2/5 flex flex-col justify-center space-y-8">
                    <div>
                        <h3 className="font-bold text-2xl mb-2 flex items-center gap-2"><MapPin/> Alamat</h3>
                        <p className="text-lg opacity-90 leading-relaxed">Jl. Pramuka No. 221 PURWOKERTO</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl mb-2">📞 Telepon/WA</h3>
                        <p className="text-lg opacity-90">0896-3914-4965</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl mb-2">⏰ Jam Buka</h3>
                        <p className="text-lg opacity-90">Setiap Hari: 07.00 - 19.00 WIB</p>
                    </div>
                </div>
                <div className="p0 md:w-3/5 bg-gray-100 min-h-[400px] flex items-center justify-center text-gray-400 font-bold border-l">
                    {/* Disini bisa taro iframe Google Maps */}
                <div className="md:w-3/5 overflow-hidden rounded-r-3xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4909.320473983958!2d109.24447158689605!3d-7.427728957019101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f2ae1a3b691%3A0xbcbe64230fcaf39!2sTempe%20Kripik%20Niti!5e0!3m2!1sid!2sid!4v1767791755558!5m2!1sid!2sid"
                    className="w-full h-full min-h-[400px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                </div>
                </div>
             </div>
          </div>
        )}

      </main>

      {/* Footer tetap muncul di semua view */}
      <Footer />
    </div>
  );
}

// WAJIB PAKE SUSPENSE KALO PAKE SEARCH PARAMS DI NEXT.JS
export default function TentangPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center font-bold text-gray-500">Memuat Halaman...</div>}>
            <TentangContent />
        </Suspense>
    )
}