import { useState } from "react";

const faqs = [
  {
    question: "What is LearnStream?",
    answer: "LearnStream is an online platform to master DSA, System Design, Core Subjects and more with curated resources and live support.",
  },
  {
    question: "Are the courses beginner friendly?",
    answer: "Yes! All our courses are designed for all levels — with basics, advanced content, and real-world examples.",
  },
  {
    question: "Is there any live doubt support?",
    answer: "Yes, you get AI-driven and mentor-based doubt support plus biweekly sessions with experts.",
  },
  {
    question: "How do I access my courses?",
    answer: "Once you sign up, you can access all your courses from your dashboard anytime.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className="cursor-pointer bg-[#1D1C20] rounded-lg p-6 border border-gray-700 hover:border-orange-600 transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <span className="text-2xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-4 text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
