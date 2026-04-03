import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Event from './models/Event.js';
import connectDB from './config/db.js';

dotenv.config();

var CATEGORIES = [
  { name: 'Concerts', keyword: 'music', prefixes: ['Summer', 'Winter', 'Acoustic', 'Rock', 'Jazz', 'Pop', 'Indie', 'Classical', 'Hip-Hop', 'Electronic'], suffix: 'Concert' },
  { name: 'Sports', keyword: 'sport', prefixes: ['Championship', 'Local', 'Regional', 'National', 'Invitational', 'Charity', 'Pro', 'Amateur', 'Youth', 'Senior'], suffix: 'Tournament' },
  { name: 'Movies', keyword: 'film', prefixes: ['Sci-Fi', 'Indie', 'Action', 'Comedy', 'Drama', 'Horror', 'Documentary', 'Classic', 'Foreign', 'Animated'], suffix: 'Premiere' },
  { name: 'Comedy', keyword: 'comedy', prefixes: ['Friday Night', 'Improv', 'Stand-up', 'Sketch', 'Open Mic', 'Roast', 'Late Night', 'College', 'Family', 'Dark'], suffix: 'Special' },
  { name: 'Workshops', keyword: 'workshop', prefixes: ['Web Dev', 'Photography', 'Cooking', 'Painting', 'Writing', 'Pottery', 'Yoga', 'Meditation', 'Finance', 'Leadership'], suffix: 'Masterclass' },
];

var DUMMY_EVENTS = [];
var currentYear = new Date().getFullYear();

for (var i = 0; i < CATEGORIES.length; i++) {
  var cat = CATEGORIES[i];
  
  for (var j = 0; j < cat.prefixes.length; j++) {
    var prefix = cat.prefixes[j];
    var index = j;
    
    var eventItem = {
      title: prefix + ' ' + cat.suffix + ' ' + (index + 1),
      description: 'Join us for the amazing ' + prefix + ' ' + cat.suffix + '. A great experience for everyone interested in ' + cat.keyword + '.',
      date: new Date(currentYear + '-' + ((index % 12) + 1) + '-15'),
      location: 'Venue ' + (index + 1) + ', City Center',
      price: (index + 1) * 10 + 20,
      totalSpots: (index + 1) * 20,
      availableSpots: (index + 1) * 20
    };
    
    DUMMY_EVENTS.push(eventItem);
  }
}

async function seedData() {
  try {
    await connectDB();
    
    var organizer = await User.findOne({ role: 'organizer' });
    
    if (organizer == null) {
      organizer = new User({
        name: 'Demo Organizer',
        email: 'organizer@demo.com',
        password: 'password123',
        role: 'organizer'
      });
      await organizer.save();
    }
    
    for (var k = 0; k < DUMMY_EVENTS.length; k++) {
      var eventData = DUMMY_EVENTS[k];
      var existing = await Event.findOne({ title: eventData.title });
      
      if (existing == null) {
        var event = new Event({
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          location: eventData.location,
          price: eventData.price,
          totalSpots: eventData.totalSpots,
          availableSpots: eventData.availableSpots,
          organizer: organizer._id
        });
        await event.save();
        console.log('Added event: ' + event.title);
      } else {
        console.log('Event already exists: ' + eventData.title);
      }
    }
    
    console.log('Seeding completed!');
    process.exit();
  } catch (error) {
    console.log('Seeding failed:');
    console.log(error);
    process.exit(1);
  }
}

seedData();
