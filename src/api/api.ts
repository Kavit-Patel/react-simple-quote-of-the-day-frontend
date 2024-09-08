import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const fetchQuoteOfTheDay = async () => {
  const response = await axios.get("https://api.quotable.io/random");
  return response.data;
};
export const useLogin = () =>
  useMutation((data: { email: string; password: string }) =>
    api.post("/user/login", data).then((res) => res.data)
  );
export const useRegister = () =>
  useMutation((data: { email: string; password: string }) =>
    api.post("/user/register", data).then((res) => res.data)
  );
export const useFetchProfile = () =>
  useQuery("profile", () => api.get("/user/profile").then((res) => res.data));
export const useFetchQuote = () =>
  useQuery("quote", () => api.get("/quote").then((res) => res.data));
export const useSaveQuote = () =>
  useMutation((data: { text: string; author: string; userId: number }) =>
    api.post("/quote", { ...data })
  );
// export const useFetchHistory = () =>
//   useQuery("history", () => api.get("/quote/history").then((res) => res.data));
// export const useSearchQuote = (query: string) =>
//   useQuery(["search", query], () =>
//     api.get(`/quote/search?query=${query}`).then((res) => res.data)
//   );

export const useFetchHistory = (userId: number) =>
  useQuery(["history", userId], () =>
    api.get(`/quote/history`, { params: { userId } }).then((res) => res.data)
  );
export const useSearchQuote = (author: string) =>
  useQuery(["search", author], () =>
    api.get(`/quote/search`, { params: { author } }).then((res) => res.data)
  );
