// import React, { useState } from 'react';
// import { Upload, Play, BookOpen, X, Loader2, CheckCircle } from 'lucide-react';

// const Menu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [videos, setVideos] = useState([]);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const openPopup = () => setIsOpen(true);
//   const closePopup = () => {
//     if (!isSubmitting) {
//       setIsOpen(false);
//       resetForm();
//     }
//   };

//   const resetForm = () => {
//     setTitle('');
//     setDescription('');
//     setVideos([]);
//     setUploadProgress(0);
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setVideos(files);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const files = Array.from(e.dataTransfer.files).filter(file => 
//       file.type.startsWith('video/')
//     );
//     setVideos(files);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//   };

//   const simulateUpload = async () => {
//     for (let i = 0; i <= 100; i += 10) {
//       setUploadProgress(i);
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Validate form
//     if (!title.trim() || !description.trim() || videos.length === 0) {
//       alert('Please fill in all fields and upload at least one video');
//       setIsSubmitting(false);
//       return;
//     }
    
//     // Simulate upload process
//     simulateUpload().then(() => {
//       // Simulate API call
//       setTimeout(() => {
//         console.log('Course created successfully!');
//         alert('Course created successfully!');
//         closePopup();
//         setIsSubmitting(false);
//       }, 1000);
//     }).catch(() => {
//       alert('Error creating course. Please try again.');
//       setIsSubmitting(false);
//     });
//   };

//   const removeVideo = (index) => {
//     setVideos(videos.filter((_, i) => i !== index));
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 py-20">
//         <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
            
//             {/* Left: Text Content */}
//             <div className="flex-1 text-center lg:text-left">
//               <div className="mb-6">
//                 <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/20 to-purple-400/20 border border-amber-400/30 text-amber-300 text-sm font-medium mb-4">
//                   <BookOpen className="w-4 h-4 mr-2" />
//                   Next-Gen Learning Platform
//                 </span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-purple-300 bg-clip-text text-transparent leading-tight">
//                 Unlock Knowledge with{' '}
//                 <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
//                   LearnStream
//                 </span>
//               </h1>
              
//               <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//                 Master DSA, System Design, Core Subjects, and Interview Prep with a modern, seamless learning experience that adapts to your pace.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button 
//                   onClick={openPopup}
//                   className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="flex items-center justify-center relative z-10">
//                     <Upload className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
//                     Upload Course
//                   </div>
//                 </button>
                
//                 <button className="group px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-xl hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
//                   <div className="flex items-center justify-center">
//                     <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
//                     Browse Courses
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Right: Hero Image/Animation */}
//             <div className="flex-1 relative">
//               <div className="relative group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
//                 <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-500">
//                   <div className="flex items-center justify-center h-64">
//                     <div className="text-center">
//                       <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
//                         <Play className="w-12 h-12 text-gray-900" />
//                       </div>
//                       <h3 className="text-2xl font-bold text-white mb-2">Ready to Learn?</h3>
//                       <p className="text-gray-400">Upload your first course and start teaching</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Upload Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4 overflow-y-auto">
//           <div className="bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl relative border border-white/10 my-8 max-h-[90vh] overflow-y-auto">
            
//             {/* Loading Overlay */}
//             {isSubmitting && (
//               <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center z-20">
//                 <div className="text-center">
//                   <div className="relative mb-6">
//                     <div className="w-20 h-20 border-4 border-amber-500/30 rounded-full"></div>
//                     <div className="absolute top-0 left-0 w-20 h-20 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
//                   </div>
//                   <div className="mb-4">
//                     <div className="bg-slate-800 rounded-full h-2 w-64 mx-auto overflow-hidden">
//                       <div 
//                         className="bg-gradient-to-r from-amber-400 to-amber-600 h-full transition-all duration-300 ease-out"
//                         style={{width: `${uploadProgress}%`}}
//                       ></div>
//                     </div>
//                     <p className="text-amber-400 text-sm mt-2">{uploadProgress}% Complete</p>
//                   </div>
//                   <h3 className="text-amber-400 text-xl font-bold mb-2">Creating Your Course</h3>
//                   <p className="text-gray-400">Please wait while we process your videos...</p>
//                 </div>
//               </div>
//             )}

