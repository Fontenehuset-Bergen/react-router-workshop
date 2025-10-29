import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("contact", "pages/contact/Page.tsx"),
  route("about", "pages/about/Page.tsx"),
   ...prefix("faq", [
    layout("components/layout/sidebar.tsx", [
      index("pages/faq/faqIndex.tsx"),
      route("react", "pages/faq/sections/react.tsx"),
      route("router", "pages/faq/sections/router.tsx"),
    ])
  ]), 
   ...prefix("contacts", [
    layout ("pages/contacts/contactLayout.tsx", [
      index ("pages/contacts/contactIndex.tsx"),
      route ("details/:id", "pages/contacts/contactPage.tsx"),
    ]),
  ]), 
  ...prefix("pokedex", [
    layout("pages/pokedex/PokedexLayout.tsx", [
      index("pages/pokedex/PokedexPage.tsx"),
      route("name","pages/pokedex/name/PokemonPage.tsx")
    ])
  ]),
  route("*", "not-found.tsx"),
] satisfies RouteConfig;
