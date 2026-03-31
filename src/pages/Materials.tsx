import React, { useState, useEffect } from 'react';
import { UserProfile, Course } from '../types';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  FileText, 
  Video, 
  Download, 
  ExternalLink, 
  ChevronLeft,
  PlayCircle,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Materials({ userProfile }: { userProfile: UserProfile | null }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      const docSnap = await getDoc(doc(db, 'courses', courseId));
      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [courseId]);

  if (!userProfile) return <div className="p-12 text-center">Please login.</div>;
  if (loading) return <div className="p-12 text-center">Loading materials...</div>;
  if (!course) return <div className="p-12 text-center">Course not found.</div>;

  const materials = [
    { title: 'Chapter 1: Introduction Notes', type: 'pdf', url: '#' },
    { title: 'Chapter 1: Video Lecture', type: 'video', url: '#' },
    { title: 'Practice Set 1', type: 'pdf', url: '#' },
    { title: 'Chapter 2: Advanced Concepts', type: 'pdf', url: '#' },
    { title: 'Revision Guide', type: 'pdf', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-bold text-blue-600 mb-8 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600">Access all your study materials and recorded sessions here.</p>
            </div>
            <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Instructor</div>
              <div className="font-bold text-blue-900">{course.instructor}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PDF Materials */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Study Guides & PDFs
            </h2>
            <div className="space-y-4">
              {materials.filter(m => m.type === 'pdf').map((m, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 4 }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <FileText className="h-5 w-5 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-900">{m.title}</span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Video Materials */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <PlayCircle className="h-5 w-5 mr-2 text-red-600" />
              Recorded Lectures
            </h2>
            <div className="space-y-4">
              {materials.filter(m => m.type === 'video').map((m, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 4 }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 p-3 rounded-xl">
                      <Video className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="font-medium text-gray-900">{m.title}</span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
