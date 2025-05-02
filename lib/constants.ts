export const STUDENT_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://student-information-management-system-sigma.vercel.app/api/students"
    : "http://localhost:3000/api/students";
export const AUTH_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://student-information-management-system-sigma.vercel.app/api/auth"
    : "http://localhost:3000/api/auth";
