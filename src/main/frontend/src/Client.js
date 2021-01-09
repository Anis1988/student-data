import axios from "axios";
import fetch from "unfetch";

export const getAllStudents = () => {
  fetch("/students");
};
