export const generateDummyEvents = () => {
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
        _id: `dummy-${cat.name.toLowerCase()}-${index}`,
        title: `${prefix} ${cat.suffix} ${index + 1}`,
        description: `Join us for the amazing ${prefix} ${cat.suffix}. A great experience for everyone interested in ${cat.keyword}.`,
        date: new Date(`${currentYear}-${(index % 12) + 1}-15`).toISOString(),
        location: `Venue ${index + 1}, City Center`,
        price: (index + 1) * 10 + 20,
        totalSpots: (index + 1) * 20,
        availableSpots: (index + 1) * 20,
        category: cat.name
      });
    });
  });

  return DUMMY_EVENTS;
};
