import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 border-t border-cyan-500/20 py-12 px-8 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400">
        <div className="font-bold text-lg mb-4 md:mb-0 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">EventSphere</div>
        <p className="text-sm">© 2026 EventSphere Platform. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-cyan-400 transition duration-300">Terms</a>
          <a href="#" className="hover:text-cyan-400 transition duration-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