//             {/* Close Button */}
//             <button
//               onClick={closePopup}
//               disabled={isSubmitting}
//               className={`absolute top-6 right-6 z-30 p-2 rounded-full transition-all duration-200 ${
//                 isSubmitting 
//                   ? 'text-gray-500 cursor-not-allowed' 
//                   : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
//               }`}
//             >
//               <X className="w-6 h-6" />
//             </button>
            
//             {/* Header */}
//             <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-b border-white/10 p-8">
//               <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
//                 Create New Course
//               </h2>
//               <p className="text-center text-gray-400 mt-2">Share your knowledge with the world</p>
//             </div>
            
//             {/* Form */}
//             <div className="p-8">
//               <div className="space-y-6">
                
//                 {/* Course Title */}
//                 <div className="space-y-2">
//                   <label className="block text-white font-semibold text-lg">Course Title</label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     disabled={isSubmitting}
//                     className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 disabled:opacity-50"
//                     placeholder="e.g., Complete Data Structures & Algorithms"
//                   />
//                 </div>
                
//                 {/* Course Description */}
//                 <div className="space-y-2">
//                   <label className="block text-white font-semibold text-lg">Description</label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     disabled={isSubmitting}
//                     rows={4}
//                     className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 resize-none disabled:opacity-50"
//                     placeholder="Describe what students will learn in this course..."
//                   />
//                 </div>
                
//                 {/* Video Upload */}
//                 <div className="space-y-2">
//                   <label className="block text-white font-semibold text-lg">Course Videos</label>
                  
//                   {/* Drag & Drop Area */}
//                   <div
//                     onDrop={handleDrop}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
//                       dragActive 
//                         ? 'border-amber-400 bg-amber-400/5' 
//                         : 'border-gray-600 hover:border-gray-500'
//                     } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
//                   >
//                     <input
//                       type="file"
//                       multiple
//                       accept="video/*"
//                       onChange={handleFileChange}
//                       disabled={isSubmitting}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
//                     />
                    
//                     <div className="space-y-4">
//                       <div className="flex justify-center">
//                         <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
//                           <Upload className="w-8 h-8 text-gray-900" />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-white font-semibold text-lg">
//                           {dragActive ? 'Drop your videos here!' : 'Upload Course Videos'}
//                         </p>
//                         <p className="text-gray-400 mt-1">
//                           Drag & drop your video files or click to browse
//                         </p>
//                         <p className="text-gray-500 text-sm mt-2">
//                           Supports: MP4, AVI, MOV, WMV (Max 500MB each)
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Selected Videos */}
//                   {videos.length > 0 && (
//                     <div className="mt-4 space-y-2">
//                       <h4 className="text-white font-medium">Selected Videos ({videos.length})</h4>
//                       <div className="space-y-2 max-h-32 overflow-y-auto">
//                         {videos.map((video, index) => (
//                           <div key={index} className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
//                             <div className="flex items-center space-x-3">
//                               <Play className="w-4 h-4 text-amber-400" />
//                               <div>
//                                 <p className="text-white text-sm font-medium truncate max-w-xs">
//                                   {video.name}
//                                 </p>
//                                 <p className="text-gray-400 text-xs">
//                                   {formatFileSize(video.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             {!isSubmitting && (
//                               <button
//                                 type="button"
//                                 onClick={() => removeVideo(index)}
//                                 className="text-red-400 hover:text-red-300 p-1 rounded"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       <span>Creating Course...</span>
//                     </>
//                   ) : (
//                     <>
//                       <CheckCircle className="w-5 h-5" />
//                       <span>Create Course</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;


