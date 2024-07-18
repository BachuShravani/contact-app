import axios from 'axios';

export const contactsApi = axios.create({
    baseURL : "http://localhost:3006/"
})