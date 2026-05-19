import type { AIStrategy, GeneratedSite } from "@/lib/schemas";

export const kueRinaDemoStrategy: AIStrategy = {
  positioning:
    "Kue Rina Homemade cocok diposisikan sebagai pilihan kue rumahan yang hangat, praktis, dan fleksibel untuk acara keluarga, arisan, rapat kantor, ulang tahun, dan kebutuhan snack box harian.",
  targetAudience:
    "Ibu rumah tangga, pekerja kantor, panitia acara kecil, keluarga yang membutuhkan kue rumahan, serta pelanggan lokal yang ingin memesan snack box dengan komunikasi mudah lewat WhatsApp.",
  valueProposition:
    "Kue dan snack box rumahan yang dibuat fresh, memakai bahan halal, harga jelas, dan bisa dipesan fleksibel sesuai kebutuhan acara.",
  mainCTA: "Pesan produk lewat WhatsApp",
  recommendedStructure: [
    "Hero dengan CTA WhatsApp yang jelas",
    "Highlight keunggulan: fresh, halal, pre-order, fleksibel",
    "Daftar produk unggulan dan kisaran harga",
    "Alasan memilih Kue Rina Homemade",
    "Informasi jam operasional dan cara pemesanan",
    "FAQ pelanggan",
    "CTA akhir untuk pesan lewat WhatsApp",
  ],
  missingInformation: [
    "Foto produk belum tersedia",
    "Belum ada testimoni pelanggan",
    "Belum ada informasi area pengantaran",
  ],
  riskNotes: [
    "Jangan mengklaim sebagai kue terenak atau nomor satu jika tidak ada bukti.",
    "Hindari menyebut rating, jumlah pelanggan, atau sertifikasi tambahan yang tidak diberikan di brief.",
    "Gunakan klaim aman seperti dibuat fresh, bisa pre-order, dan cocok untuk acara tertentu karena sesuai brief.",
  ],
  improvementSuggestions: [
    "Tambahkan foto brownies, snack box, dan risoles agar landing page lebih meyakinkan.",
    "Tambahkan area layanan atau wilayah pengantaran jika tersedia.",
    "Tambahkan 1-2 testimoni asli bila sudah ada izin dari pelanggan.",
  ],
};

