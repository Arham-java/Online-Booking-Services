import axios from 'axios';

var API_URL = 'http://localhost:5000/api';

var api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export async function loginCall(email, password, role) {
    var response = await api.post('/auth/login', { email, password, role });
    return response.data;
};

export async function signupCall(name, email, password, role) {
    var response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
};

export async function logoutCall() {
    var response = await api.post('/auth/logout');
    return response.data;
};

// Events API
export async function getEventsCall() {
    var response = await api.get('/events');
    return response.data;
};

export async function createEventCall(eventData) {
    var response = await api.post('/events', eventData);
    return response.data;
};

// Bookings API
export async function bookEventCall(eventId, tickets) {
    var response = await api.post('/bookings', { eventId, tickets });
    return response.data;
};

export async function getMyBookingsCall() {
    var response = await api.get('/bookings/mybookings');
    return response.data;
};

export async function getAllBookingsCall() {
    var response = await api.get('/bookings');
    return response.data;
};

export default api;
