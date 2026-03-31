import React, { useState, useEffect } from 'react';
import { UserProfile, Course, Announcement } from '../types';
import { 
  Book, 
  Video, 
  FileText, 
  Bell, 
  Calendar, 
  ExternalLink,
  CreditCard,
  QrCode,
  Upload,
  Trophy
} from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Dashboard({ userProfile }: { userProfile: UserProfile | null }) {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userProfile) return;

      // Fetch Enrolled Courses
      const coursesSnap = await getDocs(collection(db, 'courses'));
      const allCourses = coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      // For demo, if no enrolled, show all
      setEnrolledCourses(allCourses);

      // Fetch Announcements
      const annQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(5));
      const annSnap = await getDocs(annQuery);
      setAnnouncements(annSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement)));

      setLoading(false);
    };

    fetchData();
  }, [userProfile]);

  if (!userProfile) return <div className="p-8 text-center">Please login to view dashboard.</div>;
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {userProfile.displayName}</h1>
            <p className="text-gray-600">Track your progress and access study materials.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowPayment(true)}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Fees
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enrolled Courses */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Book className="mr-2 h-5 w-5 text-cyan-600" />
                My Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        to={`/materials/${course.id}`}
                        className="inline-flex items-center rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700 hover:bg-cyan-100"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Materials
                      </Link>
                      <a 
                        href={course.meetLink || "#"} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100"
                      >
                        <Video className="h-3 w-3 mr-1" />
                        Live Class
                      </a>
                      <Link 
                        to={`/test/${course.id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-100"
                      >
                        <Trophy className="h-3 w-3 mr-1" />
                        Take Test
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Materials */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Video className="h-5 w-5 mr-2 text-red-600" />
                Recorded Lectures
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Video className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Physics Lecture {i}: Thermodynamics</div>
                        <div className="text-xs text-gray-500">Uploaded 2 days ago</div>
                      </div>
                    </div>
                    <button className="text-cyan-600 hover:text-cyan-700">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Announcements */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-yellow-600" />
                Announcements
              </h2>
              <div className="space-y-4">
                {announcements.length > 0 ? announcements.map(ann => (
                  <div key={ann.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{ann.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{ann.content}</p>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">{new Date(ann.createdAt).toLocaleDateString()}</div>
                  </div>
                )) : (
                  <div className="bg-white p-4 rounded-xl border border-gray-100 text-center text-gray-500 text-sm">
                    No new announcements.
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming Schedule */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Schedule
              </h2>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Maths (Calculus)</span>
                  <span className="font-bold text-cyan-600">10:00 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Chemistry (Organic)</span>
                  <span className="font-bold text-cyan-600">02:00 PM</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Fee Payment</h2>
              <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="text-center space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl inline-block">
                <QrCode className="h-32 w-32 text-gray-900 mx-auto" />
                <p className="mt-4 text-sm font-bold text-gray-700">Scan to pay via UPI</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">After payment, upload the screenshot for verification.</p>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Screenshot</span>
                  <input type="file" className="hidden" />
                </label>
                <button 
                  onClick={() => setShowPayment(false)}
                  className="w-full rounded-xl bg-cyan-600 py-3 font-bold text-white hover:bg-cyan-700"
                >
                  Submit for Verification
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const X = ({ className, ...props }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
