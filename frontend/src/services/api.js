import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const loginCall = async (email, password, role) => {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data;
};

export const signupCall = async (name, email, password, role) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
};

export const logoutCall = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

// Events API
export const getEventsCall = async () => {
    const response = await api.get('/events');
    return response.data;
};

export const createEventCall = async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
};

// Bookings API
export const bookEventCall = async (eventId, tickets) => {
    const response = await api.post('/bookings', { eventId, tickets });
    return response.data;
};

export const getMyBookingsCall = async () => {
    const response = await api.get('/bookings/mybookings');
    return response.data;
};

export const getAllBookingsCall = async () => {
    const response = await api.get('/bookings');
    return response.data;
};

export default api;
