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
  <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-32 lg:pb-40">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-100/70 via-transparent to-transparent" />
    </div>
    
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-6 inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-800">
            New Batch Starting Soon!
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:mb-8 sm:text-5xl lg:text-7xl">
            Master Your Future with <br />
            <span className="text-cyan-600">Expert Guidance</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:mb-10 sm:text-xl">
            Comprehensive coaching for competitive exams and academic excellence.
            Join 5000+ successful students who achieved their dreams with us.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/courses"
              className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-cyan-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-cyan-200 transition-all hover:bg-cyan-700 sm:w-auto"
            >
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
            >
              Book Free Demo
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
            <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">Mobile-friendly classes</span>
            <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">Live doubt support</span>
            <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">Quick WhatsApp help</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="border-y border-gray-100 bg-white py-10 sm:py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        {[
          { label: 'Students Enrolled', value: '5000+' },
          { label: 'Success Rate', value: '98%' },
          { label: 'Expert Faculty', value: '50+' },
          { label: 'Years Experience', value: '15+' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-cyan-50 bg-slate-50 px-4 py-5 text-center shadow-sm">
            <div className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">{stat.value}</div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:text-sm">{stat.label}</div>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CoralClasses?</h2>
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
            color: 'bg-cyan-500'
          },
          {
            title: 'Modern Curriculum',
            desc: 'Stay ahead with our updated study materials and interactive learning tools.',
            icon: BookOpen,
            color: 'bg-teal-500'
          },
          {
            title: 'Proven Results',
            desc: 'Consistent track record of producing top rankers in competitive exams.',
            icon: Trophy,
            color: 'bg-sky-500'
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
              <div className="text-sm text-cyan-600">{t.role}</div>
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
