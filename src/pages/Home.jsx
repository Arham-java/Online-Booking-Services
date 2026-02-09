import React from 'react';
import { FeatureCard } from '../components/UI/SharedComponents';
import { STYLES } from '../constants';

const FEATURES = [
  {
    title: 'Instant Access',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    desc: 'Receive your digital tickets immediately after booking via email.',
  },
  {
    title: 'Secure Payments',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=250&fit=crop',
    desc: 'Your transactions are protected with military-grade encryption.',
  },
  {
    title: 'Global Reach',
    image: 'https://images.unsplash.com/photo-1524874694410-92386f1c4ab9?w=400&h=250&fit=crop',
    desc: 'From local workshops to international festivals, we have it all.',
  },
];

const HERO_BANNER = {
  image: 'https://images.unsplash.com/photo-1520975913728-6a260f1f06b8?auto=format&fit=crop&w=1600&q=80',
  title: 'Experience Live Music',
  description: 'Book your favorite concerts and live performances with exclusive access to the best events.',
};

const Home = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-cyan-600/20 via-transparent to-transparent text-white py-28 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 ${STYLES.gradientText}`}>
            Unforgettable Experiences <br /> Start Here
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-slate-300 leading-relaxed">
            Book tickets for the most exclusive concerts, workshops, and entertainment events around the globe.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('signup')} 
              className={STYLES.primaryBtn}
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate('events')} 
              className={STYLES.secondaryBtn}
            >
              Browse Events
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={STYLES.section}>
        <h2 className={`text-4xl font-bold text-center mb-16 ${STYLES.gradientText}`}>
          Why Choose EventSphere?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {FEATURES.map((feature) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title}
              image={feature.image}
              desc={feature.desc}
            />
          ))}
        </div>
      </section>

      {/* Featured Concert Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl h-96 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_BANNER.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="pl-8 text-white">
                <h3 className="text-4xl font-bold mb-4">{HERO_BANNER.title}</h3>
                <p className="text-xl mb-6 max-w-md">{HERO_BANNER.description}</p>
                <button 
                  onClick={() => onNavigate('explore')} 
                  className={STYLES.primaryBtn}
                >
                  Explore Concerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
