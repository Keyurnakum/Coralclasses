import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Trophy, 
  CheckCircle2,
  Star,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const Hero = () => (
  <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent" />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
            New Batch Starting Soon!
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            Master Your Future with <br />
            <span className="text-blue-600">Expert Guidance</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Comprehensive coaching for competitive exams and academic excellence. 
            Join 5000+ successful students who achieved their dreams with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all"
            >
              Book Free Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="py-12 bg-white border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Students Enrolled', value: '5000+' },
          { label: 'Success Rate', value: '98%' },
          { label: 'Expert Faculty', value: '50+' },
          { label: 'Years Experience', value: '15+' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EduStream?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide a holistic learning environment designed to help you succeed.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Expert Faculty',
            desc: 'Learn from industry veterans and top-tier educators with years of experience.',
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            title: 'Modern Curriculum',
            desc: 'Stay ahead with our updated study materials and interactive learning tools.',
            icon: BookOpen,
            color: 'bg-indigo-500'
          },
          {
            title: 'Proven Results',
            desc: 'Consistent track record of producing top rankers in competitive exams.',
            icon: Trophy,
            color: 'bg-purple-500'
          }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white", feature.color)}>
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: 'Rahul Sharma',
            role: 'IIT-JEE Ranker',
            text: 'The faculty here is amazing. They simplified complex concepts and provided constant support throughout my preparation.',
            stars: 5
          },
          {
            name: 'Priya Patel',
            role: 'NEET Aspirant',
            text: 'The online test series and study materials are top-notch. It helped me identify my weak areas and improve significantly.',
            stars: 5
          },
          {
            name: 'Amit Kumar',
            role: 'Board Topper',
            text: 'Personalized attention and regular doubt-clearing sessions made a huge difference in my board exam scores.',
            stars: 5
          }
        ].map((t, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="flex mb-4">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-6">"{t.text}"</p>
            <div>
              <div className="font-bold text-gray-900">{t.name}</div>
              <div className="text-sm text-blue-600">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'How do I enroll in a course?', a: 'You can enroll by clicking the "Enroll Now" button on the courses page or by visiting our center.' },
    { q: 'Do you provide online classes?', a: 'Yes, we offer both offline and live online classes via Google Meet integration.' },
    { q: 'Is there a refund policy?', a: 'We offer a 7-day demo period. Please contact our support for detailed refund terms.' },
    { q: 'What study materials do you provide?', a: 'We provide comprehensive PDFs, recorded lectures, and physical workbooks.' }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <ChevronRight className={cn("h-5 w-5 text-gray-400 transition-transform", openIndex === i && "rotate-90")} />
              </button>
              {openIndex === i && (
                <div className="px-6 py-4 text-gray-600 border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <FAQ />
    </div>
  );
}
