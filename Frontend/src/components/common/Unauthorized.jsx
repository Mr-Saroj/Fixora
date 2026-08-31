import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#f7f9fb] text-center px-4">
      <span className="material-symbols-outlined text-6xl text-[#004ac6] mb-4">
        lock
      </span>
      <h1 className="text-2xl font-semibold text-[#0f172a] mb-2">
        Access Denied
      </h1>
      <p className="text-[#64748B] mb-6 max-w-sm">
        You don't have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-5 py-2 rounded-lg bg-[#004ac6] text-white text-sm font-medium hover:bg-[#003a9e] transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;