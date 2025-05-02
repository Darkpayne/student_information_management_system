import { login } from "@/lib/authStore";
import { AUTH_API_URL } from "@/lib/constants";

export const LoginUser = async (data: {email:string, password:string}) => {
  const res = await fetch(AUTH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Wrong Credentials.");
  }
  login()
  return res.json();
};
export const LogoutUser = async () => {
  const res = await fetch(AUTH_API_URL + '/logout', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  
  return res.json();
};