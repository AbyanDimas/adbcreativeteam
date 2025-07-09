'use client'

import { Card, Typography,CardBody  } from "@material-tailwind/react";
import { ArrowLeftIcon, LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

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
            large: {
              url: string;
            };
            medium: {
              url: string;
            };
            small: {
              url: string;
            };
            thumbnail: {
              url: string;
            };
          };
        };
      } | null;
    };
  };
}

export default function MemberDetailPage({ params }: { params: { slug: string } }) {
  const [member, setMember] = useState<Member | null>(null);
  const [otherMembers, setOtherMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current member
        const memberRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/divisis?filters[seoURL][$eq]=${params.slug}&populate=*`
        );
        if (!memberRes.ok) throw new Error("Failed to fetch member data");
        const { data: memberData } = await memberRes.json();
        setMember(memberData[0] || null);

        // Fetch other members from the same division
        const division = memberData[0]?.attributes.Divisi;
        if (division) {
          const othersRes = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/divisis?filters[Divisi][$eq]=${division}&filters[seoURL][$ne]=${params.slug}&populate=*&pagination[limit]=3`
          );
          if (!othersRes.ok) throw new Error("Failed to fetch other members");
          const { data: othersData } = await othersRes.json();
          setOtherMembers(othersData || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Typography variant="h2" className="text-2xl font-bold mb-4">
          Memuat data anggota...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Typography variant="h2" className="text-2xl font-bold mb-4 text-red-500">
          Error: {error}
        </Typography>
        <Link 
          href="/divisi/dokumentasi" 
          className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Kembali ke halaman dokumentasi
        </Link>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Typography variant="h2" className="text-2xl font-bold mb-4">
          Anggota tidak ditemukan
        </Typography>
        <Link 
          href="/divisi/dokumentasi" 
          className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Kembali ke halaman dokumentasi
        </Link>
      </div>
    );
  }

  const imageUrl = member.attributes.Profile_Anggota.data?.attributes?.url || 
                   member.attributes.Profile_Anggota.data?.attributes?.formats?.large?.url || 
                   member.attributes.Profile_Anggota.data?.attributes?.formats?.medium?.url;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/divisi/dokumentasi" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Kembali ke Tim Dokumentasi</span>
          </Link>

          {/* Member Profile Card */}
          <Card className="overflow-hidden shadow-xl rounded-xl mb-12">
            <div className="md:flex">
              {/* Member Photo */}
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
                {imageUrl ? (
                  <div className="relative w-full h-64 md:h-full">
                    <Image
                      src={imageUrl}
                      alt={member.attributes.Nama_Anggota}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <UserCircleIcon className="h-48 w-48 text-gray-400" />
                )}
              </div>

              {/* Member Details */}
              <div className="p-8 md:w-2/3">
                <div className="mb-6">
                  <Typography variant="h3" className="text-3xl font-bold text-gray-900 mb-2">
                    {member.attributes.Nama_Anggota}
                  </Typography>
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {member.attributes.Divisi}
                  </div>
                </div>

                {/* Social Media Links */}
                {(member.attributes.Instagram || member.attributes.Tiktok) && (
                  <div className="mb-8">
                    <Typography variant="h5" className="text-xl font-semibold mb-4 text-gray-800">
                      Media Sosial
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      {member.attributes.Instagram && (
                        <a
                          href={`https://instagram.com/${member.attributes.Instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
                        >
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          @{member.attributes.Instagram}
                        </a>
                      )}
                      {member.attributes.Tiktok && (
                        <a
                          href={`https://tiktok.com/@${member.attributes.Tiktok}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
                        >
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                          </svg>
                          @{member.attributes.Tiktok}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Information Section */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <Typography variant="h5" className="text-xl font-semibold mb-4 text-blue-800">
                    Tentang Anggota
                  </Typography>
                  <Typography className="text-gray-700">
                    {member.attributes.Nama_Anggota} adalah anggota tim dokumentasi yang berdedikasi dan penuh talenta. 
                    Dengan keahlian di bidang {member.attributes.Divisi.toLowerCase()}, {member.attributes.Nama_Anggota} 
                    telah memberikan kontribusi berharga bagi tim kami.
                  </Typography>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Team Members Section */}
          {otherMembers.length > 0 && (
            <div className="mb-12">
              <Typography variant="h3" className="text-2xl font-bold mb-6 text-gray-900">
                Anggota Lain di Divisi {member.attributes.Divisi}
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherMembers.map((otherMember) => {
                  const otherImageUrl = otherMember.attributes.Profile_Anggota.data?.attributes?.url || 
                                      otherMember.attributes.Profile_Anggota.data?.attributes?.formats?.thumbnail?.url;
                  return (
                    <Card key={otherMember.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <div className="relative h-48">
                        {otherImageUrl ? (
                          <Image
                            src={otherImageUrl}
                            alt={otherMember.attributes.Nama_Anggota}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <UserCircleIcon className="h-20 w-20 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <CardBody className="p-4">
                        <Typography variant="h5" className="mb-2 font-medium">
                          {otherMember.attributes.Nama_Anggota}
                        </Typography>
                        <Typography variant="small" color="blue" className="mb-2">
                          {otherMember.attributes.Divisi}
                        </Typography>
                        <Link
                          href={`/divisi/dokumentasi/${otherMember.attributes.seoURL || otherMember.id}`}
                          className="inline-flex items-center mt-2 text-sm text-blue-500 hover:text-blue-700"
                        >
                          Lihat profil
                          <ArrowLeftIcon className="h-3 w-3 ml-1 rotate-180" />
                        </Link>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}