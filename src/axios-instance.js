import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tracking-bimplus-beacon.herokuapp.com/'
});

export default instance;

