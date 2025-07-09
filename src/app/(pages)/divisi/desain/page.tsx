"use client";

import Image from "next/image";
import { Typography, Card, CardBody, Avatar, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

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

export default function DesainPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/divisis?populate=*");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data } = await res.json();
        const desainMembers = data.filter(
          (member: Member) => member.attributes.Divisi === "Desain"
        );
        setMembers(desainMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <section className="px-8 py-12">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <Typography variant="h2" color="blue-gray" className="mb-2 font-bold">
            Tim desain
          </Typography>
          <Typography variant="lead" className="text-gray-600">
            Kenali anggota tim desain kami yang kreatif dan penuh talenta
          </Typography>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-8">
          <Tabs value={viewMode} className="w-min">
            <TabsHeader>
              <Tab value="grid" onClick={() => setViewMode("grid")} className="flex items-center gap-2">
                <Squares2X2Icon className="h-5 w-5" />
                Grid
              </Tab>
              <Tab value="list" onClick={() => setViewMode("list")} className="flex items-center gap-2">
                <ListBulletIcon className="h-5 w-5" />
                List
              </Tab>
            </TabsHeader>
          </Tabs>
        </div>

        {members.length === 0 ? (
          <div className="text-center py-12">
            <Typography variant="h4" color="blue-gray" className="mb-4">
              Belum ada anggota
            </Typography>
            <Typography className="text-gray-500">
              Saat ini tidak ada anggota di divisi desain
            </Typography>
          </div>
        ) : viewMode === "list" ? (
          /* List View (Testimonial Style) */
          <div className="space-y-8">
            {members.map((member) => (
              <Card key={member.id} color="transparent" shadow={false} className="border">
                <CardBody className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                      ANGGOTA desain
                    </Typography>
                    <Typography variant="h3" color="blue-gray" className="mb-4 font-bold">
                      {member.attributes.Nama_Anggota}
                    </Typography>
                    
                    <div className="grid gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="h-1 w-1 bg-gray-500 rounded-full" />
                        <Typography className="font-normal !text-gray-500">
                          Divisi: {member.attributes.Divisi}
                        </Typography>
                      </div>
                      {member.attributes.Instagram && (
                        <div className="flex items-center gap-2">
                          <span className="h-1 w-1 bg-gray-500 rounded-full" />
                          <Typography className="font-normal !text-gray-500">
                            Instagram: @{member.attributes.Instagram}
                          </Typography>
                        </div>
                      )}
                      {member.attributes.Tiktok && (
                        <div className="flex items-center gap-2">
                          <span className="h-1 w-1 bg-gray-500 rounded-full" />
                          <Typography className="font-normal !text-gray-500">
                            TikTok: @{member.attributes.Tiktok}
                          </Typography>
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <a
                        href={`/desain/${member.attributes.seoURL || member.id}`}
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        Lihat detail
                        <ArrowLeftIcon className="h-4 w-4 ml-2 rotate-180" />
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          /* Grid View (4 columns) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <Card key={member.id} className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    fill
                    src={
                      member.attributes.Profile_Anggota.data?.attributes?.url ||
                      member.attributes.Profile_Anggota.data?.attributes?.formats?.large?.url ||
                      member.attributes.Profile_Anggota.data?.attributes?.formats?.medium?.url ||
                      "/placeholder-member.jpg"
                    }
                    alt={member.attributes.Nama_Anggota}
                    className="object-cover"
                  />
                </div>
                <CardBody className="p-4">
                  <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                    {member.attributes.Nama_Anggota}
                  </Typography>
                  <Typography variant="small" color="blue" className="mb-2">
                    {member.attributes.Divisi}
                  </Typography>
                  
                  <div className="flex gap-2 mt-4">
                    {member.attributes.Instagram && (
                      <a 
                        href={`https://instagram.com/${member.attributes.Instagram}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Instagram
                      </a>
                    )}
                    {member.attributes.Tiktok && (
                      <a 
                        href={`https://tiktok.com/@${member.attributes.Tiktok}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        TikTok
                      </a>
                    )}
                  </div>
                  
                  <a
                    href={`/desain/${member.attributes.seoURL || member.id}`}
                    className="inline-flex items-center mt-4 text-sm text-blue-500 hover:text-blue-700"
                  >
                    Lihat detail
                    <ArrowLeftIcon className="h-3 w-3 ml-1 rotate-180" />
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}