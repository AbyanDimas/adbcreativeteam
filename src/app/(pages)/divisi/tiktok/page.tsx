"use client";

import Image from "next/image";
import { Typography, Card, CardBody, Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, Squares2X2Icon, ListBulletIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

interface Member {
  id: number;
  attributes: {
    Divisi: string;
    Nama_Anggota: string;
    Instagram: string | null;
    Tiktok: string | null;
    seoURL: string | null;
    Profile_Anggota: {
      data: {
        attributes: {
          url: string;
          formats: {
            thumbnail: {
              url: string;
            };
            large: {
              url: string;
            };
            medium: {
              url: string;
            };
            small: {
              url: string;
            };
          };
        };
      } | null;
    };
  };
}

export default function TiktokPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/divisis?populate=*`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data } = await res.json();
        const tiktokMembers = data.filter(
          (member: Member) => member.attributes.Divisi === "Tiktok"
        );
        setMembers(tiktokMembers);
        setFilteredMembers(tiktokMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(member =>
        member.attributes.Nama_Anggota.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]);

  const handleViewModeChange = (mode: "list" | "grid") => {
    if (viewMode !== mode) {
      setTransitioning(true);
      setTimeout(() => {
        setViewMode(mode);
        setTransitioning(false);
      }, 300);
    }
  };

  if (loading) {
    return (
      <section className="px-8 py-40">
        <div className="container mx-auto text-center">
          <Typography variant="h4" color="blue-gray">
            Loading...
          </Typography>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-8 py-40">
        <div className="container mx-auto text-center">
          <Typography variant="h4" color="red">
            Error: {error}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Banner with Search */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-500 opacity-90"></div>
        <div className="container mx-auto h-full flex flex-col justify-center relative z-10 px-8">
          <div className="text-left max-w-2xl">
            <Typography 
              variant="h1" 
              color="white" 
              className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Tim tiktok
            </Typography>
            <Typography 
              variant="lead" 
              color="white" 
              className="text-xl mb-8 opacity-90"
            >
              Kenali anggota tim tiktok kami yang kreatif dan penuh tiktoka
            </Typography>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="container mx-auto px-8 -mt-12 relative z-20">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Input
                type="text"
                color="blue"
                placeholder="Cari anggota tiktok..."
                className="!border-gray-300 !text-gray-900 placeholder:text-gray-500 focus:!border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full w-full md:w-auto">
              <Button
                variant={viewMode === "grid" ? "filled" : "text"}
                color={viewMode === "grid" ? "blue" : "gray"}
                className={`rounded-full flex items-center gap-2 ${viewMode === "grid" ? "shadow-md" : ""}`}
                onClick={() => handleViewModeChange("grid")}
              >
                <Squares2X2Icon className="h-5 w-5" />
                <span className="sm:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "filled" : "text"}
                color={viewMode === "list" ? "blue" : "gray"}
                className={`rounded-full flex items-center gap-2 ${viewMode === "list" ? "shadow-md" : ""}`}
                onClick={() => handleViewModeChange("list")}
              >
                <ListBulletIcon className="h-5 w-5" />
                <span className="sm:inline">List</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="px-8 py-12">
        <div className="container mx-auto">
          <Typography variant="h5" color="blue-gray" className="font-medium mb-6">
            {filteredMembers.length} Anggota tiktok
          </Typography>

          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Typography variant="h4" color="blue-gray" className="mb-4">
                {searchQuery ? "Hasil pencarian tidak ditemukan" : "Belum ada anggota"}
              </Typography>
              <Typography className="text-gray-500">
                {searchQuery ? "Coba dengan kata kunci lain" : "Saat ini tidak ada anggota di divisi tiktok"}
              </Typography>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              {/* Grid View */}
              <div 
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-300 ${viewMode === 'grid' ? 'opacity-100 translate-x-0' : 'opacity-0 absolute translate-x-full'}`}
                style={{ visibility: viewMode === 'grid' ? 'visible' : 'hidden' }}
              >
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden group">
                      <Image
                        src={
                          member.attributes.Profile_Anggota.data?.attributes?.url ||
                          member.attributes.Profile_Anggota.data?.attributes?.formats?.large?.url ||
                          member.attributes.Profile_Anggota.data?.attributes?.formats?.medium?.url ||
                          "/placeholder-member.jpg"
                        }
                        alt={member.attributes.Nama_Anggota}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <CardBody className="flex-grow p-6 flex flex-col">
                      <div className="mb-4">
                        <Typography variant="small" color="blue" className="font-bold mb-1">
                          ANGGOTA tiktok
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="font-bold mb-3">
                          {member.attributes.Nama_Anggota}
                        </Typography>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.attributes.Instagram && (
                            <a
                              href={`https://instagram.com/${member.attributes.Instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                            >
                              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                              </svg>
                              Instagram
                            </a>
                          )}
                          {member.attributes.Tiktok && (
                            <a
                              href={`https://tiktok.com/@${member.attributes.Tiktok}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                            >
                              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                              </svg>
                              TikTok
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <Button
                            variant="text"
                            color="blue"
                            className="flex items-center gap-2 px-0 hover:bg-blue-50"
                            onClick={() => window.location.href = `/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                          >
                            Lihat detail
                            <ArrowLeftIcon className="h-4 w-4 rotate-180" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <FacebookShareButton
                              url={`${window.location.origin}/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                              className="hover:opacity-80 transition-opacity"
                            >
                              <FacebookIcon size={20} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                              url={`${window.location.origin}/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                              className="hover:opacity-80 transition-opacity"
                            >
                              <TwitterIcon size={20} round />
                            </TwitterShareButton>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* List View */}
              <div 
                className={`space-y-6 transition-all duration-300 ${viewMode === 'list' ? 'opacity-100 translate-x-0' : 'opacity-0 absolute -translate-x-full'}`}
                style={{ visibility: viewMode === 'list' ? 'visible' : 'hidden' }}
              >
                {filteredMembers.map((member) => (
                  <Card key={member.id} shadow={false} className="border rounded-xl hover:shadow-md transition-shadow">
                    <CardBody className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
                      <div className="w-full flex items-center overflow-hidden rounded-xl justify-center col-span-1 h-full min-h-[300px]">
                        <Image
                          width={500}
                          height={500}
                          src={
                            member.attributes.Profile_Anggota.data?.attributes?.url ||
                            member.attributes.Profile_Anggota.data?.attributes?.formats?.large?.url ||
                            member.attributes.Profile_Anggota.data?.attributes?.formats?.medium?.url ||
                            "/placeholder-member.jpg"
                          }
                          alt={member.attributes.Nama_Anggota}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="col-span-3 w-full">
                        <Typography variant="h6" color="blue" className="mb-2">
                          ANGGOTA tiktok
                        </Typography>
                        <Typography variant="h3" color="blue-gray" className="mb-4 font-bold">
                          {member.attributes.Nama_Anggota}
                        </Typography>
                        
                        {/* Individual Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {/* Divisi Card */}
                          <Card className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                            <CardBody className="p-0">
                              <Typography variant="small" color="blue-gray" className="font-bold mb-1">
                                Divisi
                              </Typography>
                              <Typography className="text-gray-700">
                                {member.attributes.Divisi}
                              </Typography>
                            </CardBody>
                          </Card>

                          {/* Instagram Card */}
                          <Card className={`rounded-lg p-4 border-l-4 ${member.attributes.Instagram ? 'border-pink-500 bg-pink-50' : 'border-gray-300 bg-gray-50'}`}>
                            <CardBody className="p-0">
                              <Typography variant="small" color="blue-gray" className="font-bold mb-1">
                                Instagram
                              </Typography>
                              {member.attributes.Instagram ? (
                                <a 
                                  href={`https://instagram.com/${member.attributes.Instagram}`} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-pink-600 hover:text-pink-800"
                                >
                                  @{member.attributes.Instagram}
                                </a>
                              ) : (
                                <Typography className="text-gray-500">
                                  Tidak tersedia
                                </Typography>
                              )}
                            </CardBody>
                          </Card>

                          {/* TikTok Card */}
                          <Card className={`rounded-lg p-4 border-l-4 ${member.attributes.Tiktok ? 'border-black bg-gray-100' : 'border-gray-300 bg-gray-50'}`}>
                            <CardBody className="p-0">
                              <Typography variant="small" color="blue-gray" className="font-bold mb-1">
                                TikTok
                              </Typography>
                              {member.attributes.Tiktok ? (
                                <a 
                                  href={`https://tiktok.com/@${member.attributes.Tiktok}`} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-800 hover:text-black"
                                >
                                  @{member.attributes.Tiktok}
                                </a>
                              ) : (
                                <Typography className="text-gray-500">
                                  Tidak tersedia
                                </Typography>
                              )}
                            </CardBody>
                          </Card>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-6">
                          <Button
                            variant="outlined"
                            color="blue"
                            className="flex items-center gap-2"
                            onClick={() => window.location.href = `/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                          >
                            Lihat detail
                            <ArrowLeftIcon className="h-4 w-4 rotate-180" />
                          </Button>

                          {/* Share Buttons */}
                          <div className="flex items-center gap-2">
                            <Typography variant="small" className="text-gray-500">
                              Bagikan:
                            </Typography>
                            <FacebookShareButton
                              url={`${window.location.origin}/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                              quote={`Kenal ${member.attributes.Nama_Anggota} dari Tim tiktok`}
                              className="hover:opacity-80 transition-opacity"
                            >
                              <FacebookIcon size={24} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                              url={`${window.location.origin}/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                              title={`Kenal ${member.attributes.Nama_Anggota} dari Tim tiktok`}
                              className="hover:opacity-80 transition-opacity"
                            >
                              <TwitterIcon size={24} round />
                            </TwitterShareButton>
                            <LinkedinShareButton
                              url={`${window.location.origin}/divisi/tiktok/${member.attributes.seoURL || member.id}`}
                              title={`${member.attributes.Nama_Anggota} - Tim tiktok`}
                              className="hover:opacity-80 transition-opacity"
                            >
                              <LinkedinIcon size={24} round />
                            </LinkedinShareButton>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}