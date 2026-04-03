import React, { useState, useEffect } from 'react';
import { EventCard } from '../components/UI/SharedComponents';
import { STYLES, EVENT_CATEGORIES } from '../constants';
import { getEventsCall, bookEventCall } from '../services/api';
import { generateDummyEvents } from '../dummyEvents';

var CATEGORY_IMAGES = {
  'Concerts': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1600&q=80',
  'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80',
  'Movies': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80',
  'Comedy': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80',
  'Stand-ups': 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&w=1600&q=80',
  'Workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
};

function CategoryEvents(props) {
  var category = props.viewData;
  if (!category) {
    category = 'All Categories';
  }

  var [events, setEvents] = useState([]);
  var [loading, setLoading] = useState(true);

  var heroImage = CATEGORY_IMAGES[category];
  if (!heroImage) {
    heroImage = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80';
  }

  useEffect(function() {
    async function fetchEvents() {
      try {
        var dbData = await getEventsCall();
        var dummyData = generateDummyEvents();
        
        var combinedData = [];
        for (var i = 0; i < dbData.length; i++) {
          combinedData.push(dbData[i]);
        }
        for (var j = 0; j < dummyData.length; j++) {
          combinedData.push(dummyData[j]);
        }

        function filterByCategory(eventsData, cat) {
          if (cat === 'All Categories') {
            return eventsData;
          }
          
          var catLower = cat.toLowerCase();
          var filtered = [];
          
          for (var k = 0; k < eventsData.length; k++) {
            var e = eventsData[k];
            var t = (e.title || '').toLowerCase();
            var d = (e.description || '').toLowerCase();
            
            var matchCategory = t.includes(catLower) || d.includes(catLower);
            if (cat === 'Concerts' && (t.includes('music') || t.includes('concert') || d.includes('music'))) matchCategory = true;
            if (cat === 'Movies' && (t.includes('film') || t.includes('movie') || d.includes('film'))) matchCategory = true;
            if (cat === 'Sports' && (t.includes('sport') || t.includes('basketball') || t.includes('marathon') || d.includes('sport'))) matchCategory = true;
            if (cat === 'Workshops' && (t.includes('workshop') || t.includes('bootcamp') || t.includes('masterclass') || d.includes('workshop'))) matchCategory = true;
            if ((cat === 'Comedy' || cat === 'Stand-ups') && (t.includes('stand') || t.includes('comedy') || d.includes('comedy'))) matchCategory = true;
            
            if (matchCategory) {
              filtered.push(e);
            }
          }
          return filtered;
        }

        var resultingEvents = filterByCategory(combinedData, category);
        setEvents(resultingEvents);
      } catch (error) {
        console.log('Failed to fetch events');
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, [category]);

  async function handleBook(eventId) {
    var isDummy = String(eventId).startsWith('dummy-');
    
    if (isDummy) {
      alert('Booking and payment successful! Your seat is securely confirmed for this event.');
      
      var newEvents = [];
      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        if (ev._id === eventId) {
          var newSpots = ev.availableSpots - 1;
          if (newSpots < 0) {
            newSpots = 0;
          }
          var updatedEvent = { ...ev, availableSpots: newSpots };
          newEvents.push(updatedEvent);
        } else {
          newEvents.push(ev);
        }
      }
      setEvents(newEvents);
      return;
    }

    try {
      await bookEventCall(eventId, 1);
      alert('Booking and payment successful! Your seat is confirmed.');
      
      var dbData = await getEventsCall();
      var dummyData = generateDummyEvents();
      
      var combinedData = [];
      for (var x = 0; x < dbData.length; x++) {
        combinedData.push(dbData[x]);
      }
      for (var y = 0; y < dummyData.length; y++) {
        combinedData.push(dummyData[y]);
      }

      function filterByCategory(eventsData, cat) {
        if (cat === 'All Categories') {
          return eventsData;
        }
        
        var catLower = cat.toLowerCase();
        var filtered = [];
        
        for (var k = 0; k < eventsData.length; k++) {
          var e = eventsData[k];
          var t = (e.title || '').toLowerCase();
          var d = (e.description || '').toLowerCase();
          
          var matchCategory = t.includes(catLower) || d.includes(catLower);
          if (cat === 'Concerts' && (t.includes('music') || t.includes('concert') || d.includes('music'))) matchCategory = true;
          if (cat === 'Movies' && (t.includes('film') || t.includes('movie') || d.includes('film'))) matchCategory = true;
          if (cat === 'Sports' && (t.includes('sport') || t.includes('basketball') || t.includes('marathon') || d.includes('sport'))) matchCategory = true;
          if (cat === 'Workshops' && (t.includes('workshop') || t.includes('bootcamp') || t.includes('masterclass') || d.includes('workshop'))) matchCategory = true;
          if ((cat === 'Comedy' || cat === 'Stand-ups') && (t.includes('stand') || t.includes('comedy') || d.includes('comedy'))) matchCategory = true;
          
          if (matchCategory) {
            filtered.push(e);
          }
        }
        return filtered;
      }
      
      var resultingEvents = filterByCategory(combinedData, category);
      setEvents(resultingEvents);
      
    } catch (error) {
      console.log(error);
      var errorMessage = 'Failed to book event. Please try logging in again.';
      if (error && error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
      
      if (error && error.response && error.response.status === 401) {
        props.onNavigate('login');
      }
    }
  }
  
  function goBack() {
    props.onNavigate('explore');
  }

  function renderEvents() {
    var eventCards = [];
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var imageUrl = event.image;
      if (!imageUrl) {
        imageUrl = 'https://source.unsplash.com/random/400x300/?' + encodeURIComponent(event.title);
      }
      
      eventCards.push(
        <EventCard 
          key={event._id}
          id={event._id}
          title={event.title}
          image={imageUrl}
          date={event.date}
          location={event.location}
          price={event.price}
          availableSpots={event.availableSpots}
          onBook={handleBook}
        />
      );
    }
    return eventCards;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("' + heroImage + '")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-white capitalize">
            {category} Events
          </h1>
          <p className="text-lg text-blue-100 font-medium">
            Explore the best {category.toLowerCase()} happening near you and secure your spots today!
          </p>
          <button onClick={goBack} className="mt-8 px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 font-bold transition">
             ← Back to Explore
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-8 max-w-7xl mx-auto min-h-[50vh]">
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Available {category}</h2>
            <div className="text-gray-500 font-medium">{events.length} Events found</div>
        </div>
        
        {loading === true ? (
          <div className="text-center py-10 text-xl font-medium text-gray-500">Loading {category}...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
             <div className="text-5xl mb-4">🔍</div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">No {category} found</h3>
             <p className="text-gray-500 mb-6">There are currently no events matching this category.</p>
             <button onClick={goBack} className={STYLES.primaryBtn}>
                Browse All Events
             </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderEvents()}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryEvents;
