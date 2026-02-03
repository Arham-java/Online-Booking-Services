import React from 'react';
import { ContactCard, FormInput } from '../components/UI/SharedComponents';

const Contact = ({ onNavigate }) => {
  return (
    <div className="py-20 px-8 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contact Us</h1>
      <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
        Have questions? We'd love to hear from you.
      </p>

      {/* Contact Information Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <ContactCard title="Email" details="himeshjaiswal12@gmail.com helloarham596@gmail.com" subtext="We respond within 24 hours" />
        <ContactCard title="Phone" details="+91 9608456717 +91 9552012347" subtext="Monday - Friday, 9AM - 6PM EST" />
        <ContactCard title="Address" details="Bhubaneswar" subtext="Odisha, India" />
      </div>

      {/* Contact Form */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-12 rounded-2xl border border-cyan-500/20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-cyan-400">Send us a Message</h2>
        <form className="space-y-6">
          <FormInput label="Full Name" placeholder="Your Name" type="text" />
          <FormInput label="Email Address" placeholder="mail@gmail.com" type="email" />
          <FormInput label="Subject" placeholder="How can we help?" type="text" />
          <div>
            <label className="block text-sm font-semibold text-cyan-400 mb-2">Message</label>
            <textarea 
              placeholder="Your message..." 
              rows="5" 
              className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
