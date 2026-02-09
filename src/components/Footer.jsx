import React from 'react';
import { STYLES } from '../constants';

const FOOTER_LINKS = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 border-t border-cyan-500/20 py-12 px-8 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400">
        {/* Logo */}
        <div className={`font-bold text-lg mb-4 md:mb-0 ${STYLES.gradientText}`}>
          EventSphere
        </div>
        
        {/* Copyright */}
        <p className="text-sm">© 2026 EventSphere Platform. All rights reserved.</p>
        
        {/* Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          {FOOTER_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="hover:text-cyan-400 transition duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
