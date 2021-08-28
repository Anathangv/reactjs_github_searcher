import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com', //dedaço do endereço que pé repetido em todas as requisições
})

export default api;