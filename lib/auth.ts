import axios from "axios";

export const auth = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL!}/api/auth`);
    return data;
  } catch (error) {
    console.log("CHECK_AUTH", error);
    return null;
  }
};
