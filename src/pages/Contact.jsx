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
    <div className="py-20 px-8 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className={`text-5xl font-bold text-center mb-10 ${STYLES.gradientText}`}>
        Contact Us
      </h1>
      <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
        Have questions? We'd love to hear from you.
      </p>

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
        <h2 className="text-2xl font-bold mb-8 text-cyan-400">Send us a Message</h2>
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
            className={STYLES.primaryBtn + ' w-full'}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
