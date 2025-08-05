"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import {
  CameraIcon,
  PaintBrushIcon,
  FilmIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import StatsCard from "@/components/stats-card";

const STATS = [
  {
    icon: CameraIcon,
    count: "50+",
    title: "Anggota Aktif",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: PaintBrushIcon,
    count: "100+",
    title: "Proyek Desain",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: FilmIcon,
    count: "50+",
    title: "Konten Video",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: ComputerDesktopIcon,
    count: "5",
    title: "Divisi Kreatif",
    color: "bg-blue-100 text-blue-600",
  },
];

export function OutImpressiveStats() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-8 bg-white">
      {/* Subtle background elements for continuity */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very subtle blobs for faint texture */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid place-items-center text-center mb-16"
        >
          <Typography variant="h2" className="mb-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Pencapaian Kreatif Kami
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full text-gray-600 lg:w-6/12 font-medium"
          >
            Jejak kreativitas dan dedikasi kami dalam berkarya di dunia digital.
          </Typography>
        </motion.div>

        <div className="grid gap-y-8 gap-x-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((props, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: key * 0.1 }}
              viewport={{ once: true }}
            >
              <StatsCard 
                {...props} 
                className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                iconClassName={`p-3 rounded-lg ${props.color}`}
                countClassName="text-3xl font-bold text-gray-900"
                titleClassName="text-gray-600 font-medium"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle floating elements for continuity */}
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-blue-100/30 animate-float"></div>
      <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-indigo-100/30 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-20 w-12 h-12 rounded-full bg-purple-100/30 animate-float animation-delay-4000"></div>
    </section>
  );
}

export default OutImpressiveStats;