export const kueRinaDemoGeneratedSite: GeneratedSite = {
  brandStrategy: {
    positioning:
      "Kue rumahan hangat dan fleksibel untuk keluarga, kantor, arisan, dan acara kecil.",
    targetAudience:
      "Pelanggan lokal, keluarga, pekerja kantor, dan panitia acara yang butuh kue atau snack box praktis.",
    valueProposition:
      "Kue dan snack box fresh, halal, harga jelas, dan mudah dipesan lewat WhatsApp.",
    mainCTA: "Pesan sekarang lewat WhatsApp",
  },
  designTokens: {
    headingFont: "Inter, Arial, sans-serif",
    bodyFont: "Inter, Arial, sans-serif",
    primaryColor: "#9A3412",
    secondaryColor: "#C2410C",
    accentColor: "#EA580C",
    backgroundColor: "#FFF7ED",
    textColor: "#1C1917",
    radius: "large",
    styleDirection:
      "Hangat, rumahan, bersih, ramah keluarga, dengan nuansa terracotta dan krem.",
  },
  sections: {
    hero: {
      headline: "Kue rumahan fresh untuk acara yang terasa lebih hangat.",
      subheadline:
        "Kue Rina Homemade menyediakan brownies, bolu, risoles, pastel, dan snack box yang bisa dipesan untuk arisan, rapat kantor, ulang tahun, atau momen keluarga.",
      primaryCTA: "Pesan lewat WhatsApp",
      secondaryCTA: "Lihat Info Pemesanan",
    },
    highlights: [
      {
        title: "Dibuat Fresh",
        description:
          "Pesanan dibuat setelah order masuk agar rasa dan teksturnya tetap terjaga.",
      },
      {
        title: "Bahan Halal",
        description:
          "Menggunakan bahan yang aman dan cocok untuk kebutuhan keluarga maupun acara kantor.",
      },
      {
        title: "Paket Fleksibel",
        description:
          "Snack box bisa disesuaikan dengan jumlah, isi paket, dan kebutuhan acara.",
      },
    ],
    products: [
      {
        name: "Brownies Kukus",
        description:
          "Brownies lembut dengan rasa rumahan, cocok untuk hantaran, keluarga, atau teman minum teh.",
        price: "Mulai Rp45.000 / loyang",
      },
      {
        name: "Snack Box Acara",
        description:
          "Paket snack untuk arisan, rapat kantor, ulang tahun, atau acara keluarga.",
        price: "Mulai Rp18.000 / box",
      },
      {
        name: "Risoles Mayo & Pastel",
        description:
          "Camilan gurih untuk acara kecil, kumpul keluarga, atau pesanan kantor.",
        price: "Harga menyesuaikan jumlah pesanan",
      },
    ],
    whyChooseUs: [
      {
        title: "Rasa rumahan yang akrab",
        description:
          "Cocok untuk pelanggan yang mencari kue dengan rasa sederhana, hangat, dan familiar.",
      },
      {
        title: "Komunikasi mudah",
        description:
          "Pemesanan bisa langsung lewat WhatsApp agar detail pesanan lebih cepat disesuaikan.",
      },
      {
        title: "Harga jelas",
        description:
          "Kisaran harga disampaikan sejak awal agar pelanggan lebih mudah menentukan pilihan.",
      },
      {
        title: "Cocok untuk banyak acara",
        description:
          "Bisa dipakai untuk arisan, rapat, ulang tahun, acara keluarga, atau kebutuhan snack harian.",
      },
    ],
    trustSignals: [
      "Dibuat fresh setelah order",
      "Bahan halal",
      "Bisa pre-order",
      "Snack box fleksibel",
      "Pesan via WhatsApp",
    ],
    location: {
      title: "Pesan sesuai jadwal acara",
      description:
        "Kue Rina Homemade menerima pesanan pada hari kerja dan pesanan khusus dengan pre-order agar hasil lebih siap.",
      mapsUrl: "https://maps.google.com",
      operatingHours:
        "Senin-Sabtu, 08.00-18.00. Minggu menerima pesanan khusus dengan pre-order minimal H-2.",
    },
    faq: [
      {
        question: "Apakah bisa pesan snack box untuk acara kantor?",
        answer:
          "Bisa. Isi snack box bisa disesuaikan dengan kebutuhan acara dan jumlah pesanan.",
      },
      {
        question: "Berapa minimal waktu pre-order?",
        answer:
          "Untuk pesanan khusus, disarankan minimal H-2 agar proses persiapan lebih rapi.",
      },
      {
        question: "Apakah bisa pesan lewat WhatsApp?",
        answer:
          "Bisa. Pelanggan bisa langsung menghubungi WhatsApp untuk tanya menu, harga, dan jadwal pesanan.",
      },
    ],
    finalCTA: {
      headline: "Butuh kue atau snack box untuk acara terdekat?",
      description:
        "Hubungi Kue Rina Homemade lewat WhatsApp dan ceritakan kebutuhan acaramu. Kami bantu siapkan pilihan yang sesuai.",
      buttonText: "Pesan Sekarang",
    },
  },
  marketingCopy: {
    whatsappBroadcast:
      "Halo, Kak! Kue Rina Homemade menerima pesanan brownies kukus, bolu pandan, risoles mayo, pastel, dan snack box untuk arisan, rapat kantor, ulang tahun, atau acara keluarga. Dibuat fresh, bahan halal, dan bisa pre-order. Mau tanya menu atau pesan untuk acara terdekat? Chat kami ya.",
    instagramCaption:
      "Ada acara keluarga, arisan, atau rapat kantor? Kue Rina Homemade siap bantu siapkan kue rumahan dan snack box yang fresh, halal, dan fleksibel sesuai kebutuhan. Dari brownies kukus sampai risoles mayo, semuanya bisa dipesan lewat WhatsApp. Yuk, pesan lebih awal agar acaramu lebih siap.",
    instagramBio:
      "Kue rumahan & snack box fresh 🍰\nBrownies, bolu, risoles, pastel\nPre-order via WhatsApp",
    googleBusinessDescription:
      "Kue Rina Homemade menyediakan kue rumahan, brownies kukus, bolu pandan, risoles mayo, pastel, dan snack box untuk arisan, rapat kantor, ulang tahun, serta acara keluarga. Pesanan dibuat fresh, menggunakan bahan halal, dan bisa dipesan lewat WhatsApp.",
    faqForCustomers: [
      {
        question: "Apakah menerima pesanan snack box?",
        answer:
          "Ya, snack box tersedia untuk arisan, kantor, ulang tahun, dan acara keluarga.",
      },
      {
        question: "Apakah bisa pre-order?",
        answer:
          "Bisa. Untuk pesanan khusus, sebaiknya pesan minimal H-2.",
      },
      {
        question: "Bagaimana cara memesan?",
        answer:
          "Pesanan bisa dilakukan langsung melalui WhatsApp.",
      },
    ],
    alternativeTaglines: [
      "Kue rumahan hangat untuk momen spesialmu.",
      "Snack box fresh, praktis, dan siap menemani acara.",
      "Dari dapur rumahan untuk acara yang lebih berkesan.",
    ],
    alternativeCTAs: [
      "Pesan lewat WhatsApp",
      "Tanya menu hari ini",
      "Siapkan snack box acaramu",
    ],
  },
  qualityScore: {
    clarity: 88,
    conversion: 86,
    trust: 78,
    mobileReadiness: 90,
    completeness: 84,
    suggestions: [
      "Tambahkan foto produk agar website terasa lebih nyata.",
      "Tambahkan area pengantaran jika tersedia.",
      "Tambahkan testimoni asli untuk memperkuat trust.",
    ],
  },
};