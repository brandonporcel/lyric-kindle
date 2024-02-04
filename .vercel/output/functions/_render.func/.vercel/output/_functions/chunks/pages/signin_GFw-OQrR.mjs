import { s as supabase } from './callback_NWXbV-ns.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const provider = formData.get("provider")?.toString();
  if (provider) {
    const { data: data2, error: error2 } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "https://lyric-kindle.vercel.app/api/auth/callback"
      }
    });
    if (error2) {
      return new Response(error2.message, { status: 500 });
    }
    return redirect(data2.url);
  }
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    sameSite: "strict",
    path: "/",
    secure: true
  });
  cookies.set("sb-refresh-token", refresh_token, {
    sameSite: "strict",
    path: "/",
    secure: true
  });
  return redirect("/");
};

export { POST };
