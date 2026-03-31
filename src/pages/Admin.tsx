import React, { useState, useEffect } from 'react';
import { UserProfile, Course, Inquiry, Announcement } from '../types';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  Plus, 
  Trash2, 
  Edit,
  BarChart3,
  CheckCircle,
  Clock
} from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function Admin({ userProfile }: { userProfile: UserProfile | null }) {
  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'inquiries' | 'announcements'>('students');
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userProfile || userProfile.role !== 'admin') return;

      const [studentsSnap, coursesSnap, inquiriesSnap, announcementsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'courses')),
        getDocs(collection(db, 'inquiries')),
        getDocs(query(collection(db, 'announcements'), orderBy('createdAt', 'desc')))
      ]);

      setStudents(studentsSnap.docs.map(doc => doc.data() as UserProfile));
      setCourses(coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
      setInquiries(inquiriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry)));
      setAnnouncements(announcementsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement)));

      setLoading(false);
    };

    fetchData();
  }, [userProfile]);

  if (!userProfile || userProfile.role !== 'admin') {
    return <div className="p-12 text-center text-red-600 font-bold">Access Denied. Admin only.</div>;
  }

  if (loading) return <div className="p-12 text-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm font-bold">{students.length} Students</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            {[
              { id: 'students', label: 'Students', icon: Users },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
              { id: 'announcements', label: 'Announcements', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-3" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
              <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </button>
            </div>

            <div className="overflow-x-auto">
              {activeTab === 'students' && (
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {students.map((student, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{student.displayName}</td>
                        <td className="px-6 py-4 text-gray-600">{student.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            student.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {student.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(student.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button className="text-gray-400 hover:text-blue-600 mr-3"><Edit className="h-4 w-4" /></button>
                          <button className="text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'inquiries' && (
                <div className="p-6 space-y-4">
                  {inquiries.map((inq, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{inq.name}</h3>
                        <span className="text-[10px] text-gray-400 uppercase font-bold">{new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-bold">Phone:</span> {inq.phone} | <span className="font-bold">Course:</span> {inq.course}
                      </div>
                      <p className="text-sm text-gray-700 italic">"{inq.message}"</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'announcements' && (
                <div className="p-6 space-y-4">
                  {announcements.map((ann, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-900">{ann.title}</h3>
                        <p className="text-sm text-gray-600">{ann.content}</p>
                      </div>
                      <button className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
