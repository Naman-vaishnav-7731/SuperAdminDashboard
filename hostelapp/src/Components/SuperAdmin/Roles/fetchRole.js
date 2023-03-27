import axios from "../../../api/axios";
const URL = "/role/";

export const FetchRoles = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
        },
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
};