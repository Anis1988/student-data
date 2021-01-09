import fetch from "unfetch";

export const getAllStudents = () => {
  return fetch("api/students");
};