import { Button } from '@headlessui/react';
import axios from 'axios';
import React,{useState}  from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    //const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [videos, setVideos] = useState([]);
    
      const handleFileChange = (e) => {
        setVideos(e.target.files); // multiple files
      };
       const handleSubmit = async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);

          for (let i = 0; i < videos.length; i++) {
            formData.append('videos', videos[i]); // backend expects 'videos'
          }

          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/courses`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            console.log('Course created:', response.data);
            alert('Course created successfully!');
            
            // Reset form data
            setTitle('');
            setDescription('');
            setVideos([]);
            
            // Close popup and navigate
            closePopup();
            navigate('/courses'); // Redirect to teacher dashboard
            
          } catch (error) {
            console.error('Error creating course:', error);
            alert(error.response?.data?.message || 'Error creating course');
          } finally {
            // Always reset loading state, whether success or error
            setIsSubmitting(false);
          }
        };


  return (
      <div className="relative translate-y-30 max-w-7xl bg-[#1D1C20] mx-auto p-10 sm:p-10 flex flex-col md:flex-row items-center gap-12 rounded-2xl">
        
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Unlock Knowledge with <span className="text-amber-400">LearnStream</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Master DSA, System Design, Core Subjects, and Interview Prep with a modern, seamless learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to={'/create-course'}  className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded hover:bg-amber-600 transition">
              Upload
            </Link>
            {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50">
    <div className="bg-black w-full max-w-2xl rounded-xl shadow-2xl relative p-8 overflow-auto">
      {/* Loader Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 rounded-xl">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
                      <p className="text-amber-500 text-lg font-medium">Creating Course...</p>
                      <p className="text-gray-400 text-sm mt-2">Please wait, do not close this window</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={closePopup}
                  disabled={isSubmitting}
                  className={`absolute top-4 right-4 text-3xl font-bold ${
                    isSubmitting 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-red-500 hover:text-red-600'
                  }`}
                >
                  &times;
                </button>
                
                <h2 className="text-2xl font-bold text-center mb-6 text-amber-500">Create Course</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium py-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isSubmitting}
                      required
                      className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 ${
                        isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="Enter course title"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium py-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isSubmitting}
                      required
                      className={`w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:border-amber-500 ${
                        isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="Enter course description"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-700 font-medium py-2">Upload Videos</label>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                      required
                      className={`block w-full text-gray-700 focus:border-amber-500 border border-gray-300 rounded-lg px-4 py-2 ${
                        isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Course'}
                  </button>
                </form>
              </div>
            </div>
          )}
              {/* {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center  bg-opacity-70 z-50">
                  <div className="bg-black w-full max-w-2xl rounded-xl shadow-2xl relative p-8 overflow-auto">
                    <button
                      onClick={ closePopup}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-3xl font-bold"
                    >
                      &times;
                    </button>

                    <h2 className="text-2xl font-bold text-center mb-6 text-amber-500">Create Course</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-1 text-gray-700 font-medium py-2">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                          placeholder="Enter course title"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-gray-700 font-medium py-2">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:border-amber-500"
                          placeholder="Enter course description"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block mb-1 text-gray-700 font-medium py-2">Upload Videos</label>
                        <input
                          type="file"
                          multiple
                          accept="video/*"
                          onChange={handleFileChange}
                          required
                          className="block w-full text-gray-700 focus:border-amber-500 border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                      >
                        Create Course
                      </button>
                    </form>
                  </div>
                </div>
              )} */}
            <Link
              to="/courses"
              className="px-6 py-3 border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500 hover:text-gray-900 transition"
            >
              Courses
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src="/public/logo.png" // 👈 Replace with your image path
            alt="LearnStream Hero"
            className="w-full rounded-lg shadow-lg shadow-amber-500/30 transition-transform transform hover:scale-105"
          />
        </div>

{/* 
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <button
        onClick={openPopup}
        className="px-6 py-3 bg-amber-600 text-white rounded hover:bg-amber-700"
      >
        Open Popup
      </button>


    </div> */}
      </div>
  )
}

export default Menu
