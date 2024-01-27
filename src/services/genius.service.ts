import axios from "axios";
import type {
  GeniusSearchResponse,
  HitsEntity,
} from "./types/genius.service.types";

const BASE_URI = "https://api.genius.com";

export const getRelatedSearch = async (
  prompt: string
): Promise<HitsEntity[]> => {
  try {
    const promptParam = prompt.toLocaleLowerCase().trim();

    const url = `${BASE_URI}/search`;

    const accessToken =
      import.meta.env.GENIUS_ACCESS_TOKEN ??
      import.meta.env.PUBLIC_GENIUS_ACCESS_TOKEN;

    const params = {
      q: promptParam,
      access_token: accessToken,
    };

    const { data }: { data: GeniusSearchResponse } = await axios.get(url, {
      params,
      headers: {
        Accept: "application/json",
      },
    });

    if (data.response.hits) {
      return data.response.hits;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
