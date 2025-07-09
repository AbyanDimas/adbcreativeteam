import React from 'react';
import {
  UserGroupIcon,
  PaintBrushIcon,
  FilmIcon,
  VideoCameraIcon,
  CameraIcon,
  CodeBracketIcon,
  ArrowRightIcon
} from "@heroicons/react/24/solid";
import Link from 'next/link';

// A modern and engaging card component for each division
const DivisionCard = ({ title, description, icon, color, href }) => {
  return (
    <div className={`
      relative bg-white rounded-xl shadow-lg overflow-hidden
      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
      border-b-4 ${color}
      p-6 sm:p-8 flex flex-col items-start
    `}>
      {/* Icon with a subtle background */}
      <div className={`
        mb-4 p-3 rounded-full
        bg-opacity-15
        ${color.replace('border-', 'text-').replace('-600', '-500')}
        ${color.replace('border-', 'bg-').replace('-600', '-100')}
      `}>
        {React.cloneElement(icon, { className: `h-8 w-8 ${color.replace('border-', 'text-')}` })}
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-gray-600 leading-relaxed flex-grow mb-6"> {/* Added margin-bottom for button */}
        {description}
      </p>

      {/* Call-to-Action Button */}
      <Link href={href}>
        <button
          className={`
            mt-auto px-6 py-3 rounded-full text-white font-semibold
            transition-all duration-300
            ${color.replace('border-', 'bg-')} hover:${color.replace('border-', 'bg-').replace('-500', '-600')}
            focus:outline-none focus:ring-2 focus:ring-offset-2 ${color.replace('border-', 'focus:ring-')}
          `}
        >
          Lihat Anggota
        </button>
      </Link>

      {/* Optional: Add a subtle overlay on hover for visual feedback */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-transparent group-hover:to-gray-50/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

// Main page component
const ADBCreativeTeamPage = () => {
  // Define the divisions with enhanced color mapping
  const divisions = [
    {
      title: "Divisi Talent",
      description: "Bertanggung jawab untuk menjadi talent dalam berbagai konten kreatif sekolah, membawa ide-ide segar ke depan kamera.",
      icon: <UserGroupIcon />,
      color: "border-purple-500", // Brighter, more modern purple
      href: "/divisi/talent"
    },
    {
      title: "Divisi Desain",
      description: "Mengembangkan desain grafis yang inovatif dan menarik untuk kebutuhan promosi dan branding sekolah, dari poster hingga media sosial.",
      icon: <PaintBrushIcon />,
      color: "border-blue-500", // Brighter blue
      href: "/divisi/desain"
    },
    {
      title: "Divisi Talent Tiktok",
      description: "Khusus menangani produksi konten kreatif yang viral dan relevan di platform TikTok untuk memperluas jangkauan promosi sekolah.",
      icon: <FilmIcon />,
      color: "border-pink-500", // More vibrant pink
      href: "/divisi/talent-tiktok"
    },
    {
      title: "Divisi Editor & Editor YouTube",
      description: "Mengedit video dan konten multimedia dengan kualitas tinggi untuk channel YouTube sekolah, memastikan setiap video menarik dan informatif.",
      icon: <VideoCameraIcon />,
      color: "border-red-500", // Classic red for video
      href: "/divisi/editor-youtube"
    },
    {
      title: "Divisi Dokumentasi",
      description: "Mendokumentasikan berbagai kegiatan penting sekolah dalam bentuk foto dan video profesional, mengabadikan setiap momen berharga.",
      icon: <CameraIcon />,
      color: "border-green-500", // Fresh green
      href: "/divisi/dokumentasi"
    },
    {
      title: "Divisi Website",
      description: "Mengembangkan dan memelihara website sekolah serta platform digital lainnya, memastikan pengalaman online yang mulus dan informatif.",
      icon: <CodeBracketIcon />,
      color: "border-indigo-500", // Deep indigo
      href: "/divisi/website"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-inter">
      {/* Hero Section / Page Title - Professional Blue Header with Dribble Effect */}
      <div className="
        relative bg-gradient-to-r from-blue-600 to-blue-800
        py-16 sm:py-20 lg:py-24
        text-white text-center
        overflow-hidden
      ">
        {/* Subtle SVG Dribble/Wave Effect in Background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="0.1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,128C672,128,768,192,864,192C960,192,1056,128,1152,112C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          <path fill="currentColor" fillOpacity="0.05" d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,192C672,192,768,160,864,160C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Tim Kreatif ADB
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto drop-shadow">
            Membangun masa depan digital sekolah melalui inovasi dan kreativitas di setiap divisi.
          </p>
        </div>
      </div>

      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {divisions.map((division, index) => (
            <DivisionCard
              key={index}
              title={division.title}
              description={division.description}
              icon={division.icon}
              color={division.color}
              href={division.href} // Tambahkan ini
            />
          ))}
        </div>
      </div>

                {/* New CTA Section: Join Us */}
      <section className="
        py-16 sm:py-20
        bg-gradient-to-r from-blue-500 to-indigo-600
        rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-12
        shadow-xl text-white text-center
        flex flex-col items-center justify-center
        p-6 sm:p-10 lg:p-16
      ">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow">
          Siap Bergabung dengan Kami?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 drop-shadow">
          Jadilah bagian dari tim kreatif yang dinamis dan berinovasi. Bersama, kita wujudkan ide-ide luar biasa!
        </p>
        <Link
          href="/divisi/join"
          className="
            bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg
            shadow-lg hover:shadow-xl transform hover:scale-105
            transition-all duration-300 flex items-center justify-center space-x-2
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75
          "
        >
          <span>Gabung Sekarang</span>
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </Link>
      </section>

    </div>
  );
};

export default ADBCreativeTeamPage;
