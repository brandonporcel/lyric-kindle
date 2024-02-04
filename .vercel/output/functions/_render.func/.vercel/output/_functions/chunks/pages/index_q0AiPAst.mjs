import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent } from '../astro_n4Z0p-XT.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { c as cn, $ as $$Layout } from './404_XGhipcPk.mjs';
/* empty css                              */
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Drawer } from 'vaul';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Mail } from 'lucide-react';
/* empty css                          */
import * as LabelPrimitive from '@radix-ui/react-label';

const GENIUS_SONG_URI = "https://api.genius.com";
const LASTFM_ALBUM_URI = `https://ws.audioscrobbler.com/2.0`;
const getRelatedSearch = async ({
  prompt,
  includeAlbums
}) => {
  try {
    const promptParam = prompt.toLocaleLowerCase().trim();
    const url = `${GENIUS_SONG_URI}/search`;
    const accessToken = "n5IUkpDwm248BpxIsv383hAkTDs3VkYX1J1bX210Ux9yreE2qLh_su1qDcd2FW8c";
    const params = {
      q: promptParam,
      access_token: accessToken
    };
    let parsedRelatedAlbums = [];
    if (includeAlbums) {
      const res = await getRelatedSearchAlbums(promptParam);
      const parsedRelatedResponse = parseMusicSuggestions(res);
      parsedRelatedAlbums = orderByFeaturings(parsedRelatedResponse);
    }
    const { data } = await axios.get(url, {
      params,
      headers: {
        Accept: "application/json"
      }
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
const getRelatedSearchAlbums = async (prompt) => {
  try {
    const url = `${LASTFM_ALBUM_URI}/`;
    const apiKey = "f0ad510d53e346996bede562a182ab55";
    const params = {
      method: "album.search",
      album: prompt,
      format: "json",
      api_key: apiKey,
      limit: 3
    };
    const { data } = await axios.get(url, {
      params,
      headers: {
        Accept: "application/json"
      }
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
const orderByFeaturings = (items) => {
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
const parseMusicSuggestions = (data) => {
  return data.map((el, i) => parseMusicSuggestion(el, i));
};
const parseMusicSuggestion = (suggestion, i) => {
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
      stats: void 0,
      release_date_components: void 0,
      primary_artist: {
        id: i,
        image_url: suggestion.image[2]["#text"],
        name: suggestion.artist,
        url: suggestion.url
      }
    }
  };
};

function SuggestionItem(params) {
  const { result } = params.result;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "a",
    {
      ...params,
      href: "#",
      className: "w-full mb-2 inline-flex px-2 py-2 items-center justify-start gap-4 text-base text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
      children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "rounded-full size-8",
            src: result.header_image_thumbnail_url ?? "https://play-lh.googleusercontent.com/e6-dZlTM-gJ2sFxFFs3X15O84HEv6jc9PQGgHtVTn7FP6lUXeEAkDl9v4RfVOwbSuQ",
            alt: result.full_title
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: result.full_title })
      ]
    }
  ) });
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

function MyDrawer({ children }) {
  return /* @__PURE__ */ jsxs(Drawer.Root, { children: [
    /* @__PURE__ */ jsx(Drawer.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(Drawer.Portal, { children: [
      /* @__PURE__ */ jsx(Drawer.Overlay, { className: "fixed inset-0 bg-black/40" }),
      /* @__PURE__ */ jsx(Drawer.Content, { className: "fixed bottom-0 left-0 right-0 z-40 mt-24 flex min-h-[50%] flex-col rounded-t-[10px] bg-zinc-100 outline-none", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-t-[10px] bg-white p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-md", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { id: "radix-:R6odaH1:", className: "mb-2 text-xl font-medium", children: "Welcome to lyrics kindle" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-base text-zinc-600", children: "Sign in for unlimited access, ability to save your pdfs, and more!" }),
          /* @__PURE__ */ jsx(
            "form",
            {
              action: "/api/auth/signin",
              method: "post",
              className: "flex items-center justify-center sm:justify-start",
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "w-full",
                  type: "submit",
                  value: "google",
                  name: "provider",
                  variant: "secondary",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "mr-2 h-4" }),
                    "Login with Google"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-center text-xs text-gray-400 sm:text-left", children: [
            "By continuing you agree to our",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out",
                target: "_blank",
                children: "Privacy Policy"
              }
            ),
            " ",
            "and",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out",
                target: "_blank",
                children: "Terms of Use"
              }
            )
          ] })
        ] }) })
      ] }) })
    ] })
  ] });
}

function SelectedResult(props) {
  const { data, handleGenerateClick, userInfo } = props;
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-4 m-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "w-24 h-24 mb-3 rounded-full shadow-lg md:mb-0 md:mr-4",
          src: data.result.primary_artist?.image_url,
          alt: "Bonnie image"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "capitalize bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300", children: data.type }),
        /* @__PURE__ */ jsx("h5", { className: "mb-1 text-xl font-medium text-gray-900 dark:text-white", children: data.result.primary_artist.name }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: data.result.title })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex mt-4 md:mt-2 w-full px-8", children: [
      userInfo && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleGenerateClick(data),
          className: "w-full items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
          children: "Generate"
        }
      ),
      !userInfo && /* @__PURE__ */ jsx(MyDrawer, { children: /* @__PURE__ */ jsx("button", { className: "w-full items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800", children: "Generate" }) })
    ] })
  ] });
}

