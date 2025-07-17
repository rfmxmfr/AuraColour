import React from "react";

export default function Component() {
  return (
    <>
      <input
        className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        type="email"
        defaultValue=""
        required
        placeholder="Enter your email"
        style={ {
          color: "#000000",
          width: "100%",
          borderRadius: "0.75rem",
          borderWidth: "1px",
          borderColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        } }
      />
      
      <div className="relative">
        <input
          className="w-full px-4 py-3 pr-12 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          defaultValue=""
          required
          placeholder="Enter password"
          style={ {
            color: "#000000",
            width: "100%",
            borderRadius: "0.75rem",
            borderWidth: "1px",
            borderColor: "rgba(255, 255, 255, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            paddingLeft: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            paddingRight: "3rem",
          } }
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </>
  );
}