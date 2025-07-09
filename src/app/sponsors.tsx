import React from 'react';
// Ganti import lucide-react dengan heroicons
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  MapPinIcon,
  GlobeAltIcon,
  CalendarIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';

const SponsorHighlightPage = () => {
  const sponsors = [
    {
      id: 1,
      name: "SMKN 1 Adiwerna",
      type: "Institusi Pendidikan",
      description: "Sekolah Menengah Kejuruan terkemuka di Kabupaten Tegal yang berkomitmen mendukung inovasi teknologi dan pengembangan talenta muda.",
      logo: "🏫",
      location: "Adiwerna, Tegal",
      website: "smkn1adiwerna.sch.id",
      since: "2023",
      category: "education",
      featured: true,
      href: "https://smkn1adw.sch.id/fp/"
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      education: "bg-blue-100 text-blue-800 border-blue-200",
      technology: "bg-purple-100 text-purple-800 border-purple-200",
      community: "bg-green-100 text-green-800 border-green-200",
      business: "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      education: <BuildingOffice2Icon className="w-4 h-4" />,
      technology: <StarIcon className="w-4 h-4" />,
      community: <UserGroupIcon className="w-4 h-4" />,
      business: <TrophyIcon className="w-4 h-4" />
    };
    return icons[category] || <BuildingOffice2Icon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Sponsor & Kolaborasi
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Terima kasih kepada semua pihak yang telah mendukung dan berkolaborasi 
              dengan kami dalam mewujudkan visi dan misi bersama
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Sponsors */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <StarIcon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Partner Utama</h2>
              <StarIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {sponsors.filter(sponsor => sponsor.featured).map((sponsor) => (
              <div key={sponsor.id} className="group">
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] focus:outline-none"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <StarIcon className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-50"></div>
                  <div className="relative p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                          {sponsor.logo}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {sponsor.name}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(sponsor.category)}`}>
                            {getCategoryIcon(sponsor.category)}
                            <span className="ml-1">{sponsor.type}</span>
                          </span>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          {sponsor.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="text-sm">{sponsor.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <GlobeAltIcon className="w-4 h-4" />
                            <span className="text-sm">{sponsor.website}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <CalendarIcon className="w-4 h-4" />
                            <span className="text-sm">Sejak {sponsor.since}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div>
        </div>
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Ingin Menjadi Partner Kami?
              </h3>
              <p className="text-blue-100 mb-6">
                Bergabunglah dengan komunitas partner kami dan mari bersama-sama 
                menciptakan dampak positif untuk masa depan yang lebih baik
              </p>
              <Link href="/contact">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                Hubungi Kami
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorHighlightPage;