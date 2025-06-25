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
    question: "What is Campsite Nepal?",
    answer:
      "Campsite Nepal is Nepal's premier camping ground offering the best camping sites near Kathmandu, jungle camping, wild camping, and adventure activities for all ages.",
    id: 1,
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    question: "What camping experiences do you offer?",
    answer:
      "We offer jungle camping in Nepal, wild camping adventures, family camping, group camping, and adventure camping with various outdoor activities and facilities.",
    id: 2,
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    question: "Can I cancel my camping booking?",
    answer:
      "You can cancel camping bookings up to 48 hours in advance for a full refund. Contact our support team for assistance with your camping reservation.",
    id: 3,
  },
  {
    icon: <Square className="w-6 h-6" />,
    question: "Are camping programs suitable for beginners?",
    answer:
      "Yes, our camping programs are designed for all levels, from beginner campers to experienced outdoor enthusiasts, with guided sessions and safety measures.",
    id: 4,
  },
  {
    icon: <User className="w-6 h-6" />,
    question: "Who leads the camping activities?",
    answer:
      "Our camping activities are led by certified outdoor experts with extensive experience in jungle camping, adventure camping, and wilderness safety in Nepal.",
    id: 5,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    question: "Is camping at your site safe?",
    answer:
      "We prioritize safety with trained guides, emergency protocols, and secure camping facilities. Our campsite follows all safety standards for outdoor activities.",
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
