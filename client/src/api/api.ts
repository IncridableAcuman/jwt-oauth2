import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080/api/v1"
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry: boolean
        }
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axiosInstance.get("/auth/refresh")
                localStorage.setItem("accessToken", data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                localStorage.removeItem("accessToken");
                window.location.href = "/auth"
                return Promise.reject(error)
            }
        }
        (error: AxiosError) => Promise.reject(error)
    }
)

export default axiosInstance;