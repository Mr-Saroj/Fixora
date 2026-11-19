import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("token", token, {
    expires: 1,
    path: "/",
    sameSite: "Lax",
    secure: import.meta.env.PROD
  });
};

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token", {
    path: "/"
  });
};