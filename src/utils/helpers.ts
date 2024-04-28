import { User } from "../@types";

export const user: User = JSON.parse(
  localStorage.getItem("currentUser") ?? "{}"
);
