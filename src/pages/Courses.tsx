import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Course } from '../types';
import { motion } from 'motion/react';
import { Clock, User, IndianRupee, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      
      // If no courses, add some sample ones
      if (coursesData.length === 0) {
        const samples: Omit<Course, 'id'>[] = [
          {
            title: 'IIT-JEE Foundation',
            description: 'Comprehensive course for Class 11 & 12 students aiming for IITs.',
            fee: 45000,
            duration: '1 Year',
            instructor: 'Dr. S.K. Sharma',
            thumbnail: 'https://picsum.photos/seed/jee/800/600'
          },
          {
            title: 'NEET Medical Prep',
            description: 'Intensive coaching for medical entrance exams with focus on Biology.',
            fee: 42000,
            duration: '1 Year',
            instructor: 'Dr. Anjali Verma',
            thumbnail: 'https://picsum.photos/seed/neet/800/600'
          },
          {
            title: 'Class 10 Board Special',
            description: 'Targeted preparation for Class 10 Board exams with regular tests.',
            fee: 15000,
            duration: '6 Months',
            instructor: 'Prof. Rajesh Gupta',
            thumbnail: 'https://picsum.photos/seed/boards/800/600'
          }
        ];
        for (const sample of samples) {
          await addDoc(collection(db, 'courses'), sample);
        }
        const updatedSnapshot = await getDocs(collection(db, 'courses'));
        setCourses(updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
      } else {
        setCourses(coursesData);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of specialized courses designed to help you excel.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-cyan-600 backdrop-blur">
                  {course.duration}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{course.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center text-lg font-bold text-gray-900">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    <span>{course.fee.toLocaleString()}</span>
                  </div>
                </div>
                
                <Link
                  to={`/login`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-700"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
