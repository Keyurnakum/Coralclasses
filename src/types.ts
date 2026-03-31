export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'admin';
  enrolledCourses: string[];
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fee: number;
  duration: string;
  instructor: string;
  thumbnail: string;
  materials?: { title: string; url: string; type: 'pdf' | 'video' }[];
  meetLink?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string;
}

export interface Test {
  id: string;
  title: string;
  courseId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Result {
  id: string;
  userId: string;
  testId: string;
  score: number;
  total: number;
  completedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