function PdfPresentationHeader({}) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-row flex-nowrap items-center", children: [
    /* @__PURE__ */ jsx("p", { className: "truncate font-mono sm:text-sm", title: "cat", children: "lyrics" }),
    /* @__PURE__ */ jsx("span", { className: "inline-block w-full flex-1" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        "aria-hidden": "false",
        className: "flex flex-row flex-nowrap items-center gap-2 transition-opacity duration-200 ease-out opacity-100",
        children: [
          /* @__PURE__ */ jsxs("button", { className: "group relative inline-flex flex-shrink-0 items-center justify-center select-none truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium", children: [
            /* @__PURE__ */ jsxs("span", { className: "", children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Favorite song" }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "lucide lucide-heart shrink-0 fill-red-500 text-red-500",
                  children: /* @__PURE__ */ jsx("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out opacity-0",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "lucide lucide-loader2 animate-spin",
                    children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none",
              type: "button",
              id: "radix-:r3k:",
              "aria-haspopup": "menu",
              "aria-expanded": "false",
              "data-state": "closed",
              children: [
                /* @__PURE__ */ jsxs("span", { className: "", children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Share" }),
                  /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "lucide lucide-share shrink-0",
                      children: [
                        /* @__PURE__ */ jsx("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }),
                        /* @__PURE__ */ jsx("polyline", { points: "16 6 12 2 8 6" }),
                        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "2", y2: "15" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out opacity-0",
                    children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "lucide lucide-loader2 animate-spin",
                        children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none",
              type: "button",
              id: "radix-:r3m:",
              "aria-haspopup": "menu",
              "aria-expanded": "false",
              "data-state": "closed",
              children: [
                /* @__PURE__ */ jsxs("span", { className: "", children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More options" }),
                  /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "lucide lucide-more-horizontal shrink-0",
                      children: [
                        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1" }),
                        /* @__PURE__ */ jsx("circle", { cx: "19", cy: "12", r: "1" }),
                        /* @__PURE__ */ jsx("circle", { cx: "5", cy: "12", r: "1" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out opacity-0",
                    children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "lucide lucide-loader2 animate-spin",
                        children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}

function PdfPresentation({ data }) {
  return /* @__PURE__ */ jsxs("div", { className: "borders isolate flex w-full flex-col flex-nowrap items-stretch gap-3 rounded-xl bg-white px-3 py-3 shadow-md ring-1 ring-gray-200", children: [
    /* @__PURE__ */ jsx(PdfPresentationHeader, { data }),
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden max-h-160", children: [
      (!data || !data.pdfPath) && /* @__PURE__ */ jsx("div", { className: "skeleton h-full w-full bg-gray-200 animate-ayo absolute inset-0" }),
      data && data.pdfPath && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            id: "lyrics",
            dangerouslySetInnerHTML: { __html: data.pdfPath }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-1 pointer-events-none" })
      ] })
    ] })
  ] });
}

const BACKEND_BASE_URI = "https://kindle-genius-docker.onrender.com";
const getPDFTemplate = async ({
  url
}) => {
  try {
    const endpoint = `${BACKEND_BASE_URI}/scrape`;
    const body = {
      url
    };
    const { data } = await axios.post(endpoint, body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const generatePdf = async (body) => {
  try {
    const endpoint = `${BACKEND_BASE_URI}/generate-pdf`;
    const { data } = await axios.post(endpoint, body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        autoComplete: "true",
        className: cn(
          "flex h-10 w-full bg-gray-150 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

function Form({ userInfo }) {
  const [prompt, setPrompt] = useState("");
  const [includeAlbums, setIncludeAlbums] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showPdfPresentation, setShowPdfPresentation] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSendingPdf, setIsSendingPdf] = useState(false);
  const [email, setEmail] = useState("");
  const [scrapingResult, setScrapingResult] = useState(
    null
  );
  const [relatedResults, setRelatedResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  const handlePrompt = useCallback(
    (value) => {
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
  const searchRelatedMusic = async (value) => {
    if (value.length < 3) {
      return;
    }
    const body = { prompt: value, includeAlbums };
    const results = await getRelatedSearch(body);
    setRelatedResults(results);
  };
  function clearSearch(e) {
    e.preventDefault();
    setRelatedResults([]);
    setPrompt("");
    setSelectedResult(null);
    inputRef.current?.focus();
  }
  const handleMusicSelection = (result) => {
    setSelectedResult(result);
  };
  const submit = (e) => {
    e.preventDefault();
  };
  const handleSendPdf = async (e) => {
    e.preventDefault();
    if (!scrapingResult)
      return;
    try {
      setIsSendingPdf(true);
      const body = {
        template: scrapingResult.pdfPath,
        email
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
  const handleGenerateClick = async (selection) => {
    try {
      setIsGeneratingPdf(true);
      setShowPdfPresentation(true);
      const body = {
        type: selection.type,
        artist: selection.result.primary_artist.name,
        album: selection.result.full_title,
        url: selection.result.url
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
  const handleClickOutside = (e) => {
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
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4 mb-4", children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: submit,
        className: "flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg",
        autoComplete: "off",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              id: "input",
              onChange: handlePrompt,
              type: "text",
              value: prompt,
              placeholder: "Type an album, song o artist...",
              className: "h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0 focus:ring-0 transition-all duration-300",
              name: "prompt",
              onClick: () => setResultsVisible(true)
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: (e) => clearSearch(e),
              className: "flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus-visible:bg-white/25",
              children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "lucide lucide-eraser",
                  children: [
                    /* @__PURE__ */ jsx("path", { d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" }),
                    /* @__PURE__ */ jsx("path", { d: "M22 21H7" }),
                    /* @__PURE__ */ jsx("path", { d: "m5 11 9 9" })
                  ]
                }
              )
            }
          )
        ]
      }
    ),
    isResultsVisible && /* @__PURE__ */ jsx("ul", { className: "max-h-80 overflow-auto", style: { margin: 0 }, children: relatedResults.map((r) => {
      return /* @__PURE__ */ jsx(
        SuggestionItem,
        {
          result: r,
          onClick: () => {
            handleMusicSelection(r);
            setResultsVisible(false);
          }
        },
        r.result.id
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "default-checkbox",
          type: "checkbox",
          checked: includeAlbums,
          onChange: () => setIncludeAlbums((includeAlbums2) => !includeAlbums2),
          className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        }
      ),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "default-checkbox",
          className: "ms-2 text-sm font-medium text-gray-900 dark:text-gray-300",
          children: "Include albums"
        }
      )
    ] }),
    selectedResult && !isGeneratingPdf && /* @__PURE__ */ jsx(
      SelectedResult,
      {
        data: selectedResult,
        userInfo,
        handleGenerateClick: (selection) => handleGenerateClick(selection)
      }
    ),
    showPdfPresentation && /* @__PURE__ */ jsx(PdfPresentation, { data: scrapingResult }),
    !isGeneratingPdf && scrapingResult && /* @__PURE__ */ jsxs("form", { onSubmit: handleSendPdf, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid w-full items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            required: true,
            id: "email",
            placeholder: "brandon@gmail.com",
            onChange: (v) => setEmail(v.target.value),
            value: email,
            type: "email"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "w-full", type: "submit", disabled: isSendingPdf, children: "Send PDF" })
    ] })
  ] }) });
}

const $$Astro$1 = createAstro();
const $$Historial = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Historial;
  return renderTemplate`${maybeRenderHead()}<div class="duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4" data-astro-cid-6gloue5z> <div class="mb-4 flex flex-col flex-nowrap items-center justify-between gap-2 sm:flex-row sm:justify-center" data-astro-cid-6gloue5z> <h2 class="w-full text-left text-2xl font-semibold" data-astro-cid-6gloue5z>Recent pdf</h2><div class="relative w-full rounded-lg sm:max-w-[260px]" data-astro-cid-6gloue5z> ${renderComponent($$result, "Input", Input, { "placeholder": "Search...", "type": "text", "data-astro-cid-6gloue5z": true })} </div> </div> <ul class="grid w-full auto-rows-fr grid-cols-3 justify-items-stretch gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" data-astro-cid-6gloue5z> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> <li class="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden" data-astro-cid-6gloue5z> <img alt="ai generated emoji" loading="lazy" width="768" height="768" decoding="async" data-nimg="1" class="aspect-square w-full" src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png" style="color: transparent;" data-astro-cid-6gloue5z><span class="sr-only" data-astro-cid-6gloue5z>Red Supreme bag</span><a class="absolute inset-0 rounded-xl bg-black/[0.05] opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 focus:opacity-100" href="/p/TR8rvUKXr5" data-astro-cid-6gloue5z></a><div aria-hidden="true" class="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100" data-astro-cid-6gloue5z> <div class="skeleton h-full w-full bg-gray-200 animate-ayo relative" data-astro-cid-6gloue5z></div> </div> </li> </ul> </div> `;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/components/Historial.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userData } = Astro2.locals;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lyric Kindle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center py-[15vh] sm:py-[20vh]"> <h1 class="mb-3 text-4xl font-medium text-black duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
Generate PDF to your kindle
</h1><p class="mb-12 text-base text-gray-500 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
Enjoy music lyrics and expand knowledge
</p> ${renderComponent($$result2, "Form", Form, { "client:load": true, "userInfo": userData?.info, "client:component-hydration": "load", "client:component-path": "@/components/Form", "client:component-export": "default" })} </div> ${renderComponent($$result2, "Historial", $$Historial, {})} ` })}`;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/pages/index.astro", void 0);

const $$file = "C:/Users/brand/Nueva carpeta/lyric-kindle/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
