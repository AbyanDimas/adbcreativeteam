import React, { useState } from 'react';
import {
  PhotoIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  CalendarIcon,
  UserIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: "Sistem Manajemen Siswa",
      category: "web",
      description: "Aplikasi web untuk mengelola data siswa dengan fitur lengkap dan antarmuka yang user-friendly.",
      image: "💻",
      author: "Tim RPL",
      date: "2024-01-15",
      featured: true,
      tags: ["React", "Node.js", "MySQL"],
      views: 156,
      likes: 23,
      type: "Website"
    },
    {
      id: 2,
      title: "Aplikasi Mobile E-Commerce",
      category: "mobile",
      description: "Platform mobile untuk jual beli online dengan sistem pembayaran terintegrasi.",
      image: "📱",
      author: "Kelompok Mobile Dev",
      date: "2024-02-20",
      featured: false,
      tags: ["React Native", "Firebase", "Stripe"],
      views: 89,
      likes: 17,
      type: "Mobile App"
    },
    {
      id: 3,
      title: "Desain UI/UX Portfolio",
      category: "design",
      description: "Koleksi desain antarmuka untuk berbagai aplikasi dengan fokus pada user experience.",
      image: "🎨",
      author: "Creative Team",
      date: "2024-03-10",
      featured: true,
      tags: ["Figma", "Adobe XD", "Prototype"],
      views: 234,
      likes: 45,
      type: "Design"
    },
    {
      id: 4,
      title: "Video Tutorial Programming",
      category: "video",
      description: "Serial video pembelajaran programming untuk pemula dengan penjelasan yang mudah dipahami.",
      image: "🎬",
      author: "Media Team",
      date: "2024-01-30",
      featured: false,
      tags: ["Education", "JavaScript", "Tutorial"],
      views: 312,
      likes: 67,
      type: "Video"
    },
    {
      id: 5,
      title: "Dokumentasi API",
      category: "documentation",
      description: "Dokumentasi lengkap untuk REST API dengan contoh implementasi dan best practices.",
      image: "📋",
      author: "Backend Team",
      date: "2024-02-15",
      featured: false,
      tags: ["API", "Documentation", "REST"],
      views: 78,
      likes: 12,
      type: "Documentation"
    },
    {
      id: 6,
      title: "Game Edukasi Matematika",
      category: "web",
      description: "Permainan interaktif untuk membantu siswa belajar matematika dengan cara yang menyenangkan.",
      image: "🎮",
      author: "Game Dev Team",
      date: "2024-03-05",
      featured: true,
      tags: ["JavaScript", "Canvas", "Education"],
      views: 445,
      likes: 89,
      type: "Web Game"
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua', icon: <StarIcon className="w-4 h-4" />, count: projects.length },
    { id: 'web', name: 'Web Development', icon: <CodeBracketIcon className="w-4 h-4" />, count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile App', icon: <PhotoIcon className="w-4 h-4" />, count: projects.filter(p => p.category === 'mobile').length },
    { id: 'design', name: 'Design', icon: <PaintBrushIcon className="w-4 h-4" />, count: projects.filter(p => p.category === 'design').length },
    { id: 'video', name: 'Video', icon: <VideoCameraIcon className="w-4 h-4" />, count: projects.filter(p => p.category === 'video').length },
    { id: 'documentation', name: 'Documentation', icon: <DocumentTextIcon className="w-4 h-4" />, count: projects.filter(p => p.category === 'documentation').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  const getCategoryColor = (category) => {
    const colors = {
      web: "bg-blue-100 text-blue-800 border-blue-200",
      mobile: "bg-purple-100 text-purple-800 border-purple-200",
      design: "bg-pink-100 text-pink-800 border-pink-200",
      video: "bg-red-100 text-red-800 border-red-200",
      documentation: "bg-green-100 text-green-800 border-green-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <PhotoIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Galeri Karya
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Koleksi karya dan proyek terbaik dari siswa-siswi SMKN 1 Adiwerna
              yang menunjukkan kreativitas dan kemampuan teknologi
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <StarIcon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Karya Unggulan</h2>
              <StarIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <StarIcon className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                  
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center">
                    <div className="text-6xl">{project.image}</div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                        {project.type}
                      </span>
                      <div className="flex items-center space-x-3 text-gray-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="w-3 h-3" />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HeartIcon className="w-3 h-3" />
                          <span>{project.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <UserIcon className="w-3 h-3" />
                        <span>{project.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{formatDate(project.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari karya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto">
              <FunnelIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className="bg-white/20 text-xs px-1 rounded">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="text-4xl">{project.image}</div>
                </div>
              
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                      {project.type}
                    </span>
                    {project.featured && (
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <h3 className="text-md font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{project.author}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="w-3 h-3" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HeartIcon className="w-3 h-3" />
                        <span>{project.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada karya ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Ingin Menampilkan Karya Anda?
              </h3>
              <p className="text-blue-100 mb-6">
                Bergabunglah dengan komunitas kreatif kami dan tunjukkan karya terbaik Anda 
                kepada dunia
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                Submit Karya
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-6xl">{selectedProject.image}</div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(selectedProject.category)}`}>
                    {selectedProject.type}
                  </span>
                  {selectedProject.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <StarIcon className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{selectedProject.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(selectedProject.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{selectedProject.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HeartIcon className="w-4 h-4" />
                      <span>{selectedProject.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;