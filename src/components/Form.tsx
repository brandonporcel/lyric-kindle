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

export default function Form() {
  const [prompt, setPrompt] = useState("");
  const [relatedResults, setRelatedResults] = useState<HitsEntity[]>([]);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Limpia el timeout cuando el componente se desmonta o cuando se cambia el prompt
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

    const results = await getRelatedSearch(v);
    setRelatedResults(results);
  };

  function clearSearch(e: React.MouseEvent) {
    console.log("clear?");
    e.preventDefault();
    setRelatedResults([]);
    setPrompt("");
    inputRef.current?.focus();
  }

  const handleMusicSelection = (result: HitsEntity) => {};

  const submit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
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

        <ul className="h-80 overflow-y-auto">
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
      </div>
    </>
  );
}
