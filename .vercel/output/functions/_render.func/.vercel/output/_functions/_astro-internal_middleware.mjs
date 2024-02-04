import { d as defineMiddleware, s as sequence } from './chunks/index_3oMVQtq9.mjs';
import { s as supabase } from './chunks/pages/callback_NWXbV-ns.mjs';
import micromatch from 'micromatch';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_n4Z0p-XT.mjs';
import 'cookie';

const protectedRoutes = ["/dashboard(|/)"];
const redirectRoutes = ["/signin(|/)", "/register(|/)"];
const onRequest$1 = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    const isProtectedRoute = micromatch.isMatch(url.pathname, protectedRoutes);
    const isHomeRoute = micromatch.isMatch(url.pathname, "/");
    const isRedirectRoute = micromatch.isMatch(url.pathname, redirectRoutes);
    if (isProtectedRoute || isHomeRoute) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");
      if (!accessToken || !refreshToken) {
        return isHomeRoute ? next() : redirect("signin");
      }
      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value
      });
      if (error) {
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
        return redirect("/signin");
      }
      locals.userData = { info: data.user?.user_metadata };
      cookies.set("sb-access-token", data?.session?.access_token, {
        sameSite: "strict",
        path: "/",
        secure: true
      });
      cookies.set("sb-refresh-token", data?.session?.refresh_token, {
        sameSite: "strict",
        path: "/",
        secure: true
      });
    }
    if (isRedirectRoute) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");
      if (accessToken && refreshToken) {
        return redirect("/dashboard");
      }
    }
    return next();
  }
);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
