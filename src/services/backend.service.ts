import axios from "axios";
import type { SuggestionType } from "./types/genius.service.types";

interface GetPDFTemplateProps {
  type: SuggestionType;
  artist: string;
  album: string;
  url?: string;
}

export interface ScrapingResponse {
  success: boolean;
  pdfPath: string;
}

const BACKEND_BASE_URI = "https://kindle-genius-docker.onrender.com";

export const getPDFTemplate = async ({
  type,
  artist,
  album,
  url,
}: GetPDFTemplateProps): Promise<ScrapingResponse | null> => {
  try {
    const endpoint = `${BACKEND_BASE_URI}/scrape`;

    const body = {
      url,
    };

    const { data } = await axios.post(endpoint, body);

    return data as ScrapingResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};

type GeneratePdfProps = { template: string; email: string };
export const generatePdf = async (
  body: GeneratePdfProps
): Promise<string | null> => {
  try {
    const endpoint = `http://localhost:3000/generate-pdf`;
    const { data } = await axios.post(endpoint, body);

    return data as string;
  } catch (error) {
    console.log(error);
    return null;
  }
};
