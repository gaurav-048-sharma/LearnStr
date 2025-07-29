import React, { useState } from 'react';
import { Upload, Play, BookOpen, X, Loader2, CheckCircle, AlertCircle, Plus, FileVideo } from 'lucide-react';
import axios from 'axios';

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoChange = (e) => {
    const selected = Array.from(e.target.files);
    addVideos(selected);
  };

  const addVideos = (newFiles) => {
    const validVideos = newFiles.filter(file => {
      const isVideo = file.type.startsWith("video/");
      const isValidSize = file.size <= 500 * 1024 * 1024; // 500MB limit
      
      if (!isVideo) {
        alert(`${file.name} is not a video file.`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 500MB.`);
        return false;
      }
      return true;
    });

    // Check for duplicates
    const existingNames = videos.map(v => v.name);
    const uniqueVideos = validVideos.filter(video => !existingNames.includes(video.name));
    
    if (uniqueVideos.length !== validVideos.length) {
      alert("Some videos were already added and have been skipped.");
    }

    setVideos(prev => [...prev, ...uniqueVideos]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    addVideos(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = async () => {
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || videos.length === 0) {
      alert("Please fill in all fields and upload at least one video.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate upload progress
      await simulateUpload();
      
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      videos.forEach((video) => formData.append("videos", video));

      // Simulate API call - replace with actual axios call
     // await new Promise(resolve => setTimeout(resolve, 1000));
      
    //   /* Replace above with actual API call:
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/courses`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Course created:", res.data);
      alert("✅ Course created successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setVideos([]);
      setUploadProgress(0);
      
    } catch (err) {
      console.error("Error creating course:", err);
      alert("❌ Failed to create course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSize = videos.reduce((sum, video) => sum + video.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mt-20 text-center mb-12">
            <div className=" inline-flex items-center bg-gradient-to-r from-amber-400/20 to-purple-400/20 border border-amber-400/30 text-amber-300 px-6 py-3 rounded-full mb-6">
              <BookOpen className="w-5 h-5 mr-2" />
              <span className="font-semibold">Course Creation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-amber-200 to-purple-300 bg-clip-text text-transparent">
              Create New Course
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Share your knowledge with students around the world. Upload multiple videos and create an engaging learning experience.
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
            
            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center z-20 rounded-3xl">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-amber-500/30 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <div className="mb-4">
                    <div className="bg-slate-800 rounded-full h-2 w-64 mx-auto overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-full transition-all duration-300 ease-out"
                        style={{width: `${uploadProgress}%`}}
                      ></div>
                    </div>
                    <p className="text-amber-400 text-sm mt-2">{uploadProgress}% Complete</p>
                  </div>
                  <h3 className="text-amber-400 text-xl font-bold mb-2">Creating Your Course</h3>
                  <p className="text-gray-400">Please wait while we process your videos...</p>
                </div>
              </div>
            )}

            <div className="space-y-8">
              
              {/* Course Title */}
              <div className="space-y-3">
                <label className="block text-white font-bold text-xl">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g., Complete React Development Bootcamp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 text-lg disabled:opacity-50"
                />
              </div>

              {/* Course Description */}
              <div className="space-y-3">
                <label className="block text-white font-bold text-xl">Course Description</label>
                <textarea
                  placeholder="Describe what students will learn, the prerequisites, and what makes your course special..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 resize-none text-lg disabled:opacity-50"
                />
              </div>

              {/* Video Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-white font-bold text-xl">Course Videos</label>
                  {videos.length > 0 && (
                    <div className="text-sm text-gray-400">
                      {videos.length} video{videos.length !== 1 ? 's' : ''} • {formatFileSize(totalSize)}
                    </div>
                  )}
                </div>

                {/* Drag & Drop Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-amber-400 bg-amber-400/10' 
                      : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
                  } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideoChange}
                    disabled={isSubmitting}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                        <Upload className="w-10 h-10 text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-2xl mb-2">
                        {dragActive ? 'Drop your videos here!' : 'Upload Course Videos'}
                      </h3>
                      <p className="text-gray-400 text-lg mb-2">
                        Drag & drop multiple video files or click to browse
                      </p>
                      <p className="text-gray-500">
                        Supports: MP4, AVI, MOV, WMV • Max 500MB per file
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Choose Videos
                    </button>
                  </div>
                </div>

                {/* Selected Videos List */}
                {videos.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-lg flex items-center">
                      <FileVideo className="w-5 h-5 mr-2 text-amber-400" />
                      Selected Videos ({videos.length})
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto bg-slate-800/30 rounded-xl p-4">
                      {videos.map((video, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-900" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate text-lg">
                                {video.name}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {formatFileSize(video.size)} • {video.type.split('/')[1].toUpperCase()}
                              </p>
                            </div>
                          </div>
                          {!isSubmitting && (
                            <button
                              type="button"
                              onClick={() => removeVideo(index)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-colors duration-200"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !title.trim() || !description.trim() || videos.length === 0}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 font-bold py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Creating Course...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Create Course</span>
                    </>
                  )}
                </button>
                
                {videos.length === 0 && (
                  <p className="text-gray-400 text-center mt-3">
                    Please upload at least one video to create your course
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-blue-400 font-bold text-lg mb-2">Tips for Better Courses</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Keep video files under 500MB for faster uploads</li>
                  <li>• Use descriptive filenames that reflect the lesson content</li>
                  <li>• Organize videos in logical order before uploading</li>
                  <li>• Ensure good audio quality for better student experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;



// import { useState } from "react";
// import axios from "axios";

// export default function CreateCourse() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videos, setVideos] = useState([]);

//   const handleVideoChange = (e) => {
//     const selected = Array.from(e.target.files);
//     const allVideos = selected.every((file) => file.type.startsWith("video/"));

//     if (!allVideos) {
//       alert("Only video files are allowed.");
//       return;
//     }

//     setVideos(selected);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || videos.length === 0) {
//       alert("Please fill in all fields and upload videos.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     videos.forEach((video) => formData.append("videos", video));

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/courses`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log("Course created:", res.data);
//       alert("✅ Course created successfully!");
//     } catch (err) {
//       console.error("Error creating course:", err);
//       alert("❌ Failed to create course.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 mt-20">
//       <h2 className="text-2xl font-bold mb-4">Create Course</h2>
//       <input
//         type="text"
//         placeholder="Course Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="block w-full p-2 border rounded mb-3"
//       />
//       <textarea
//         placeholder="Course Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="block w-full p-2 border rounded mb-3"
//       />
//       <input
//         type="file"
//         multiple
//         accept="video/*"
//         onChange={handleVideoChange}
//         className="block w-full mb-4"
//       />
//       <button
//         type="submit"
//         className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
//       >
//         Create Course
//       </button>
//     </form>
//   );
// }
        