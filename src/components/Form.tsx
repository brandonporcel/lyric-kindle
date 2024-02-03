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

export default function Form() {
  const [prompt, setPrompt] = useState("");
  const [includeAlbums, setIncludeAlbums] = useState(true);
  const [selectedResult, setSelectedResult] = useState<HitsEntity | null>(null);
  const [showPdfPresentation, setShowPdfPresentation] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [email, setEmail] = useState("");
  const [scrapingResult, setScrapingResult] = useState<ScrapingResponse | null>(
    null
  );
  const [relatedResults, setRelatedResults] = useState<HitsEntity[]>([]);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

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

  const searchRelatedMusic = async (v: string) => {
    if (prompt.length < 3) {
      return;
    }

    const body = { prompt, includeAlbums };
    const results = await getRelatedSearch(body);
    setRelatedResults(results);
  };

  function clearSearch(e: React.MouseEvent) {
    e.preventDefault();
    setRelatedResults([]);
    setPrompt("");
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
      const template =
        '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>Kindle-Genius</title>\n    </head>\n    <body>\n      \n    <h1 font-size="medium" class="SongHeaderdesktop__Title-sc-1effuo1-8 fTHPLE"><span class="SongHeaderdesktop__HiddenMask-sc-1effuo1-11 iMpFIj">Sunny</span></h1><div data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">[Letra de “Sunny”]<br><br>[Verso 1]<br>Sunny, solo con mirarte sale el sol<br>Sunny, ni una sola nube entre tu y yo<br>Hoy empiezo a vivir, no me duele el dolor<br>Es que por fin, me llego el amor<br>Esa es la verdad, te quiero<br><br>[Coro]<br>Sunny, gracias por hacerme sonreír<br>Sunny, gracias por tus ganas de vivir<br>Por entender, por confiar<br>Por discutir, por perdonar<br>Por eso y mucho mas, te quiero<br><br>[Verso 2]<br>Sunny, has llegado siempre tan puntual<br>Sunny, cuando el corazón marchaba mal<br>Gracias a ti, hoy estoy aquí<br>Dejo al amor, hablar por mi<br>Esa es la verdad, te quiero<br><br>[Interludio Instrumental]<br><br>[Coro]<br>Por entender, por confiar<br>Por discutir, por perdonar<br>Por eso y mucho mas, te quiero<br></div><br><div data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">[Outro]<br>Sunny, gracias por hacerme tan feliz<br>Sunny, gracias por estar de nuevo aquí<br>Tu me has llevado sin pensar, a los limites del mar<br>Sunny, es la verdad, te quiero</div><br>\n  \n    </body>\n    </html>\n  ';
      const body = {
        // template: scrapingResult.pdfPath,
        template,
        email,
      };
      const res = await generatePdf(body);
      clearSearch(e);
    } catch (error) {
      console.log(error);
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
      const a = await 3;
      const template =
        '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>Kindle-Genius</title>\n    </head>\n    <body>\n      \n    <h1 font-size="medium" class="SongHeaderdesktop__Title-sc-1effuo1-8 fTHPLE"><span class="SongHeaderdesktop__HiddenMask-sc-1effuo1-11 iMpFIj">Sunnyyyyyyyyyyyyyyyyyyy</span></h1><div data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">[Letra de “Sunny”]<br><br>[Verso 1]<br>Sunny, solo con mirarte sale el sol<br>Sunny, ni una sola nube entre tu y yo<br>Hoy empiezo a vivir, no me duele el dolor<br>Es que por fin, me llego el amor<br>Esa es la verdad, te quiero<br><br>[Coro]<br>Sunny, gracias por hacerme sonreír<br>Sunny, gracias por tus ganas de vivir<br>Por entender, por confiar<br>Por discutir, por perdonar<br>Por eso y mucho mas, te quiero<br><br>[Verso 2]<br>Sunny, has llegado siempre tan puntual<br>Sunny, cuando el corazón marchaba mal<br>Gracias a ti, hoy estoy aquí<br>Dejo al amor, hablar por mi<br>Esa es la verdad, te quiero<br><br>[Interludio Instrumental]<br><br>[Coro]<br>Por entender, por confiar<br>Por discutir, por perdonar<br>Por eso y mucho mas, te quiero<br></div><br><div data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">[Outro]<br>Sunny, gracias por hacerme tan feliz<br>Sunny, gracias por estar de nuevo aquí<br>Tu me has llevado sin pensar, a los limites del mar<br>Sunny, es la verdad, te quiero</div><br>\n  \n    </body>\n    </html>\n  ';
      // const res = await getPDFTemplate(body);
      // setScrapingResult(res);

      setScrapingResult({
        pdfPath: template,
        success: true,
      });
      setIsGeneratingPdf(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

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
        <ul className="max-h-80 overflow-auto" style={{ margin: 0 }}>
          {relatedResults.map((r) => {
            return (
              <SuggestionItem
                key={r.result.id}
                result={r}
                onClick={() => handleMusicSelection(r)}
              />
            );
          })}
        </ul>
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
            <Button className="w-full" type="submit">
              Send PDF
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
