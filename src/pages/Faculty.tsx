import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail, Twitter } from 'lucide-react';

export default function Faculty() {
  const faculty = [
    {
      name: 'Manoj Chopda',
      role: 'Physics Expert',
      exp: '8+ Years',
      edu: 'B.Tech - 8+ Years Experience',
      image: '/images/ManojChopda.jpeg',
      bio: 'Expert in Mechanics and Quantum Physics. Has mentored over 10,000 students for JEE Advanced.'
    },
    {
      name: 'Jignesh Nakum',
      role: 'Biology + Chemistry Expert',
      exp: '6+ Years',
      edu: 'B.Sc. , B.Ed. - Exp: 6+ Years',
      image: '/images/JigneshNakum.jpeg',
      bio: 'Biology expert. Known for his simplified diagrams and memory tricks.'
    },
    {
      name: 'Upendra Chopda',
      role: 'Mathematics Expert',
      exp: '8+ Years',
      edu: 'B.Sc. , B.Ed. - Exp: 8+ Years',
      image: '/images/UpendraChopda.jpeg',
      bio: 'Calculus and Algebra wizard. Author of several best-selling competitive math workbooks.'
    }
  ];

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Faculty</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from the best minds in the industry. Our teachers are dedicated to your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 space-x-4">
                  <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur transition-colors hover:bg-white hover:text-cyan-600">
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur transition-colors hover:bg-white hover:text-cyan-600">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur transition-colors hover:bg-white hover:text-cyan-600">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="mb-3 text-sm font-medium text-cyan-600">{member.role}</div>
                <div className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">{member.edu}</div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
