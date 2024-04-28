export class Constants {
  static readonly NODE_BACKEND_URL: string =
    import.meta.env.NODE_BACKEND_URL || "https://event-bn.onrender.com/api/v1/";

  static readonly DEFAULT_ERROR_MESSAGE: string =
    "Something went wrong, please try again later.";
}
