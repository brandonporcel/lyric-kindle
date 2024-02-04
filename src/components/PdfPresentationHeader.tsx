import type { ScrapingResponse } from "@/services/backend.service";

function PdfPresentationHeader({ data }: { data: ScrapingResponse | null }) {
  return (
    <div className="relative flex flex-row flex-nowrap items-center">
      <p className="truncate font-mono sm:text-sm" title="cat">
        lyrics
      </p>
      <span className="inline-block w-full flex-1"></span>
      <div
        aria-hidden="false"
        className="flex flex-row flex-nowrap items-center gap-2 transition-opacity duration-200 ease-out opacity-100"
      >
        <button className="group relative inline-flex flex-shrink-0 items-center justify-center select-none truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium">
          <span className="">
            <span className="sr-only">Favorite song</span>
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
              className="lucide lucide-heart shrink-0 fill-red-500 text-red-500"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out opacity-0"
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
              className="lucide lucide-loader2 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </span>
        </button>
        <button
          className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none"
          type="button"
          id="radix-:r3k:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <span className="">
            <span className="sr-only">Share</span>
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
              className="lucide lucide-share shrink-0"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" x2="12" y1="2" y2="15"></line>
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out opacity-0"
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
              className="lucide lucide-loader2 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </span>
        </button>
        <button
          className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none"
          type="button"
          id="radix-:r3m:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <span className="">
            <span className="sr-only">More options</span>
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
              className="lucide lucide-more-horizontal shrink-0"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out opacity-0"
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
              className="lucide lucide-loader2 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default PdfPresentationHeader;
