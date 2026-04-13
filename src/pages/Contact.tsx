import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Failed to save inquiry.');
      }

      setStatus('success');
      setFormData({ name: '', phone: '', course: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us via any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Visit Us</h3>
                <p className="text-gray-600">Opp K K Mall, railway Station Road,<br />Main Road, near Atithi Restaurant,<br />Gujarat 361305</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Call Us</h3>
                <p className="text-gray-600"><a href="tel:+918154876973" className="hover:text-blue-600 transition-colors">+91 8154876973</a></p>
                <p className="text-gray-600"><a href="tel:+919978086840" className="hover:text-blue-600 transition-colors">+91 9978086840</a></p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Us</h3>
                <p className="text-gray-600"><a href="mailto:coralclasses0172020@gmail.com" className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium transition-colors underline">coralclasses0172020@gmail.com</a></p>
                <p className="text-gray-600"><a href="mailto:support@coralclasses.com" className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium transition-colors underline">support@coralclasses.com</a></p>
              </div>
            </div>


          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2 bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="+91 8154876973"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interested Course</label>
                <select
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                  <option value="">Select a course</option>
                  <option value="IIT-JEE">IIT-JEE Prep</option>
                  <option value="NEET">NEET Prep</option>
                  <option value="Boards">Board Exams</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-8 py-4 font-bold text-white transition-all hover:bg-cyan-700 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                <Send className="ml-2 h-5 w-5" />
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-center font-medium">Inquiry sent successfully! We'll contact you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center font-medium">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
