import axios from "axios";
import type {
  GeniusSearchResponse,
  HitsEntity,
} from "./types/genius.service.types";
import type { Album, LastfmAlbumResponse } from "./types/lastfm.service.types";

const GENIUS_SONG_URI = "https://api.genius.com";
const LASTFM_ALBUM_URI = `https://ws.audioscrobbler.com/2.0`;

interface getRelatedSearchParams {
  prompt: string;
  includeAlbums: boolean;
}

export const getRelatedSearch = async ({
  prompt,
  includeAlbums,
}: getRelatedSearchParams): Promise<HitsEntity[]> => {
  try {
    const promptParam = prompt.toLocaleLowerCase().trim();

    const url = `${GENIUS_SONG_URI}/search`;

    const accessToken =
      import.meta.env.GENIUS_ACCESS_TOKEN ??
      import.meta.env.PUBLIC_GENIUS_ACCESS_TOKEN;

    const params = {
      q: promptParam,
      access_token: accessToken,
    };

    let parsedRelatedAlbums: HitsEntity[] = [];
    if (includeAlbums) {
      const res = await getRelatedSearchAlbums(promptParam);
      const parsedRelatedResponse = parseMusicSuggestions(res);
      parsedRelatedAlbums = orderByFeaturings(parsedRelatedResponse);
    }

    const { data }: { data: GeniusSearchResponse } = await axios.get(url, {
      params,
      headers: {
        Accept: "application/json",
      },
    });

    if (data.response.hits) {
      return parsedRelatedAlbums.concat(data.response.hits);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRelatedSearchAlbums = async (
  prompt: string
): Promise<Album[]> => {
  try {
    const url = `${LASTFM_ALBUM_URI}/`;

    const apiKey =
      import.meta.env.LASTFM_KEY ?? import.meta.env.PUBLIC_LASTFM_KEY;

    const params = {
      method: "album.search",
      album: prompt,
      format: "json",
      api_key: apiKey,
      limit: 3,
    };

    const { data }: { data: LastfmAlbumResponse } = await axios.get(url, {
      params,
      headers: {
        Accept: "application/json",
      },
    });

    if (data.results.albummatches.album) {
      return data.results.albummatches.album;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const orderByFeaturings = (items: HitsEntity[]): HitsEntity[] => {
  const filtered = items.sort((a, b) => {
    const artistA = a.result.primary_artist.name.toLowerCase();
    const artistB = b.result.primary_artist.name.toLowerCase();

    if (artistA.includes("&") && !artistB.includes("&")) {
      return -1;
    } else if (!artistA.includes("&") && artistB.includes("&")) {
      return 1;
    } else {
      return 0;
    }
  });
  return filtered;
};

const parseMusicSuggestions = (data: Album[]): HitsEntity[] => {
  return data.map((el, i) => parseMusicSuggestion(el, i));
};

const parseMusicSuggestion = (suggestion: Album, i: number): HitsEntity => {
  return {
    index: "album",
    type: "album",
    result: {
      annotation_count: 0,
      api_path: "",
      artist_names: "",
      full_title: suggestion.name,
      header_image_thumbnail_url: suggestion.image[2]["#text"],
      header_image_url: "",
      id: i,
      lyrics_owner_id: 0,
      lyrics_state: "",
      path: "",
      pyongs_count: 0,
      relationships_index_url: "",

      release_date_for_display: "",
      release_date_with_abbreviated_month_for_display: "",
      song_art_image_thumbnail_url: "",
      song_art_image_url: "",
      title: suggestion.name,
      title_with_featured: "",
      url: "",
      stats: undefined,
      release_date_components: undefined,
      primary_artist: {
        id: i,
        image_url: suggestion.image[2]["#text"],
        name: suggestion.artist,
        url: suggestion.url,
      },
    },
  };
};
