import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, Plus, Upload, Link, FileText, Download, 
  Edit3, Trash2, Search, Filter, BookOpen, Video, 
  ExternalLink, Calendar, User, Tag, Eye, Copy,
  File, Image, Archive, Code, Music, Film
} from 'lucide-react';
import axios from 'axios';
const ResourceSharingPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'link',
    url: '',
    file: null,
    category: '',
    tags: '',
    isPublic: true
  });

  // Sample resources data for demo
  const [resources, setResources] = useState([
 
  ]);


  useEffect(()=>{
    async function getdata() {
      try {
        const res= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resource/getdata`)
        setResources(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getdata()
  },[])
  

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'programming', name: 'Programming', count: resources.filter(r => r.category === 'programming').length },
    { id: 'computer-science', name: 'Computer Science', count: resources.filter(r => r.category === 'computer-science').length },
    { id: 'mathematics', name: 'Mathematics', count: resources.filter(r => r.category === 'mathematics').length },
    { id: 'science', name: 'Science', count: resources.filter(r => r.category === 'science').length },
    { id: 'other', name: 'Other', count: resources.filter(r => r.category === 'other').length }
  ];

  const getFileIcon = (type, fileName) => {
    if (type === 'link') return <ExternalLink className="w-5 h-5" />;
    if (type === 'video') return <Video className="w-5 h-5" />;
    
    if (fileName) {
      const ext = fileName.split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) return <FileText className="w-5 h-5" />;
      if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) return <Image className="w-5 h-5" />;
      if (['zip', 'rar', '7z'].includes(ext)) return <Archive className="w-5 h-5" />;
      if (['js', 'html', 'css', 'py', 'java'].includes(ext)) return <Code className="w-5 h-5" />;
      if (['mp3', 'wav', 'flac'].includes(ext)) return <Music className="w-5 h-5" />;
      if (['mp4', 'avi', 'mkv'].includes(ext)) return <Film className="w-5 h-5" />;
    }
    
    return <File className="w-5 h-5" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      link: 'bg-blue-100 text-blue-800',
      file: 'bg-green-100 text-green-800',
      video: 'bg-purple-100 text-purple-800',
      archive: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddResource = async() => {
    const resource = {
      _id: resources.length + 1,
      ...newResource,
      tags: newResource.tags.split(',').map(tag => tag.trim()),
      author: "Current User",
      createdAt: new Date().toISOString().split('T')[0],
      downloads: 0,
      views: 0
    };
    
    setResources([resource, ...resources]);
    
    
    const formdata=new FormData();
    formdata.append("title",newResource.title)
    formdata.append("description",newResource.description);
    formdata.append("type",newResource.type)
    formdata.append("url",newResource.url);
    formdata.append("file",newResource.file);
    formdata.append("category",newResource.category);
    formdata.append("tags",newResource.tags.split(','));
    formdata.append("isPublic",newResource.isPublic);
    try {
      const  res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/resource/upload`,formdata)
    } catch (error) {
      console.log(error)
    }
 setResources(res.data.data)    
    setNewResource({
      title: '',
      description: '',
      type: 'link',
      url: '',
      file: null,
      category: '',
      tags: '',
      isPublic: true
    });
    
    setShowAddModal(false);
  };


  const handleDownload = async (fileId, fileName) => {
    
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/resource/getfile?id=${fileId}`,
        { responseType: "blob" }
      );

      const contentDisposition = res.headers["content-disposition"];
      let backendFileName = fileName || "downloaded_file";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          backendFileName = match[1];
        }
      }

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = backendFileName;
      document.body.appendChild(link);

      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const ResourceCard = ({ resource, handleDownload }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
            {getFileIcon(resource.type, resource.fileName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 truncate">{resource.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)} whitespace-nowrap`}>
            {resource.type.toUpperCase()}
          </span>
          <div className="flex space-x-1">
         
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        {resource.type === 'link' ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Link
          </a>
        ) : (
          <button
            onClick={() => handleDownload(resource.file, resource.fileName)}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download {resource.fileSize && `(${resource.fileSize})`}
          </button>
        )}
        
        <span className="text-sm text-gray-500 text-center sm:text-right">
          Category: <span className="font-medium">{resource.category}</span>
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Resource Library</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Access and Shared educational materials, links, and resources</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources, tags, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto space-x-2 sm:space-x-8 px-4 sm:px-6">
              {categories.slice(0, 6).map(({ id, name, count }) => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedCategory === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {name} ({count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {filteredResources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} handleDownload={handleDownload} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'No resources available in this category'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Add the first resource
            </button>
          </div>
        )}
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Resource</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Resource Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { type: 'link', label: 'Web Link', icon: Link },
                    { type: 'file', label: 'File Upload', icon: Upload },
                    { type: 'video', label: 'Video Link', icon: Video },
                    { type: 'archive', label: 'Archive', icon: Archive }
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => setNewResource({...newResource, type})}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        newResource.type === type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs font-medium">{label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter resource title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the resource content"
                />
              </div>

              {/* URL or File */}
              {newResource.type === 'link' || newResource.type === 'video' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL *</label>
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      onChange={(e) => setNewResource({...newResource, file: e.target.files[0]})}
                      className="hidden"
                      id="resource-file"
                    />
                    <label
                      htmlFor="resource-file"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>
                    {newResource.file && (
                      <p className="mt-2 text-sm text-green-600">
                        ✓ {newResource.file.name}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Category and Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newResource.category}
                    onChange={(e) => setNewResource({...newResource, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="programming">Programming</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    value={newResource.tags}
                    onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              {/* Visibility */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="public"
                  checked={newResource.isPublic}
                  onChange={(e) => setNewResource({...newResource, isPublic: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="public" className="text-sm font-medium text-gray-700">
                  Make this resource public
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 sm:p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddResource}
                disabled={!newResource.title || (!newResource.url && !newResource.file)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceSharingPage;