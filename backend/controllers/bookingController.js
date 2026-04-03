import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export async function createBooking(req, res) {
    try {
        var { eventId, tickets } = req.body;

        var event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.availableSpots < tickets) {
            return res.status(400).json({ message: 'Not enough spots available' });
        }

        event.availableSpots -= tickets;
        await event.save();

        var booking = new Booking({
            user: req.user._id,
            event: eventId,
            tickets,
            totalPrice: event.price * tickets
        });

        var createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export async function getMyBookings(req, res) {
    try {
        var bookings = await Booking.find({ user: req.user._id }).populate('event');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// @desc    Get all bookings (Admin/Organizer for their events)
// @route   GET /api/bookings
// @access  Private (Organizer/Admin)
export async function getBookings(req, res) {
    try {
        var bookings;
        if (req.user.role === 'admin') {
            bookings = await Booking.find().populate('user', 'name email').populate('event');
        } else if (req.user.role === 'organizer') {
            var events = await Event.find({ organizer: req.user._id });
            var eventIds = events.map(e => e._id);
            bookings = await Booking.find({ event: { $in: eventIds } }).populate('user', 'name email').populate('event');
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};
