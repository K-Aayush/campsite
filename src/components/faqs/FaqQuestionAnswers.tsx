import React from "react";
import {
  HelpCircle,
  AlertCircle,
  Square,
  MessageSquare,
  User,
  Shield,
} from "lucide-react";

export default function FaqQuestionAnswer() {
  const faqItems = [
    {
      icon: <HelpCircle className="w-6 h-6" />,
      question: "What is Nexwealth?",
      id: 1,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      question: "What is AI Advisor?",
      id: 2,
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      question: "What if Nexwealth stops?",
      id: 3,
    },
    {
      icon: <Square className="w-6 h-6" />,
      question: "AI advisor recommendations suit novice investors.",
      id: 4,
    },
    {
      icon: <User className="w-6 h-6" />,
      question: "Why is Nexwealth suitable for beginners and novice investors?",
      id: 5,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      question: "Will my funds or money be safe with Nexwealth?",
      id: 6,
    },
  ];

  return (
    <div className=" mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md border-2 text-center p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-center  mb-4">
              <div className="text-gray-600 p-3 rounded-full border-2">
                {item.icon}
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {item.question}
            </h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
