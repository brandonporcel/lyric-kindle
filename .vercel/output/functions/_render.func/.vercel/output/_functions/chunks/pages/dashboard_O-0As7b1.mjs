import { c as createAstro, d as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../astro_n4Z0p-XT.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { $ as $$Layout } from './404_XGhipcPk.mjs';
/* empty css                              */

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const { userData } = Astro2.locals;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lyric Kindle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Private Route</p> <p>Hi, ${userData.info?.full_name}</p> ` })}`;
}, "C:/Users/brand/Nueva carpeta/lyric-kindle/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/brand/Nueva carpeta/lyric-kindle/src/pages/dashboard.astro";
const $$url = "/dashboard";

export { $$Dashboard as default, $$file as file, $$url as url };
