"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center px-4 sm:px-8 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Elemen Background Dekoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Gambar Tim dengan Efek */}
      <motion.div 
        className="hidden lg:block absolute right-10 transform -translate-y-1/2 w-1/3 max-w-2xl z-10"
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Image
          width={800}
          height={800}
          src="/logos/hero1.webp" // Ganti dengan foto tim ADB Creative
          alt="Tim ADB Creative SMKN 1 Adiwerna"
          className="rounded-3xl shadow-2xl border-8 border-white rotate-3"
          priority
        />
      </motion.div>

      {/* Konten Utama */}
      <div className="container mx-auto relative z-20 py-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800"
            >
              <span className="text-blue-600">ADB Creative</span>
            </Typography>
            
            <Typography variant="lead" className="text-xl md:text-2xl text-gray-800 mb-10 font-medium">
              Wadah kreatif siswa SMKN 1 Adiwerna untuk mengembangkan skill di bidang <span className="font-bold text-indigo-700">Fotografi</span>, <span className="font-bold text-indigo-700">desain grafis</span>, dan <span className="font-bold text-indigo-700">konten digital</span>.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  color="blue"
                  size="lg"
                  className="rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Daftar Sekarang
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outlined" 
                  color="gray" 
                  size="lg"
                  className="rounded-full px-8 py-4 text-lg font-bold border-2 hover:bg-white/20 transition-colors"
                >
                  Kenali Divisi Kami
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Statistik */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-700">Anggota Aktif</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white">
              <div className="text-3xl font-bold text-indigo-600">5+</div>
              <div className="text-gray-700">Bidang Keahlian</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white hidden md:block">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-gray-700">Kreativitas</div>
            </div>
          </motion.div>

          {/* Logo Sekolah */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="small" className="text-gray-600 font-semibold">
              Di Dukung Oleh:
            </Typography>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-2 rounded-lg shadow-md border border-gray-200"
            >
              <Image
                width={160}
                height={60}
                className="h-10 object-contain"
                src="/logos/adb.png" // Ganti dengan logo SMKN 1 Adiwerna
                alt="Logo SMKN 1 Adiwerna"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Elemen Dekoratif */}
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-indigo-400/20 animate-float"></div>
      <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-blue-400/20 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-20 w-12 h-12 rounded-full bg-purple-400/20 animate-float animation-delay-4000"></div>
    </section>
  );
}

export default Hero;