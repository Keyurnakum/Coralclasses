import React, { useState, useEffect } from 'react';
import { UserProfile, Test, Question, Result } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Timer, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TestPage({ userProfile }: { userProfile: UserProfile | null }) {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      // For demo, if testId is a courseId, we show a sample test
      const sampleTest: Test = {
        id: 'sample-test',
        title: 'Physics Chapter 1 Quiz',
        courseId: testId || '',
        questions: [
          {
            id: 'q1',
            text: 'What is the SI unit of force?',
            options: ['Newton', 'Joule', 'Watt', 'Pascal'],
            correctAnswer: 0
          },
          {
            id: 'q2',
            text: 'Which of the following is a scalar quantity?',
            options: ['Velocity', 'Acceleration', 'Force', 'Speed'],
            correctAnswer: 3
          },
          {
            id: 'q3',
            text: 'What is the acceleration due to gravity on Earth?',
            options: ['8.9 m/s²', '9.8 m/s²', '10.5 m/s²', '7.8 m/s²'],
            correctAnswer: 1
          }
        ]
      };
      setTest(sampleTest);
      setAnswers(new Array(sampleTest.questions.length).fill(-1));
      setLoading(false);
    };
    fetchTest();
  }, [testId]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!test || !userProfile) return;
    
    let finalScore = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) finalScore++;
    });
    
    setScore(finalScore);
    setCompleted(true);

    // Save result to Firestore
    try {
      await addDoc(collection(db, 'results'), {
        userId: userProfile.uid,
        testId: test.id,
        score: finalScore,
        total: test.questions.length,
        completedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading test...</div>;
  if (!test) return <div className="p-8 text-center">Test not found.</div>;

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h2>
          <p className="text-gray-500 mb-8">Great job on finishing the quiz.</p>
          
          <div className="mb-8 rounded-2xl bg-cyan-50 p-6">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-cyan-600">Your Score</div>
            <div className="text-5xl font-black text-cyan-900">{score} / {test.questions.length}</div>
          </div>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
            <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {test.questions.length}</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Timer className="h-4 w-4 text-cyan-600" />
            <span className="font-mono font-bold text-gray-700">14:59</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-8">{question.text}</h2>
          <div className="space-y-4">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-2xl border-2 transition-all",
                  answers[currentQuestion] === i 
                    ? "border-cyan-600 bg-cyan-50 text-cyan-900" 
                    : "border-gray-100 hover:border-gray-200 text-gray-700"
                )}
              >
                <div className="flex items-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center text-xs font-bold",
                    answers[currentQuestion] === i ? "border-cyan-600 bg-cyan-600 text-white" : "border-gray-300 text-gray-400"
                  )}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="px-6 py-3 text-gray-600 font-bold disabled:opacity-30"
          >
            Previous
          </button>
          
          {currentQuestion === test.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="flex items-center rounded-xl bg-cyan-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-100 hover:bg-cyan-700"
            >
              Next Question
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
