import axios from "../../../api/axios";
const URL = "/rule/";

// Fetch all Rules
export const FetchRules = async () => {
    try {
      const response = await axios.get(URL, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`},
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
}