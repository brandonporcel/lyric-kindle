import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  useRef,
} from "react";
import { getRelatedSearch } from "../services/genius.service";
import type { HitsEntity } from "@/services/types/genius.service.types";
import SuggestionItem from "./SuggestionItem";
import SelectedResult from "./SelectedResult";
import PdfPresentation from "./PdfPresentation.tsx";
import {
  generatePdf,
  getPDFTemplate,
  type ScrapingResponse,
} from "@/services/backend.service.ts";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import type { UserInfo } from "@/types/index.ts";

export default function Form({ userInfo }: { userInfo: UserInfo | undefined }) {
  const [prompt, setPrompt] = useState("");
  const [includeAlbums, setIncludeAlbums] = useState(false);
  const [selectedResult, setSelectedResult] = useState<HitsEntity | null>(null);
  const [showPdfPresentation, setShowPdfPresentation] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSendingPdf, setIsSendingPdf] = useState(false);
  const [email, setEmail] = useState("");
  const [scrapingResult, setScrapingResult] = useState<ScrapingResponse | null>(
    null
  );
  const [relatedResults, setRelatedResults] = useState<HitsEntity[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handlePrompt = useCallback(
    (value: ChangeEvent<HTMLInputElement>) => {
      const v = value.target.value;
      setPrompt(v);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => searchRelatedMusic(v), 500);
      setTimeoutId(newTimeoutId);
    },
    [timeoutId]
  );

  const searchRelatedMusic = async (value: string) => {
    if (value.length < 3) {
      return;
    }

    const body = { prompt: value, includeAlbums };
    const results = await getRelatedSearch(body);
    setRelatedResults(results);
  };

  function clearSearch(e: React.MouseEvent) {
    e.preventDefault();
    setRelatedResults([]);
    setPrompt("");
    setSelectedResult(null);
    inputRef.current?.focus();
  }

  const handleMusicSelection = (result: HitsEntity) => {
    setSelectedResult(result);
  };

  const submit = (e: any) => {
    e.preventDefault();
  };

  const handleSendPdf = async (e: any) => {
    e.preventDefault();
    if (!scrapingResult) return;

    try {
      setIsSendingPdf(true);
      const body = {
        template: scrapingResult.pdfPath,
        email,
      };
      await generatePdf(body);
      clearSearch(e);
    } catch (error) {
      console.log(error);
    } finally {
      setScrapingResult(null);
      setIsSendingPdf(false);
    }
  };

  const handleGenerateClick = async (selection: HitsEntity): Promise<void> => {
    try {
      setIsGeneratingPdf(true);
      setShowPdfPresentation(true);

      const body = {
        type: selection.type,
        artist: selection.result.primary_artist.name,
        album: selection.result.full_title,
        url: selection.result.url,
      };

      const res = await getPDFTemplate(body);
      setScrapingResult(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const [isResultsVisible, setResultsVisible] = useState(false);

  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4 mb-4">
        <form
          onSubmit={submit}
          className="flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg"
          autoComplete="off"
        >
          <input
            ref={inputRef}
            id="input"
            onChange={handlePrompt}
            type="text"
            value={prompt}
            placeholder="Type an album, song o artist..."
            className="h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0 focus:ring-0 transition-all duration-300"
            name="prompt"
            onClick={() => setResultsVisible(true)}
          />

          <button
            type="button"
            onClick={(e) => clearSearch(e)}
            className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus-visible:bg-white/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eraser"
            >
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
              <path d="M22 21H7" />
              <path d="m5 11 9 9" />
            </svg>
          </button>
        </form>
        {isResultsVisible && (
          <ul className="max-h-80 overflow-auto" style={{ margin: 0 }}>
            {relatedResults.map((r) => {
              return (
                <SuggestionItem
                  key={r.result.id}
                  result={r}
                  onClick={() => {
                    handleMusicSelection(r);
                    setResultsVisible(false);
                  }}
                />
              );
            })}
          </ul>
        )}
        <div className="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={includeAlbums}
            onChange={() => setIncludeAlbums((includeAlbums) => !includeAlbums)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Include albums
          </label>
        </div>
        {selectedResult && !isGeneratingPdf && (
          <SelectedResult
            data={selectedResult}
            userInfo={userInfo}
            handleGenerateClick={(selection) => handleGenerateClick(selection)}
          />
        )}

        {showPdfPresentation && <PdfPresentation data={scrapingResult} />}
        {!isGeneratingPdf && scrapingResult && (
          <form onSubmit={handleSendPdf}>
            <div className="grid w-full items-center gap-1.5 mb-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required={true}
                id="email"
                placeholder="brandon@gmail.com"
                onChange={(v) => setEmail(v.target.value)}
                value={email}
                type="email"
              />
            </div>
            <Button className="w-full" type="submit" disabled={isSendingPdf}>
              Send PDF
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
