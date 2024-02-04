import { s as supabase } from './callback_NWXbV-ns.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }
  const { error } = await supabase.auth.signUp({
    email,
    password
  });
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  return redirect("/signin");
};

export { POST };
