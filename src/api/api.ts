import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const errorMessage = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    return error.response.data?.message.join(", ") || "An error occured !";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Network error !";
};

export const fetchQuoteOfTheDay = async () => {
  const response = await axios.get(import.meta.env.VITE_QUOTE_API);
  return response.data;
};
export const useLogin = () => {
  return useMutation(
    (data: { email: string; password: string }) =>
      api.post("/user/login", data).then((res) => res.data),
    {
      onSuccess: () => {
        toast.success("Logged In successfull !");
      },
      onError: (err) => {
        toast.error(errorMessage(err));
      },
    }
  );
};
export const useRegister = () =>
  useMutation(
    (data: { email: string; password: string }) =>
      api.post("/user/register", data).then((res) => res.data),
    {
      onSuccess: () => {
        toast.success("Registration Successfull !");
      },
      onError: (err) => {
        toast.error(errorMessage(err));
      },
    }
  );
export const useFetchProfile = () =>
  useQuery("profile", () => api.get("/user/profile").then((res) => res.data));
export const useFetchQuote = () =>
  useQuery("quote", () => api.get("/quote").then((res) => res.data));
export const useSaveQuote = () =>
  useMutation(
    (data: { text: string; author: string; userId: number }) =>
      api.post("/quote", { ...data }),
    {
      onSuccess: () => {
        toast.success("Quote Saved to history !");
      },
      onError: (err) => {
        toast.error(errorMessage(err));
      },
    }
  );

export const useFetchHistory = (userId: number) =>
  useQuery(["history", userId], () =>
    api.get(`/quote/history`, { params: { userId } }).then((res) => res.data)
  );
export const useSearchQuote = (author: string) =>
  useQuery(["search", author], () =>
    api.get(`/quote/search`, { params: { author } }).then((res) => res.data)
  );
