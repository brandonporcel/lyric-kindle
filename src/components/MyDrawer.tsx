"use client";

import { Drawer } from "vaul";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export function MyDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 mt-24 flex min-h-[50%] flex-col rounded-t-[10px] bg-zinc-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300"></div>
            <div className="mx-auto max-w-md">
              <div>
                <h2 id="radix-:R6odaH1:" className="mb-2 text-xl font-medium">
                  Welcome to AI Emojis
                </h2>
                <p className="mb-6 text-base text-zinc-600">
                  Sign in for unlimited access, ability to save your emojis, and
                  access them from any device.
                </p>
                <div className="flex items-center justify-center sm:justify-start">
                  <Button className="w-full">
                    <Mail className="mr-2 h-4" />
                    Login with Google
                  </Button>
                </div>
                <p className="mt-3 text-center text-xs text-gray-400 sm:text-left">
                  By continuing you agree to our{" "}
                  <a
                    className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out"
                    target="_blank"
                    href="/privacy"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out"
                    target="_blank"
                    href="/terms"
                  >
                    Terms of Use
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
// "use client";

// import { Drawer } from "vaul";

// export function MyDrawer() {
//   return (
//     <Drawer.Root shouldScaleBackground>
//       <Drawer.Trigger>
//         <button>Open Drawer</button>
//       </Drawer.Trigger>
//       <Drawer.Portal>
//         <Drawer.Overlay className="fixed inset-0 bg-black/40" />
//         <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
//           <div className="p-4 bg-white rounded-t-[10px] flex-1">
//             <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
//             <div className="max-w-md mx-auto">
//               <Drawer.Title className="font-medium mb-4">
//                 Unstyled drawer for React.
//               </Drawer.Title>
//               <p className="text-zinc-600 mb-2">
//                 This component can be used as a replacement for a Dialog on
//                 mobile and tablet devices.
//               </p>
//               <p className="text-zinc-600 mb-8">
//                 It uses{" "}
//                 <a
//                   href="https://www.radix-ui.com/docs/primitives/components/dialog"
//                   className="underline"
//                   target="_blank"
//                 >
//                   Radix&apos;s Dialog primitive
//                 </a>{" "}
//                 under the hood and is inspired by{" "}
//                 <a
//                   href="https://twitter.com/devongovett/status/1674470185783402496"
//                   className="underline"
//                   target="_blank"
//                 >
//                   this tweet.
//                 </a>
//               </p>
//             </div>
//           </div>
//           <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
//             <div className="flex gap-6 justify-end max-w-md mx-auto">
//               <a
//                 className="text-xs text-zinc-600 flex items-center gap-0.25"
//                 href="https://github.com/emilkowalski/vaul"
//                 target="_blank"
//               >
//                 GitHub
//                 <svg
//                   fill="none"
//                   height="16"
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   width="16"
//                   aria-hidden="true"
//                   className="w-3 h-3 ml-1"
//                 >
//                   <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
//                   <path d="M15 3h6v6"></path>
//                   <path d="M10 14L21 3"></path>
//                 </svg>
//               </a>
//               <a
//                 className="text-xs text-zinc-600 flex items-center gap-0.25"
//                 href="https://twitter.com/emilkowalski_"
//                 target="_blank"
//               >
//                 Twitter
//                 <svg
//                   fill="none"
//                   height="16"
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   viewBox="0 0 24 24"
//                   width="16"
//                   aria-hidden="true"
//                   className="w-3 h-3 ml-1"
//                 >
//                   <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
//                   <path d="M15 3h6v6"></path>
//                   <path d="M10 14L21 3"></path>
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </Drawer.Content>
//       </Drawer.Portal>
//     </Drawer.Root>
//   );
// }
