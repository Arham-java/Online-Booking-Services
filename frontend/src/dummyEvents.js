/* Generate dummy Indian events for display purposes */
function generateDummyEvents() {
  var CATEGORIES = [
    {
      name: 'Concerts',
      keyword: 'music',
      prefixes: ['Sunburn', 'NH7 Weekender', 'Bollywood Night', 'Rock On', 'Jazz Utsav', 'Folk India', 'Classical Raag', 'Hip-Hop Adda', 'Electronic Beats', 'Acoustic Evening', 'Indie Rocks', 'Sufi Soul'],
      keywords: ['concert', 'festival', 'bollywood', 'rockband', 'jazz', 'folk', 'classicalmusic', 'hiphop', 'edm', 'acoustic', 'indie', 'sufi'],
      suffix: 'Concert',
      locations: ['Goa', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Pune', 'Ahmedabad', 'Chandigarh', 'Lucknow'],
    },
    {
      name: 'Sports',
      keyword: 'sport',
      prefixes: ['IPL', 'Pro Kabaddi', 'ISL Football', 'National Badminton', 'State Wrestling', 'Inter-City Marathon', 'Premier Chess', 'Table Tennis', 'Swimming', 'Kho-Kho National', 'Volleyball Pro', 'Hockey League'],
      keywords: ['cricket', 'kabaddi', 'football', 'badminton', 'wrestling', 'marathon', 'chess', 'tabletennis', 'swimming', 'sports', 'volleyball', 'hockey'],
      suffix: 'Championship',
      locations: ['Mumbai', 'Wankhede Stadium', 'Chinnaswamy Stadium', 'Eden Gardens', 'Feroz Shah Kotla', 'PCA Stadium', 'Sardar Patel Stadium', 'VDCA Stadium', 'M. A. Chidambaram', 'Rajiv Gandhi Intl. Stadium', 'Kalinga Stadium', 'Salt Lake Stadium'],
    },
    {
      name: 'Movies',
      keyword: 'film',
      prefixes: ['MAMI', 'IFFI Goa', 'Bengaluru International', 'Kerala Film', 'Chennai Short', 'Jaipur Documentary', 'Kolkata Film', 'Pune Short Film', 'Delhi International', 'Indore Short Film', 'Guwahati Film', 'Lucknow Indie'],
      keywords: ['cinema', 'filmfestival', 'movie', 'shortfilm', 'camera', 'documentary', 'director', 'film', 'theater', 'premiere', 'bollywood', 'clapperboard'],
      suffix: 'Film Festival',
      locations: ['MAMI, Mumbai', 'IFFI, Goa', 'Bengaluru', 'Thiruvananthapuram', 'Chennai', 'Jaipur', 'Nandan, Kolkata', 'Pune', 'Delhi', 'Indore', 'Guwahati', 'Lucknow'],
    },
    {
      name: 'Comedy',
      keyword: 'comedy',
      prefixes: ['Kapil Sharma', 'Zakir Khan', 'Vir Das', 'Kanan Gill', 'Biswa Kalyan', 'Kenny Sebastian', 'Naveen Richard', 'Rahul Subramanian', 'Atul Khatri', 'Anuvab Pal', 'Aditi Mittal', 'Sorabh Pant'],
      keywords: ['standup', 'comedian', 'laugh', 'microphone', 'joke', 'funny', 'audience', 'smile', 'humor', 'stage', 'comedyclub', 'fun'],
      suffix: 'Live Stand-up',
      locations: ['NSCI Dome, Mumbai', 'NCPA, Mumbai', 'Bluefrog, Mumbai', 'Stein Auditorium, Delhi', 'Hard Rock Cafe, Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Chandigarh', 'Jaipur'],
    },
    {
      name: 'Workshops',
      keyword: 'workshop',
      prefixes: ['Startup India', 'Yoga at Rishikesh', 'Digital India', 'Pottery Masterclass', 'Indian Classical Dance', 'Mindfulness Retreat', 'Finance Masterclass', 'Photography Walk', 'Cooking with Master Chef', 'Vedic Studies', 'AI & ML Summit', 'Creative Writing'],
      keywords: ['startup', 'yoga', 'digital', 'pottery', 'dance', 'meditation', 'finance', 'photography', 'cooking', 'vedic', 'tech', 'writing'],
      suffix: 'Workshop',
      locations: ['IIT Delhi', 'Rishikesh', 'Infosys Bengaluru', 'Pottery Studio, Jaipur', 'Kalakshetra, Chennai', 'Dharamsala', 'BSE Mumbai', 'India Gate, Delhi', 'Taj Hotel, Mumbai', 'Varanasi', 'Pune C-DAC', 'Kolkata'],
    },
  ];

  var DUMMY_EVENTS = [];
  var currentYear = new Date().getFullYear();

  for (var i = 0; i < CATEGORIES.length; i++) {
    var cat = CATEGORIES[i];

    for (var j = 0; j < cat.prefixes.length; j++) {
      var prefix = cat.prefixes[j];
      var location = cat.locations[j] || 'India';

      var searchTerms = 'india,' + cat.keywords[j];
      var seedLock = (i * 12) + j;
      var imageUrl = 'https://loremflickr.com/500/350/' + searchTerms + '/all?lock=' + seedLock;

      var newEvent = {
        _id: 'dummy-' + cat.name.toLowerCase() + '-' + j,
        title: prefix + ' ' + cat.suffix,
        description: 'Join us for the amazing ' + prefix + ' ' + cat.suffix + '. A great experience for everyone interested in ' + cat.keyword + ' happening in India.',
        date: new Date(currentYear + '-' + ((j % 12) + 1) + '-15').toISOString(),
        location: location,
        price: (j + 1) * 150 + 500,
        totalSpots: (j + 1) * 20,
        availableSpots: (j + 1) * 20,
        category: cat.name,
        image: imageUrl,
      };

      DUMMY_EVENTS.push(newEvent);
    }
  }

  return DUMMY_EVENTS;
}

export { generateDummyEvents };
