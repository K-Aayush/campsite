"use client";

import React from "react";
import {
  HelpCircle,
  AlertCircle,
  Square,
  MessageSquare,
  User,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const faqItems = [
  {
    icon: <HelpCircle className="w-6 h-6" />,
    question: "What is Mayur Wellbeing?",
    answer:
      "Mayur Wellbeing offers mindfulness and wellness programs, including meditation, yoga, and nature-based activities to promote holistic health.",
    id: 1,
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    question: "What are your core programs?",
    answer:
      "Our programs include Nature Education, Camping Together, and Social Wellbeing, designed to foster personal growth and community connection.",
    id: 2,
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: "What if I need to cancel a booking?",
    answer:
      "You can cancel bookings up to 48 hours in advance for a full refund. Contact our support team for assistance.",
    id: 3,
  },
  {
    icon: <Square className="w-6 h-6" />,
    question: "Are programs suitable for beginners?",
    answer:
      "Yes, our programs are designed for all levels, with guided sessions tailored to beginners and advanced participants alike.",
    id: 4,
  },
  {
    icon: <User className="w-6 h-6" />,
    question: "Who leads the sessions?",
    answer:
      "Our sessions are led by certified wellness experts with extensive experience in mindfulness, yoga, and outdoor education.",
    id: 5,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    question: "Is my personal information safe?",
    answer:
      "We prioritize your privacy with secure data handling and compliance with global privacy standards. See our Privacy Policy for details.",
    id: 6,
  },
];

export default function FaqQuestionAnswer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {faqItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: item.id * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-green-600 dark:text-green-400 p-3 rounded-full bg-green-50 dark:bg-gray-900">
              {item.icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
            {item.question}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            {item.answer}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
