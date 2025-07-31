import { useState } from "react";

const faqs = [
  {
    question: "What is LearnStream?",
    answer: "LearnStream is a comprehensive online learning platform designed to help you master Data Structures & Algorithms, System Design, Core Computer Science subjects, and interview preparation. We provide curated resources, interactive content, live mentorship, and AI-powered doubt resolution to accelerate your learning journey.",
    icon: "🎓",
    category: "Platform"
  },
  {
    question: "Are the courses beginner friendly?",
    answer: "Absolutely! Our courses are meticulously designed with a progressive learning approach. We start with fundamental concepts and gradually build up to advanced topics. Each course includes beginner-friendly explanations, visual examples, hands-on exercises, and real-world applications to ensure everyone can follow along regardless of their starting level.",
    icon: "🌱",
    category: "Learning"
  },
  {
    question: "Is there any live doubt support?",
    answer: "Yes! We offer comprehensive support through multiple channels: 24/7 AI-powered instant doubt resolution, dedicated mentor support during business hours, weekly live Q&A sessions with industry experts, and a vibrant community forum where you can interact with peers and instructors.",
    icon: "💬",
    category: "Support"
  },
  {
    question: "How do I access my courses?",
    answer: "Once you create your account, you'll have instant access to your personalized dashboard. From there, you can access all enrolled courses, track your progress, download resources, participate in discussions, and manage your learning schedule. Our platform works seamlessly across all devices - desktop, tablet, and mobile.",
    icon: "📱",
    category: "Access"
  },
  {
    question: "What makes LearnStream different?",
    answer: "LearnStream combines cutting-edge technology with proven pedagogical methods. We offer personalized learning paths, AI-driven progress tracking, industry-relevant projects, direct mentorship from working professionals, and a job-ready curriculum designed by experts from top tech companies.",
    icon: "⭐",
    category: "Features"
  },
  {
    question: "Do you provide certificates?",
    answer: "Yes! Upon successful completion of any course, you'll receive a verified digital certificate that you can add to your LinkedIn profile, resume, or portfolio. Our certificates are recognized by leading tech companies and validate your skills in the respective domains.",
    icon: "🏆",
    category: "Certification"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Got Questions?</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Frequently Asked
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our platform, courses, and learning experience
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500 ${isOpen ? 'opacity-20' : ''}`}></div>
                
                {/* Main FAQ Card */}
                <div
                  className={`relative bg-[#1D1C20]/90 backdrop-blur-xl border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform group-hover:scale-[1.01] ${
                    isOpen 
                      ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
                      : 'border-gray-700/50 group-hover:border-gray-600'
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  {/* Question Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                        isOpen 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110' 
                          : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'
                      }`}>
                        {faq.icon}
                      </div>
                      
                      {/* Question and Category */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full font-medium">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                          isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Toggle Button */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rotate-45' 
                        : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Answer Content */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="pl-16">
                        <div className="h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50 mb-4"></div>
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-500 ${
                    isOpen ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2-8H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No FAQs found</h3>
            <p className="text-gray-400">Try searching with different keywords</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">Still have questions? Contact our support team</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}


// import { useState } from "react";

// const faqs = [
//   {
//     question: "What is LearnStream?",
//     answer: "LearnStream is an online platform to master DSA, System Design, Core Subjects and more with curated resources and live support.",
//   },
//   {
//     question: "Are the courses beginner friendly?",
//     answer: "Yes! All our courses are designed for all levels — with basics, advanced content, and real-world examples.",
//   },
//   {
//     question: "Is there any live doubt support?",
//     answer: "Yes, you get AI-driven and mentor-based doubt support plus biweekly sessions with experts.",
//   },
//   {
//     question: "How do I access my courses?",
//     answer: "Once you sign up, you can access all your courses from your dashboard anytime.",
//   },
// ];

// export default function FAQ() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="max-w-4xl mx-auto px-4 py-16">
//       <h2 className="text-4xl font-bold text-center mb-12">
//         Frequently Asked Questions
//       </h2>

//       <div className="space-y-4">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             onClick={() => toggleFAQ(index)}
//             className="cursor-pointer bg-[#1D1C20] rounded-lg p-6 border border-gray-700 hover:border-orange-600 transition"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-semibold">{faq.question}</h3>
//               <span className="text-2xl">
//                 {openIndex === index ? "-" : "+"}
//               </span>
//             </div>
//             {openIndex === index && (
//               <p className="mt-4 text-gray-300">{faq.answer}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
