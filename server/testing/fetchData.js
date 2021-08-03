const axios = require('axios');
const API = 'https://api.xadi.io';
 
const fetchData = async query => {
  const url = `${API}/${query}`;
 
  return await axios.get(url);
};

module.exports = {
  API, fetchData
}