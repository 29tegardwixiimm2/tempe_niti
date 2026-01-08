export const products = [
  {
    id: 1,
    name: "Keripik Tempe Niti (250gr)",
    price: 30000,
    description: "Cita rasa otentik warisan leluhur. Dibuat dari kedelai pilihan dengan bumbu rahasia Niti. Renyah, gurih, dan tanpa pengawet. Cocok buat teman ngopi atau oleh-oleh.",
    image: "/keripik.jpg", 
    category: "Signature Product"
  },
  // Cuma ada satu objek kurung kurawal {}, sisanya udah dihapus
];

export const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};