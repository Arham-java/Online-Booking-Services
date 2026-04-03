import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalSpots: {
        type: Number,
        required: true
    },
    availableSpots: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
