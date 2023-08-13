import axios from "axios";
import toast from 'react-hot-toast';
import React from "react";

function getToken() {
    if (localStorage.getItem("token")) {
        console.log("token", localStorage.getItem("token"));
        const accessToken = localStorage.getItem("token") || "";
        return accessToken;
    }
    return "";
}

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL + "api";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    (error) => {
        toast.error(error?.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        toast.error(error?.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default axios;