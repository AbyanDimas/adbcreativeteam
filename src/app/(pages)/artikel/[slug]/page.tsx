'use client'

import React from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            large: {
              url: string;
            };
            medium: {
              url: string;
            };
          };
        };
      };
    };
  };
}

async function getArticleBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/artikels?filters[seoURL][$eq]=${slug}&populate=*`);
  if (!res.ok) {
    throw new Error('Failed to fetch article');
  }
  const data = await res.json();
  return data.data[0];
}

async function getRelatedArticles(currentArticleId: number, tag?: string) {
  const filters = tag 
    ? `filters[Tag][$eq]=${tag}&filters[id][$ne]=${currentArticleId}`
    : `filters[id][$ne]=${currentArticleId}`;
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/artikels?${filters}&populate=*&sort[0]=createdAt:desc&pagination[limit]=3`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch related articles');
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

function ArticleCardSmall({ article }: { article: Article }) {
  const { attributes } = article;
  const imageUrl = attributes.Gambar?.data?.attributes?.formats?.medium?.url || 
                   attributes.Gambar?.data?.attributes?.url || 
                   "/image/blogs/blog-1.svg";
  
  return (
    <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none dark:bg-gray-900 group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <Link href={`/artikel/${attributes.seoURL}`} className="flex-grow flex flex-col">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
            alt={attributes.judul}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardBody className="flex-grow">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
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
            variant="h6"
            color="blue-gray"
            className="mb-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors line-clamp-2"
          >
            {attributes.judul}
          </Typography>
          <Typography className="font-normal !text-gray-500 dark:!text-gray-300 line-clamp-2 text-sm mb-2">
            {attributes.Deskripsi}
          </Typography>
          <Button 
            variant="text" 
            color="gray" 
            size="sm"
            className="flex items-center gap-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 dark:text-gray-300 transition-colors p-0 mt-auto"
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
        </CardBody>
      </Link>
    </Card>
  );
}

const MarkdownComponents = {
  p: ({ node, ...props }: any) => <Typography {...props} className="mb-4" />,
  h1: ({ node, ...props }: any) => <Typography {...props} variant="h2" className="mb-6 mt-8" />,
  h2: ({ node, ...props }: any) => <Typography {...props} variant="h3" className="mb-5 mt-7" />,
  h3: ({ node, ...props }: any) => <Typography {...props} variant="h4" className="mb-4 mt-6" />,
  h4: ({ node, ...props }: any) => <Typography {...props} variant="h5" className="mb-3 mt-5" />,
  h5: ({ node, ...props }: any) => <Typography {...props} variant="h6" className="mb-2 mt-4" />,
  h6: ({ node, ...props }: any) => <Typography {...props} variant="lead" className="mb-2 mt-3" />,
  blockquote: ({ node, ...props }: any) => (
    <blockquote {...props} className="border-l-4 border-blue-500 pl-4 italic my-4 py-2 bg-blue-50 dark:bg-blue-900/20" />
  ),
  ul: ({ node, ...props }: any) => <ul {...props} className="list-disc pl-5 mb-4" />,
  ol: ({ node, ...props }: any) => <ol {...props} className="list-decimal pl-5 mb-4" />,
  li: ({ node, ...props }: any) => <li {...props} className="mb-2" />,
  a: ({ node, ...props }: any) => (
    <a {...props} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline" />
  ),
  img: ({ node, ...props }: any) => (
    <div className="my-6">
      <img {...props} className="mx-auto rounded-lg max-w-full h-auto" />
    </div>
  ),
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticleDetail({ params }: PageProps) {
  const article: Article = await getArticleBySlug(params.slug);
  if (!article) return <div>Artikel tidak ditemukan</div>;

  const relatedArticlesData = await getRelatedArticles(article.id, article.attributes.Tag);
  const relatedArticles: Article[] = relatedArticlesData.data;

  const { attributes } = article;
  const imageUrl = attributes.Gambar?.data?.attributes?.formats?.large?.url || 
                   attributes.Gambar?.data?.attributes?.url || 
                   "/image/blogs/blog-1.svg";

  return (
    <section className="py-12 px-4 sm:px-8 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/artikel">
            <Button variant="text" color="blue" className="flex items-center gap-2 p-0">
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Artikel
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none dark:bg-gray-900 mb-12">
          <div className="relative h-96 w-full overflow-hidden">
            <Image
              src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
              alt={attributes.judul}
              fill
              className="object-cover"
            />
          </div>
          <CardBody>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
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
            <Typography variant="h2" color="blue-gray" className="mb-6 dark:text-white">
              {attributes.judul}
            </Typography>
            <Typography variant="lead" className="mb-8 font-normal !text-gray-500 dark:!text-gray-300">
              {attributes.Deskripsi}
            </Typography>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
              >
                {attributes.Konten}
              </ReactMarkdown>
            </div>
          </CardBody>
        </Card>

        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <Typography variant="h4" className="mb-6 dark:text-white">
              Artikel Lainnya
            </Typography>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCardSmall key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Button 
            variant="gradient" 
            color="blue" 
            size="lg"
            className="flex items-center gap-2 mx-auto"
            as={Link}
            href="/artikel"
          >
            Lihat Semua Artikel
          </Button>
        </div>
      </div>
    </section>
  );
}