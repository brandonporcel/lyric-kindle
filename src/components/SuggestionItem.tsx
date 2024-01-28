import type { HitsEntity } from "@/services/types/genius.service.types";
interface SuggestionItemParams {
  result: HitsEntity;
  onClick: () => void;
}

export default function SuggestionItem(params: SuggestionItemParams) {
  const { result } = params.result;
  return (
    <>
      <a
        {...params}
        href="#"
        className="w-full mb-2 inline-flex px-2 py-2 items-center justify-start gap-4 text-base text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <div>
          <img
            className="rounded-full size-8"
            src={
              result.header_image_thumbnail_url ??
              "https://play-lh.googleusercontent.com/e6-dZlTM-gJ2sFxFFs3X15O84HEv6jc9PQGgHtVTn7FP6lUXeEAkDl9v4RfVOwbSuQ"
            }
            alt={result.full_title}
          />
        </div>
        <span className="flex-1">{result.full_title}</span>
      </a>
    </>
  );
}
