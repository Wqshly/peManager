import axios from 'axios'
import router from '../router'
import {eventBus} from './bus'

const qs = require('qs');
const root = process.env.API_ROOT;

axios.interceptors.response.use(function (response) {
  if (response.data.code === -1) {
    router.push('/login');
  } else {
    return response;
  }
}, function (error) {
  eventBus.emit("bad");
  return Promise.reject(error);
});

const api = {
  async get(url) {
    try {
      let res = await axios.get(root + url);
      res = res.data;
      return new Promise((resolve) => {
        resolve(res)
      })
    } catch (err) {

    }
  },
  async post(url, data) {
    try {
      let res = await axios.post(root + url, qs.stringify(data));
      res = res.data;
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {

    }
  },
  async post_JSON(url, data) {
    try {
      let headers = {
        'Content-Type': 'application/json'
      };
      let res = await axios.post(root + url, data, headers);
      res = res.data;
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {

    }
  },
  async upload(url, data) {

    try {
      let res = await axios.post(root + url, data, {
        'Content-Type': 'multipart/form-data',
      });
      res = res.data;
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {

    }
  },

};

export {api}

