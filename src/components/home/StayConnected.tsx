"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import HomeContentCard from "./HomeContentCard";
import { showToast } from "@/utils/Toast";

const StayConnected = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast("error", { title: "Please enter your email address" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", {
          title: "Successfully subscribed!",
          description: "Check your email for a welcome message.",
        });
        setEmail("");
      } else {
        showToast("error", {
          title: data.error || "Subscription failed",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      showToast("error", {
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeContentCard
      header="Stay Inspired, Stay Mindful!"
      description="Get exclusive meditation guides, yoga tips, and wellness insights delivered to your inbox"
      className="py-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 max-w-lg mx-auto"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="flex-grow bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg border border-gray-200 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400"
            aria-label="Email address"
            disabled={loading}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </HomeContentCard>
  );
};

export default StayConnected;
