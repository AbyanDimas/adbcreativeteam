"use client";

import { Typography, Card, CardBody, Button, Chip } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function ExploreArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/artikels?populate=*&sort[0]=createdAt:desc`);
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await res.json();
        setArticles(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="px-8 py-20">
        <div className="container mx-auto text-center">
          <Typography variant="h5" color="blue-gray">
            Memuat artikel...
          </Typography>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-8 py-20">
        <div className="container mx-auto text-center">
          <Typography variant="h5" color="red">
            Error: {error}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-20">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Artikel Terbaru
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-6/12"
        >
          Temukan artikel menarik seputar kreativitas, teknologi, dan pengembangan sekolah.
        </Typography>
      </div>
      
      {articles.length > 0 ? (
        <>
          <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const imageUrl = article.attributes.Gambar?.data?.attributes?.formats?.medium?.url || 
                            article.attributes.Gambar?.data?.attributes?.url || 
                            "/image/blogs/blog-1.svg";
              
              return (
                <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
                      alt={article.attributes.judul}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardBody className="flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <Chip
                        value={article.attributes.Tag || "Artikel"}
                        className="text-xs font-medium bg-blue-50 text-blue-800"
                      />
                      <Typography variant="small" className="font-medium text-gray-500">
                        {formatDate(article.attributes.createdAt)}
                      </Typography>
                    </div>
                    <Typography variant="h5" className="mb-2 line-clamp-2">
                      {article.attributes.judul}
                    </Typography>
                    <Typography className="font-normal text-gray-600 line-clamp-3 mb-4 flex-grow">
                      {article.attributes.Deskripsi}
                    </Typography>
                    <Link href={`/artikel/${article.attributes.seoURL}`} className="mt-auto">
                      <Button
                        variant="text"
                        color="gray"
                        className="flex items-center gap-2 p-0 hover:text-blue-500 transition-colors"
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
                </Card>
              );
            })}
          </div>
          
          <div className="container mx-auto mt-16 text-center">
            <Link href="/artikel">
              <Button
                variant="outlined"
                color="gray"
                size="lg"
                className="flex items-center gap-2 mx-auto"
              >
                Lihat Semua Artikel
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="container mx-auto text-center">
          <Typography variant="h5" color="blue-gray">
            Tidak ada artikel yang tersedia
          </Typography>
        </div>
      )}
    </section>
  );
}

export default ExploreArticles;