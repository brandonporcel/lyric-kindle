import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://wxbtnvatxtrhmcfzebkn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4YnRudmF0eHRyaG1jZnplYmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5ODUwMTEsImV4cCI6MjAyMjU2MTAxMX0.uH64StGOVxjlkaxrrxqMdVVtFgf6pjTr7vRKTar6aVI",
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: true
    }
  }
);

const GET = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get("code");
  if (!authCode) {
    return new Response("No code provided", { status: 400 });
  }
  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    path: "/",
    secure: true,
    httpOnly: true
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    secure: true,
    httpOnly: true
  });
  return redirect("/");
};

const callback = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

export { callback as c, supabase as s };
