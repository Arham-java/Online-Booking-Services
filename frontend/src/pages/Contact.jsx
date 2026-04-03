import React, { useState } from 'react';
import { ContactCard, FormInput } from '../components/UI/SharedComponents';
import { STYLES } from '../constants';

const CONTACT_INFO = [
  { 
    title: 'Email', 
    details: 'himeshjaiswal12@gmail.com helloarham596@gmail.com', 
    subtext: 'We respond within 24 hours' 
  },
  { 
    title: 'Phone', 
    details: '+91 9608456717 +91 9552012347', 
    subtext: 'Monday - Friday, 9AM - 6PM EST' 
  },
  { 
    title: 'Address', 
    details: 'Bhubaneswar', 
    subtext: 'Odisha, India' 
  },
];

const Contact = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', formData);
    alert('Thank you for your message! We will be in touch soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-lg text-gray-100">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-8 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-white">

      {/* Contact Information Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {CONTACT_INFO.map((info) => (
          <ContactCard 
            key={info.title}
            title={info.title} 
            details={info.details} 
            subtext={info.subtext}
            icon="📧"
          />
        ))}
      </div>

      {/* Contact Form */}
      <div className={`${STYLES.card} p-12 max-w-2xl mx-auto`}>
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Send us a Message</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormInput 
            label="Full Name" 
            placeholder="Your Name" 
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <FormInput 
            label="Email Address" 
            placeholder="mail@gmail.com" 
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <FormInput 
            label="Subject" 
            placeholder="How can we help?" 
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
          />
          <div>
            <label className={STYLES.formLabel}>Message</label>
            <textarea 
              placeholder="Your message..." 
              rows="5"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={STYLES.formInput}
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Contact;
