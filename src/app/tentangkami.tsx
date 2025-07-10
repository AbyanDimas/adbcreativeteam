"use client";
import React from 'react';
import {
  HeartIcon,
  LightBulbIcon,
  UserGroupIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  TrophyIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/solid';

const AboutPage = () => {
  const stats = [
    { label: "Proyek Selesai", value: "500+", icon: <CheckCircleIcon className="w-6 h-6" /> },
    { label: "Klien Puas", value: "200+", icon: <HeartIcon className="w-6 h-6" /> },
    { label: "Tahun Pengalaman", value: "5+", icon: <ClockIcon className="w-6 h-6" /> },
    { label: "Penghargaan", value: "15+", icon: <TrophyIcon className="w-6 h-6" /> }
  ];

  const services = [
    { icon: <PaintBrushIcon className="w-8 h-8" />, title: "Brand Identity", description: "Desain logo dan identitas visual yang memorable" },
    { icon: <CodeBracketIcon className="w-8 h-8" />, title: "Web Development", description: "Website responsif dan aplikasi web modern" },
    { icon: <VideoCameraIcon className="w-8 h-8" />, title: "Content Creation", description: "Video, foto, dan konten digital berkualitas tinggi" }
  ];

  const team = [
    { name: "Ahmad Rizki", role: "Creative Director", image: "👨‍💼", experience: "5+ tahun" },
    { name: "Dina Sari", role: "UI/UX Designer", image: "👩‍💻", experience: "3+ tahun" },
    { name: "Budi Santoso", role: "Developer", image: "👨‍💻", experience: "4+ tahun" },
    { name: "Citra Dewi", role: "Content Creator", image: "👩‍🎨", experience: "3+ tahun" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">ADB Creative Team</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tim kreatif 
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* About Story */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              ADB Creative Team adalah 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Dengan
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-3xl">{member.image}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <LightBulbIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inovasi</h3>
              <p className="text-gray-600">Selalu mencari solusi kreatif dan terdepan</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kualitas</h3>
              <p className="text-gray-600">Berkomitmen pada hasil terbaik</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kolaborasi</h3>
              <p className="text-gray-600">Bekerja sama untuk mencapai tujuan</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Mari Berkolaborasi!</h3>
          <p className="text-blue-100 mb-6">
            Siap mewujudkan visi kreatif Anda? Hubungi kami sekarang!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 text-sm">
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="w-4 h-4" />
              <span>hello@adbcreative.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="w-4 h-4" />
              <span>+62 812 3456 7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4" />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
          
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Konsultasi Gratis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;