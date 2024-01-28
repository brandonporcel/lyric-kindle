import PdfPresentationHeader from "./PdfPresentationHeader";
import "../styles/components/pdfPresentation.css";
import type { ScrapingResponse } from "@/services/backend.service";

function PdfPresentation({ data }: { data: ScrapingResponse | null }) {
  console.log("data", data);
  return (
    <div className="borders isolate flex w-full flex-col flex-nowrap items-stretch gap-3 rounded-xl bg-white px-3 py-3 shadow-md ring-1 ring-gray-200">
      <PdfPresentationHeader data={data} />
      <div className="relative aspect-square overflow-hidden max-h-160">
        {(!data || !data.pdfPath) && (
          <div className="skeleton h-full w-full bg-gray-200 animate-ayo absolute inset-0"></div>
        )}
        {data && data.pdfPath && (
          <div className="relative">
            <div dangerouslySetInnerHTML={{ __html: data.pdfPath }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-1 pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfPresentation;
