"use client";

import React from "react";
import {
  Button,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

import {
  UserGroupIcon,
  PaintBrushIcon,
  FilmIcon,
  VideoCameraIcon,
  CameraIcon,
  CodeBracketIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

import Link from 'next/link';
import CategoryCard from "@/components/category-card";

const DIVISIONS = [
  {
    img: "/image/blogs/blog-3.png",
    icon: UserGroupIcon,
    title: "Divisi Talent",
    desc: "Bertanggung jawab untuk menjadi talent dalam berbagai konten kreatif sekolah",
  },
  {
    img: "/image/blogs/blog-12.jpeg",
    icon: PaintBrushIcon,
    title: "Divisi Desain",
    desc: "Mengembangkan desain grafis yang inovatif dan menarik",
  },
  {
    img: "/image/blogs/blog-10.jpeg",
    icon: FilmIcon,
    title: "Divisi Talent Tiktok",
    desc: "Menangani produksi konten kreatif yang viral di TikTok",
  },
  {
    img: "/image/blogs/blog-13.png",
    icon: VideoCameraIcon,
    title: "Divisi Editor YouTube",
    desc: "Mengedit video dengan kualitas tinggi untuk YouTube",
  },
  {
    img: "/image/blogs/blog-14.png",
    icon: CameraIcon,
    title: "Divisi Dokumentasi",
    desc: "Mendokumentasikan kegiatan sekolah secara profesional",
  },
  {
    img: "/image/blogs/blog-15.png",
    icon: CodeBracketIcon,
    title: "Divisi Website",
    desc: "Mengembangkan dan memelihara website sekolah",
  },
];

export function CoursesCategories() {
  return (
    <section className="container mx-auto px-8 py-36">
      <div className="mb-20 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3">
          Tim Kreatif ADB
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
          Membangun masa depan digital sekolah melalui inovasi dan kreativitas di setiap divisi.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          color="gray"
          className="relative grid h-full w-full place-items-center overflow-hidden text-center"
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          <CardBody className="relative w-full">
            <Typography color="white" className="text-xs font-bold opacity-50">
              Kreativitas & Inovasi
            </Typography>
            <Typography variant="h4" className="mt-9" color="white">
              Gabung Dengan Kami
            </Typography>
            <Typography
              color="white"
              className="mt-4 mb-14 font-normal opacity-50"
            >
              Jadilah bagian dari tim kreatif yang dinamis
            </Typography>
            <Link href="/divisi/join">
              <Button size="sm" color="white">
                Gabung Sekarang
              </Button>
            </Link>
          </CardBody>
        </Card>
        <div className="col-span-1 flex flex-col gap-6">
          {DIVISIONS.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {DIVISIONS.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
        {DIVISIONS.slice(4, 6).map((props, key) => (
          <CategoryCard key={key} {...props} />
        ))}
      </div>
    </section>
  );
}

export default CoursesCategories;