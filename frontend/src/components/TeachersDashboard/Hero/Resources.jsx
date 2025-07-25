const resources = [
  {
    id: 1,
    title: "DSA Notes",
    image: "https://source.unsplash.com/400x250/?dsa,study",
    link: "https://example.com/dsa-notes.pdf",
  },
  {
    id: 2,
    title: "System Design Handbook",
    image: "https://source.unsplash.com/400x250/?system,design",
    link: "https://example.com/system-design.pdf",
  },
  {
    id: 3,
    title: "Core Subjects Cheat Sheet",
    image: "https://source.unsplash.com/400x250/?computer,science",
    link: "https://example.com/core-subjects.pdf",
  },
  {
    id: 4,
    title: "Interview Preparation Guide",
    image: "https://source.unsplash.com/400x250/?interview,job",
    link: "https://example.com/interview-guide.pdf",
  },
];

const Resources = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        📚 Study Resources
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-[#1D1C20] rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => window.open(resource.link, "_blank")}
          >
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">
                {resource.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>

  )
}

export default Resources