import { isClient } from "./../configs/enviroments";

const USER = "user";

type TStoredUser = {
  accessToken?: string;
};

export const getStoredUser = <T = TStoredUser>(): T | null => {
  return null
  // if (!isClient) return null;
  // const storedUser =
  //   typeof window !== "undefined" ? localStorage.getItem(USER) : null;

  // return storedUser ? (JSON.parse(storedUser) as T) : null;
};

export const setStorage = <T>(key: string, data: T) => {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearStorage = (key: string) => {
  if (!isClient) return;
  localStorage.removeItem(key);
};

export const getAccessToken = () => {
  if (!isClient) return null;
  const accessToken = localStorage.getItem('accessToken') || null;

  return accessToken ?? null;
};
