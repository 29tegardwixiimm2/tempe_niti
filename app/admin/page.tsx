"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, X, RefreshCw, LogOut, Wallet, ShoppingBag } from "lucide-react"

interface Order { 
    id: number; 
    created_at: string; 
    total_amount: number; 
    status: string; 
    items: string; 
}

interface Product { id: number; name: string; price: number; stock: number; }

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 1. DATA FETCHING (Auto Refresh + Anti Cache)
  useEffect(() => {
    const isAdmin = localStorage.getItem("userAdmin")
    if (!isAdmin) router.push("/admin/masuk") 
    else {
      refreshData();
      const interval = setInterval(refreshData, 5000); 
      return () => clearInterval(interval);
    }
  }, [router])

  const refreshData = () => {
    // Pake timestamp biar browser gak nge-cache data lama
    const t = Date.now();
    fetch(`/api/admin?t=${t}`, { cache: 'no-store' }).then(res => res.json()).then(data => setOrders(data))
    fetch(`/api/products?t=${t}`, { cache: 'no-store' }).then(res => res.json()).then(data => setProducts(data))
  }

  // 2. FUNGSI TERIMA / TOLAK (JALUR JUJUR)
  const handleVerification = async (orderId: number, isApproved: boolean) => {
    const newStatus = isApproved ? 'lunas' : 'batal';
    
    if(!confirm(isApproved ? `Terima Order #${orderId}?` : `Tolak Order #${orderId}?`)) return;
    
    try {
        const res = await fetch('/api/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId, status: newStatus })
        });

        const data = await res.json();

        if (res.ok) {
            // KALAU SUKSES: Force Reload biar yakin data DB beneran berubah
            alert(`✅ SUKSES! Order #${orderId} jadi ${newStatus.toUpperCase()}`);
            window.location.reload(); 
        } else {
            // KALAU GAGAL: Kasih tau kenapa
            alert(`❌ GAGAL UPDATE: ${data.error}`);
            console.error(data);
        }
    } catch (error) {
        alert("❌ Error Koneksi ke Server");
    }
  }

  // 3. FUNGSI UPDATE STOK
  const handleUpdateStock = async (id: number, newStock: number) => {
    setLoading(true)
    const product = products.find(p => p.id === id);
    if(!product) return;
    
    await fetch('/api/products', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stock: newStock, price: product.price })
    })
    setLoading(false); refreshData(); alert("✅ Stok update!")
  }

  const handleLogout = () => { localStorage.removeItem("userAdmin"); router.push("/admin/masuk"); }

  // LOGIKA HITUNG OMZET (Hanya yang statusnya 'lunas' atau 'LUNAS')
  const totalOmzet = orders
    .filter(o => (o.status && o.status.toLowerCase() === 'lunas')) 
    .reduce((sum, order) => sum + Number(order.total_amount), 0);
  
  const pendingOrders = orders.filter(o => !o.status || o.status === 'pending' || o.status.includes('menunggu') || o.status === 'NULL').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm border">
          <h1 className="text-2xl font-bold text-gray-800">👮‍♂️ Dashboard Admin</h1>
          <button onClick={handleLogout} className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
            <LogOut size={16}/> Logout
          </button>
        </div>

        {/* KARTU STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Total Pendapatan</p>
                    <p className="text-3xl font-extrabold text-gray-800">Rp {totalOmzet.toLocaleString('id-ID')}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full text-green-600"><Wallet size={24}/></div>
            </div>

            <div className={`p-6 rounded-xl shadow-sm border-l-4 flex items-center justify-between ${pendingOrders > 0 ? 'bg-yellow-50 border-yellow-500' : 'bg-white border-blue-500'}`}>
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Perlu Diproses</p>
                    <p className={`text-3xl font-extrabold ${pendingOrders > 0 ? 'text-yellow-600' : 'text-gray-800'}`}>
                        {pendingOrders} <span className="text-sm font-normal text-gray-400">Pesanan</span>
                    </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><ShoppingBag size={24}/></div>
            </div>
        </div>

        {/* TABEL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">📦 Daftar Pesanan</h2>
                    <span className="text-xs text-green-600 font-bold flex gap-1"><RefreshCw size={12} className="animate-spin"/> Live</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr><th className="p-4">Info Order</th><th className="p-4">Total</th><th className="p-4 text-center">Aksi</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((o) => {
                                const status = o.status ? o.status.toLowerCase() : 'null';
                                const isNewOrder = status === 'pending' || status.includes('menunggu') || status === 'null';
                                const isPaid = status === 'lunas';
                                const isCancelled = status === 'batal';

                                return (
                                    <tr key={o.id} className={isNewOrder ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                                        <td className="p-4">
                                            <span className="font-bold text-gray-800">#{o.id}</span>
                                            <p className="text-xs text-gray-500">{new Date(o.created_at).toLocaleDateString()}</p>
                                            <p className="text-xs bg-white border p-1 rounded mt-1 text-gray-600 inline-block">{o.items}</p>
                                        </td>
                                        <td className="p-4 font-bold text-gray-800">
                                            Rp {Number(o.total_amount).toLocaleString('id-ID')}
                                        </td>
                                        <td className="p-4">
                                            {isNewOrder && (
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-[10px] font-bold text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded animate-pulse">Konfirmasi</span>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleVerification(o.id, true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm flex items-center gap-1"><Check size={14}/> Terima</button>
                                                        <button onClick={() => handleVerification(o.id, false)} className="bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-100 flex items-center gap-1"><X size={14}/> Tolak</button>
                                                    </div>
                                                </div>
                                            )}
                                            {isPaid && (
                                                <div className="flex justify-center">
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1"><Check size={12}/> LUNAS</span>
                                                </div>
                                            )}
                                            {isCancelled && <div className="flex justify-center"><span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">Dibatalkan</span></div>}
                                        </td>
                                    </tr>
                                )
                            })}
                            {orders.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-gray-400">Belum ada pesanan masuk.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5 h-fit">
                <h2 className="font-bold text-gray-800 mb-4">📝 Stok Gudang</h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {products.map((p) => (
                        <div key={p.id} className="flex justify-between items-center p-2 border rounded bg-gray-50">
                            <span className="text-sm font-bold text-gray-700 w-24 truncate">{p.name}</span>
                            <div className="flex gap-1">
                                <input type="number" defaultValue={p.stock} id={`stock-${p.id}`} className="w-14 p-1 border rounded text-center text-xs font-bold"/>
                                <button onClick={() => {
                                    const val = (document.getElementById(`stock-${p.id}`) as HTMLInputElement).value;
                                    handleUpdateStock(p.id, Number(val));
                                }} className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"><Check size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}