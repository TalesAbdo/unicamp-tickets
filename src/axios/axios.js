import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:${process.env.PORT}/api`,
});

export default instance;
