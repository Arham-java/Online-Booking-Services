import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Event from './models/Event.js';
import connectDB from './config/db.js';

dotenv.config();

const CATEGORIES = [
  { name: 'Concerts', keyword: 'music', prefixes: ['Summer', 'Winter', 'Acoustic', 'Rock', 'Jazz', 'Pop', 'Indie', 'Classical', 'Hip-Hop', 'Electronic'], suffix: 'Concert' },
  { name: 'Sports', keyword: 'sport', prefixes: ['Championship', 'Local', 'Regional', 'National', 'Invitational', 'Charity', 'Pro', 'Amateur', 'Youth', 'Senior'], suffix: 'Tournament' },
  { name: 'Movies', keyword: 'film', prefixes: ['Sci-Fi', 'Indie', 'Action', 'Comedy', 'Drama', 'Horror', 'Documentary', 'Classic', 'Foreign', 'Animated'], suffix: 'Premiere' },
  { name: 'Comedy', keyword: 'comedy', prefixes: ['Friday Night', 'Improv', 'Stand-up', 'Sketch', 'Open Mic', 'Roast', 'Late Night', 'College', 'Family', 'Dark'], suffix: 'Special' },
  { name: 'Workshops', keyword: 'workshop', prefixes: ['Web Dev', 'Photography', 'Cooking', 'Painting', 'Writing', 'Pottery', 'Yoga', 'Meditation', 'Finance', 'Leadership'], suffix: 'Masterclass' },
];

let DUMMY_EVENTS = [];
const currentYear = new Date().getFullYear();

CATEGORIES.forEach(cat => {
  cat.prefixes.forEach((prefix, index) => {
    DUMMY_EVENTS.push({
      title: `${prefix} ${cat.suffix} ${index + 1}`,
      description: `Join us for the amazing ${prefix} ${cat.suffix}. A great experience for everyone interested in ${cat.keyword}.`,
      date: new Date(`${currentYear}-${(index % 12) + 1}-15`),
      location: `Venue ${index + 1}, City Center`,
      price: (index + 1) * 10 + 20,
      totalSpots: (index + 1) * 20,
      availableSpots: (index + 1) * 20
    });
  });
});

const seedData = async () => {
  try {
    await connectDB();
    
    // Find or create an organizer
    let organizer = await User.findOne({ role: 'organizer' });
    if (!organizer) {
      organizer = new User({
        name: 'Demo Organizer',
        email: 'organizer@demo.com',
        password: 'password123',
        role: 'organizer'
      });
      await organizer.save();
    }
    
    // Clear existing dummy events optionally
    // We will just add them
    for (let eventData of DUMMY_EVENTS) {
      // Check if it already exists to avoid duplicates if run multiple times
      const existing = await Event.findOne({ title: eventData.title });
      if (!existing) {
        const event = new Event({
          ...eventData,
          organizer: organizer._id
        });
        await event.save();
        console.log(`Added event: ${event.title}`);
      } else {
        console.log(`Event already exists: ${eventData.title}`);
      }
    }
    
    console.log('Seeding completed!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
