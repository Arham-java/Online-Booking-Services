import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export async function getEvents(req, res) {
    try {
        var events = await Event.find().populate('organizer', 'name email');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export async function getEventById(req, res) {
    try {
        var event = await Event.findById(req.params.id).populate('organizer', 'name email');
        
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Organizer/Admin)
export async function createEvent(req, res) {
    try {
        var { title, description, date, location, price, totalSpots } = req.body;

        var event = new Event({
            title,
            description,
            date,
            location,
            price,
            totalSpots,
            availableSpots: totalSpots,
            organizer: req.user._id
        });

        var createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Organizer/Admin)
export async function updateEvent(req, res) {
    try {
        var event = await Event.findById(req.params.id);

        if (event) {
            // Check if user is the organizer
            if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to update this event' });
            }

            event.title = req.body.title || event.title;
            event.description = req.body.description || event.description;
            event.date = req.body.date || event.date;
            event.location = req.body.location || event.location;
            event.price = req.body.price || event.price;
            
            // Adjust available spots if total spots changed
            if (req.body.totalSpots) {
                var diff = req.body.totalSpots - event.totalSpots;
                event.totalSpots = req.body.totalSpots;
                event.availableSpots = event.availableSpots + diff;
            }

            var updatedEvent = await event.save();
            res.status(200).json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Organizer/Admin)
export async function deleteEvent(req, res) {
    try {
        var event = await Event.findById(req.params.id);

        if (event) {
            // Check if user is the organizer
            if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to delete this event' });
            }

            await event.deleteOne();
            res.status(200).json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};
