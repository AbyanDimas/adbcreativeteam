"use client";

import React from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: number;
  attributes: {
    judul: string;
    Deskripsi: string;
    Tag: string;
    seoURL: string;
    createdAt: string;
    Konten: string;
    Gambar: {
      data: {
        attributes: {
          url: string;
          formats: {
            thumbnail: {
              url: string;
            };
            medium: {
              url: string;
            };
            large: {
              url: string;
            };
            small: {
              url: string;
            };
          };
        };
      };
    };
  };
}

async function getArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/artikels?populate=*&sort[0]=createdAt:desc`);
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function ArticleCard({ article }: { article: Article }) {
  const { attributes } = article;
  const imageUrl = attributes.Gambar?.data?.attributes?.formats?.medium?.url || 
                   attributes.Gambar?.data?.attributes?.url || 
                   "/image/blogs/blog-1.svg";
  
  
  return (
    <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none dark:bg-gray-900 group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
          alt={attributes.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
       <Link href={`/artikel/${attributes.seoURL}`} >
      <CardBody className="flex-grow flex flex-col">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {attributes.Tag || "Artikel"}
          </span>
          <Typography
            variant="small"
            className="font-medium !text-gray-500 dark:!text-gray-400"
          >
            {formatDate(attributes.createdAt)}
          </Typography>
        </div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors line-clamp-2"
        >
          {attributes.judul}
        </Typography>
        <Typography className="font-normal !text-gray-500 dark:!text-gray-300 line-clamp-3 mb-4 flex-grow">
          {attributes.Deskripsi}
        </Typography>
        <Link href={`/artikel/${attributes.seoURL}`} className="mt-auto">
          <Button 
            variant="text" 
            color="gray" 
            className="flex items-center gap-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 dark:text-gray-300 transition-colors p-0"
          >
            Baca Selengkapnya
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </Link>
      </CardBody>
      </Link>
    </Card>
  );
}

export default async function Articles() {
  const articlesData = await getArticles();
  const articles: Article[] = articlesData.data;

  return (
    <section className="py-20 px-4 sm:px-8 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto">
        {/* Header with school branding */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <Typography
              variant="h6"
              className="uppercase !text-blue-500 dark:!text-blue-400 font-semibold"
            >
              ADBCreative Team
            </Typography>
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <Typography variant="h2" color="blue-gray" className="mb-4 dark:text-white">
            Artikel & Berita Terkini
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto max-w-2xl font-normal !text-gray-500 dark:!text-gray-400"
          >
            Update terbaru seputar teknologi web, kegiatan sekolah, dan prestasi siswa SMKN 1 Adiwerna
          </Typography>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}