import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/';

class RateService {
  getRates(page = 1, per_page = 10) {
    return axios.get(API_URL + `rates?page=${page}&per_page=${per_page}`, {
      headers: authHeader(),
    });
  }

  getHistory(id) {
    return axios.get(API_URL + `rates/history?id=${id}`, {
      headers: authHeader(),
    });
  }
}

export default new RateService();
