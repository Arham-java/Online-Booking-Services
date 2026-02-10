import React from 'react';
import { STYLES } from '../constants';

const FOOTER_LINKS = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
];

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-12 px-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600">
      {/* Logo */}
      <div className="font-bold text-lg mb-4 md:mb-0 text-blue-600">
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
            className="hover:text-blue-600 transition duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
