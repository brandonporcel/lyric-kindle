import {
  useEffect,
  useState,
  type SyntheticEvent,
  type ChangeEvent,
} from "react";
import SuggestionItem from "./SuggestionItem";
import { getRelatedSearch } from "../services/genius.service";
export default function Form() {
  const [prompt, setPrompt] = useState("");

  const items = ["banana", "manzana", "pera", "naranja"];

  async function submit(e: any) {
    e.preventDefault();
  }

  const handlePrompt = (value: ChangeEvent<HTMLInputElement>) => {
    setPrompt(value.target.value);
    searchRelatedMusic();
  };

  const searchRelatedMusic = async () => {
    if (prompt.length < 3) {
      console.log("es menos q 3 ", prompt);
      return;
    }

    const hola = await getRelatedSearch(prompt);
    console.log(hola);
  };
  return (
    <>
      <SuggestionItem />
      <form
        onSubmit={submit}
        className="flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg"
        autoComplete="off"
      >
        <input
          id="input"
          onChange={handlePrompt}
          type="text"
          placeholder="Type an album, song o artist..."
          className="h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0 focus:ring-0 transition-all duration-300"
          name="prompt"
        />
        <button
          type="submit"
          aria-disabled="false"
          id="btttttb"
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
            className="lucide lucide-corner-down-left shrink-0 -ml-px"
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </button>
      </form>
    </>
  );
}
