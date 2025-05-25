import React from "react";

const StayConnected = () => {
  return (
    <div className="bg-gray-500 rounded min-h-[400px] flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl">Stay Inspired, Staty Mindful!</h1>
      <p className="text-base text-gray-500">
        Get exclusinve meditation guides, yoga tips, and wellness insights
        delivered to your inbox
      </p>
      <form className="bg-red-500 space-x-3 p-2">
        <input
          type="text"
          placeholder="Type your email..."
          className="bg-white h-full md:w-72 p-2 rounded placeholder:text-gray-500 placeholder:font-normal"
        />
        <button className="bg-green-500 p-2 rounded px-6 font-medium text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default StayConnected;
