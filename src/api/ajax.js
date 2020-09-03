import axios from 'axios'
import fi from "element-ui/src/locale/lang/fi";

const qs = require('qs');

const api = {
  async get(url) {
    try {
      let res = await axios.get(url);
      res = res.data;
      return new Promise((resolve) => {
        resolve(res)
      })
    } catch (err) {
      alert('无法连接至服务器');
      console.log('无法连接至服务器');
    }
  },
  async post(url, data) {
    try {
      let res = await axios.post(url, qs.stringify(data));
      res = res.data;
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {
      alert('无法连接至服务器');
      console.log('无法连接至服务器');
    }
  },
  async post_JSON(url, data) {
    try {
      let headers = {
        'Content-Type': 'application/json'
      };
      let res = await axios.post(url, data,headers);
      res = res.data;
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {
      alert('无法连接至服务器');
      console.log('无法连接至服务器');
    }
  },
  async upload(url, data) {
    var fileObj = data;
    var form = new FormData();
    form.append(fileObj);
    form.append("time", (new Date()).getTime());

    try {
      let res = await axios.post(url, form,{
        'Content-Type': 'multipart/form-data',
      });
      res = res.data;
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {
      console.log('无法连接至服务器');
    }
  },
  getQueryVariable(variable)
  {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
      let pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  },

};

export { api }

