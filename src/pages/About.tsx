import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2010, CoralClasses started with a simple mission: to provide high-quality, 
              accessible education to every student. Over the last decade, we have grown from a small 
              coaching center to a leading educational institute with a presence across the country.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our approach combines traditional teaching methods with modern technology, ensuring 
              that students not only learn but also understand and apply their knowledge effectively.
            </p>
          </motion.div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/about/800/600" 
              alt="Institute" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cyan-600 p-8 text-white shadow-xl md:block">
              <div className="mb-1 text-4xl font-bold">15+</div>
              <div className="text-sm font-medium uppercase tracking-wider">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <div className="mb-6 w-fit rounded-2xl bg-cyan-100 p-4 text-cyan-600">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower students with the knowledge, skills, and confidence to achieve their academic 
              and professional goals through innovative and personalized coaching.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <div className="bg-purple-100 p-4 rounded-2xl text-purple-600 w-fit mb-6">
              <Eye className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and effective educational partner for students worldwide, 
              setting new standards in quality coaching and student success.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', icon: Award, desc: 'We maintain the highest ethical standards.' },
              { title: 'Excellence', icon: Award, desc: 'We strive for perfection in everything we do.' },
              { title: 'Student-First', icon: Users, desc: 'Our students are at the heart of our decisions.' },
              { title: 'Innovation', icon: Target, desc: 'We embrace new ideas and technologies.' }
            ].map((value, i) => (
              <div key={i} className="p-6">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 p-4 text-cyan-600">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
