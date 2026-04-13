import React, { useState } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');

    // Simple bot logic
    setTimeout(() => {
      let botResponse = "I'm a simple assistant. For detailed inquiries, please use our contact form or call us at +91 8154876973.";
      if (userMsg.toLowerCase().includes('course')) {
        botResponse = "We offer IIT-JEE, NEET, and Board exam preparation. Check our Courses page for details!";
      } else if (userMsg.toLowerCase().includes('fee')) {
        botResponse = "Fees vary by course. You can see the fee structure on the Courses page.";
      }
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-40 z-50 rounded-full bg-cyan-600 p-4 text-white shadow-lg shadow-cyan-200 transition-transform hover:scale-110 hover:bg-cyan-700 md:right-6 md:bottom-24"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed right-3 bottom-40 z-[60] flex h-[500px] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl md:right-6 md:bottom-24 md:w-80 md:max-w-none lg:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-cyan-600 p-4 text-white">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="font-bold">CoralClasses Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.isBot ? "justify-start" : "justify-end")}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm",
                    msg.isBot 
                      ? "bg-white text-gray-800 rounded-tl-none shadow-sm" 
                      : "bg-cyan-600 text-white rounded-tr-none shadow-md"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-grow rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-xl bg-cyan-600 p-2 text-white transition-colors hover:bg-cyan-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
