"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const whatsappNumber = "6282112345"
  const whatsappMessage = encodeURIComponent(
    "Halo! Saya ingin bertanya tentang Keripik Tempe Niti. Tolong informasi lebih lanjut.",
  )

  const handleSendToWhatsApp = () => {
    if (message.trim()) {
      const encodedMsg = encodeURIComponent(message)
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank")
      setMessage("")
      setIsOpen(false)
    } else {
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-primary hover:bg-primary/90 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 group"
        aria-label="Open live chat"
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        ) : (
          <MessageCircle size={24} className="group-hover:animate-bounce" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-5">
            <h3 className="font-black text-lg">Hubungi Kami</h3>
            <p className="text-sm text-white/90 mt-1">Kami siap melayani Anda dengan sepenuh hati!</p>
          </div>

          {/* Chat Body */}
          <div className="p-5 space-y-4 max-h-96">
            {/* Bot Message */}
            <div className="space-y-3">
              <div className="bg-muted p-4 rounded-xl rounded-tl-none shadow-sm">
                <p className="text-sm text-muted-foreground font-medium">
                  Halo! Selamat datang di Keripik Tempe Niti. Ada yang bisa kami bantu?
                </p>
              </div>
              <div className="bg-muted p-4 rounded-xl rounded-tl-none shadow-sm">
                <p className="text-sm text-muted-foreground font-medium">
                  Kami melayani konsultasi produk, pemesanan, dan pertanyaan lainnya via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border space-y-3">
            <input
              type="text"
              placeholder="Tulis pesan Anda..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendToWhatsApp()}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button
              onClick={handleSendToWhatsApp}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <MessageCircle size={18} />
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  )
}
