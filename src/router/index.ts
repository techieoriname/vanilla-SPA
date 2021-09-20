import { default as frontEndRoutes } from "./router";
import type { Route } from "../vite-env";

// Only this code and God knows what happened below
const pathToRegex = (path: string) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: { route: Route; result: RegExpMatchArray | null }) => {
  const values = match.result!.slice(1);

  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// navigate to next route (history mode)
const navigateTo = async (url: string | URL | null | undefined) => {
  history.pushState(null, "", url);
  await router();
};

const router = async () => {
  const routes: Array<Route> = [...frontEndRoutes];

  // Test each route for potential match
  const checkRouteMatch = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = checkRouteMatch.find((potentialMatch) => potentialMatch.result !== null);

  // fallback to "/" which is a potential 404 error page.
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const view = new match.route.view(getParams(match));

  const element = document.querySelector("#app") as HTMLElement;
  element.innerHTML = await view.getHtml();
};

// listen to popstate (history mode)
window.addEventListener("popstate", router);

// detect "data-link" added to a href tag and trigger router e.g <a href="/about" data-link>About</a>
document.addEventListener("DOMContentLoaded", async () => {
  document.body.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        if (e.target instanceof HTMLAnchorElement) {
          navigateTo(e.target.href);
        }
      }
    }
  });

  // call router
  await router();
});

export default router;
