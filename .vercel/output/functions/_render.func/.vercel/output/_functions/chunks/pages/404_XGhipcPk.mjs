import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead, F as Fragment$1, f as addAttribute, g as renderHead, h as renderSlot } from '../astro_n4Z0p-XT.mjs';
import 'kleur/colors';
import 'html-escaper';
import { clsx } from 'clsx';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { ChevronRight, Check, Circle, User, CreditCard, Settings, LogOut } from 'lucide-react';
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge';
/* empty css                              */

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

function HeaderDropdown(props) {
  const {
    children,
    logged
  } = props;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { children }),
    logged && /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "My Account" }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
        /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx(User, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Profile" }),
          /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⇧⌘P" })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenuItem, { disabled: true, children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Billing" }),
          /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⌘B" })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "Settings" }),
          /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⌘S" })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/brandonporcel",
            target: "_blank",
            rel: "noopener",
            children: /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx("span", { children: "GitHub" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx("a", { href: "/api/auth/signout", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Log out" }),
        /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⇧⌘Q" })
      ] }) })
    ] }),
    !logged && /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/brandonporcel",
          target: "_blank",
          rel: "noopener",
          children: /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx("span", { children: "GitHub" }) })
        }
      ),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx("a", { href: "/signin", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
        /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Sign In" }),
        /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⇧⌘L" })
      ] }) })
    ] })
  ] }) });
}

const $$Astro$3 = createAstro();
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Profile;
  const { userData } = Astro2.locals;
  return renderTemplate`${!userData && renderTemplate`${renderComponent($$result, "HeaderDropdown", HeaderDropdown, { "client:load": true, "logged": false, "client:component-hydration": "load", "client:component-path": "C:/Users/brand/Nueva carpeta/lyric-kindle/src/components/HeaderDropdown", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<a href="" class="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 px-2.5 sm:px-2 py-2 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none"><span class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user shrink-0">${renderComponent($$result2, "Fragment", Fragment$1, {}, { "default": ($$result3) => renderTemplate`<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>` })}</svg></span></a>` })}`}${userData && renderTemplate`${renderComponent($$result, "HeaderDropdown", HeaderDropdown, { "client:load": true, "logged": true, "client:component-hydration": "load", "client:component-path": "C:/Users/brand/Nueva carpeta/lyric-kindle/src/components/HeaderDropdown", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate`<a class="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none p-1 sm:p-1"><span class=""><span class="relative flex shrink-0 overflow-hidden rounded-md h-7 w-7 sm:h-6 sm:w-6"><img class="aspect-square h-full w-full" alt="Profile Picture"${addAttribute(userData?.info.avatar_url, "src")}></span></span></a>` })}`}`;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/components/Profile.astro", void 0);

const $$Astro$2 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { userData } = Astro2.locals;
  return renderTemplate`${maybeRenderHead()}<header class="z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-stretch justify-between py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 px-4 sm:px-6"> <a class="flex flex-row flex-nowrap items-center justify-center gap-x-1.5 rounded-lg pr-1.5 text-lg font-medium leading-none text-black" href="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg><span>lyrics genius</span></a> <div class="flex flex-row flex-nowrap items-center gap-x-1.5"> ${renderComponent($$result, "Profile", $$Profile, { "userData": userData?.info })} </div> </header>`;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const description = "Lyrics Kindle-Genius app";
  const canonicalURL = new URL(Astro2.url).href;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Send album/song lyrics to kindle."><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="author" content="Brandon Porcel"><meta name="description"${addAttribute(description, "content")}><title>${title}</title><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalURL, "content")}><link rel="icon" href="https://images.emojiterra.com/twitter/v14.0/128px/1f5d2.png" type="image/png">${renderHead()}</head> <body> <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> ${renderComponent($$result, "Header", $$Header, {})} <main class="mx-auto flex min-h-screen max-w-5xl flex-col items-stretch pb-28 px-4 sm:px-6"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lyric Kindle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>404</p> ` })}`;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/pages/404.astro", void 0);

const $$file = "C:/Users/brand/Nueva carpeta/lyric-kindle/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _404 as _, cn as c };
