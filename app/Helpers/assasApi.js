const axios = use('axios')
const Env = use('Env')

const api = axios.create({
  baseURL: Env.get('ASSAS_URL'),
  headers: {
    "Content-Type": "application/json",
    access_token: Env.get('ASSAS_KEY'),
  }
});

api.interceptors.response.use(function ({ data }) {
  return data
}, function ({ response }) {
  console.log(response.data)
  return Promise.reject(response.data);
});

module.exports = api