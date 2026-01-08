"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function MasukPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      localStorage.setItem("userAdmin", "true")
      alert("✅ Login Sukses!")
      router.push("/admin") // Arahkan ke Dashboard
    } else {
      alert("❌ Password Salah!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login Admin 🔒</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Password..."
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Masuk
          </button>
        </form>
      </div>
    </div>
  )
}