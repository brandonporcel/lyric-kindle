import type { HitsEntity } from "@/services/types/genius.service.types";

interface SelectedResultProps {
  data: HitsEntity;
  handleGenerateClick: (selection: HitsEntity) => void;
}

function SelectedResult(props: SelectedResultProps) {
  const { data, handleGenerateClick } = props;
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-4 m-auto">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg md:mb-0 md:mr-4"
          src={data.result.primary_artist?.image_url}
          alt="Bonnie image"
        />
        <div className="text-center md:text-left">
          <span className="capitalize bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {data.type}
          </span>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {data.result.primary_artist.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.result.title}
          </span>
        </div>
      </div>
      <div className="flex mt-4 md:mt-2 w-full px-8">
        <button
          onClick={() => handleGenerateClick(data)}
          className="w-full items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default SelectedResult;
