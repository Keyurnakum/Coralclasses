import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation 
} from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard,
  MessageSquare,
  Phone,
  GraduationCap,
  House
} from 'lucide-react';
import { auth, db, googleProvider } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from './types';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import TestPage from './pages/Test';
import Materials from './pages/Materials';
import Chatbot from './components/Chatbot';

const Navbar = ({ userProfile }: { userProfile: UserProfile | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-100 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.jpeg"
                alt="CoralClasses logo"
                className="h-11 w-auto max-w-[160px] rounded-2xl bg-white px-2 py-1 object-contain shadow-sm"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-cyan-600",
                  location.pathname === link.path ? "text-cyan-700" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            {userProfile ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={userProfile.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-cyan-600"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-cyan-100 transition-all hover:bg-cyan-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-cyan-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-cyan-100 bg-white md:hidden"
          >
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
                >
                  {link.name}
                </Link>
              ))}
              {userProfile ? (
                <>
                  <Link
                    to={userProfile.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md bg-cyan-600 px-3 py-2 text-base font-medium text-white hover:bg-cyan-700"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="border-t border-cyan-900/30 bg-slate-950 pt-12 pb-28 text-white md:pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="mb-4">
            <img
              src="/logo.jpeg"
              alt="CoralClasses logo"
              className="h-16 w-auto rounded-2xl bg-white px-3 py-2 object-contain shadow-sm"
            />
          </div>
          <p className="max-w-md text-gray-400">
            Empowering students with quality education and modern learning tools.
            Join us to shape your future with expert guidance and comprehensive study materials.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-400 transition-colors hover:text-cyan-300">About Us</Link></li>
            <li><Link to="/courses" className="text-gray-400 transition-colors hover:text-cyan-300">Courses</Link></li>
            <li><Link to="/faculty" className="text-gray-400 transition-colors hover:text-cyan-300">Faculty</Link></li>
            <li><Link to="/contact" className="text-gray-400 transition-colors hover:text-cyan-300">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-cyan-300" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-cyan-300" />
              <span>info@coralclasses.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CoralClasses. All rights reserved.
      </div>
    </div>
  </footer>
);

const MobileBottomNav = ({ userProfile }: { userProfile: UserProfile | null }) => {
  const location = useLocation();

  const mobileLinks = [
    { name: 'Home', path: '/', icon: House },
    { name: 'Courses', path: '/courses', icon: GraduationCap },
    { name: 'Contact', path: '/contact', icon: Phone },
    {
      name: userProfile ? 'Dashboard' : 'Login',
      path: userProfile ? (userProfile.role === 'admin' ? '/admin' : '/dashboard') : '/login',
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="mobile-bottom-nav md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 px-3 py-2">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive = link.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(link.path);

          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold transition-all',
                isActive
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-200'
                  : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
              )}
            >
              <Icon className="mb-1 h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919876543210"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed right-4 bottom-24 z-40 rounded-full bg-green-500 p-3.5 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 md:right-6 md:bottom-6"
  >
    <Phone className="h-5 w-5 md:h-6 md:w-6" />
  </a>
);

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
          // Create profile for new user
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Student',
            role: 'student',
            enrolledCourses: [],
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
          setUserProfile(newProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-transparent font-sans selection:bg-cyan-100 selection:text-cyan-900">
        <Navbar userProfile={userProfile} />
        <main className="mobile-content-safe flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard userProfile={userProfile} />} />
            <Route path="/admin" element={<Admin userProfile={userProfile} />} />
            <Route path="/test/:testId" element={<TestPage userProfile={userProfile} />} />
            <Route path="/materials/:courseId" element={<Materials userProfile={userProfile} />} />
          </Routes>
        </main>
        <Footer />
        <MobileBottomNav userProfile={userProfile} />
        <WhatsAppButton />
        <Chatbot />
      </div>
    </Router>
  );
}

// Simple Login Page Component
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 rounded-2xl border border-cyan-100 bg-white p-8 text-center shadow-xl shadow-cyan-100/40">
        <GraduationCap className="mx-auto h-16 w-16 text-cyan-600" />
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500">Sign in to access your dashboard and courses</p>
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
