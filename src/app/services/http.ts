import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:4001',
  timeout: 5000,
})

export const fetcher = (url: string) => http.get(url).then((res) => res.data)
