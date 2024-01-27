import { GENIUS_ACCESS_TOKEN } from "@/env";
import axios from "axios";

interface MusicSuggestion {
  song?: string;
  artist: string;
}

const BASE_URI = "https://api.genius.com";

export const getRelatedSearch = async (
  prompt: string
): Promise<MusicSuggestion[] | any> => {
  const promptParam = window.encodeURIComponent(
    prompt.toLocaleLowerCase().trim()
  );

  const params = {
    q: promptParam,
  };

  const url = `${BASE_URI}/search`;
  //   const accessToken = import.meta.env.GENIUS_ACCESS_TOKEN;
  const accessToken = GENIUS_ACCESS_TOKEN;
  const res = await axios.get(url, {
    params,
    headers: {
      //   "User-Agent": "CompuServe Classic/1.22",
      //   Accept: "application/json",
      Host: "api.genius.com",
      Authorization: `Bearer n5IUkpDwm248BpxIsv383hAkTDs3VkYX1J1bX210Ux9yreE2qLh_su1qDcd2FW8c`,
    },
  });

  console.log(res);
  return res;

  return [
    {
      artist: "33",
    },
  ];
};
