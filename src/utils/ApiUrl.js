import axios from "axios";

const axiosAPI = axios.create({
  baseURL: `https://${import.meta.env.VITE_PROJECT_ID}.supabase.co/rest/v1/`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ANON_KEY}`,
    apikey: `${import.meta.env.VITE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
});

export default axiosAPI;
