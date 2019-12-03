import axios from "axios";

const axiosInstance = axios.create({
  // Novo dominio registrado no NO-IP
  // baseURL: "http://localhost:5000"
  baseURL: "https://api-brlab-v1.herokuapp.com/"
  // baseURL: "http://brlab.ddns.net:5000/"
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  }
};

export function getCep(cep) {
  return axios.get(`http://viacep.com.br/ws/${cep}/json/`);
}
