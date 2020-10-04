import React from "react";
import UserSearched from "./UserSearchPage";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import pretty from "pretty";
import { StaticRouter } from "react-router-dom";
import store from "../redux/store";

const user = {
  avatar_url: "https://avatars1.githubusercontent.com/u/24718507?v=4",
  bio: null,
  blog: "https://www.linkedin.com/in/aniketnagapure/",
  company: null,
  created_at: "2016-12-22T14:37:56Z",
  email: null,
  events_url: "https://api.github.com/users/NinjaAniket/events{/privacy}",
  followers: 4,
  followers_url: "https://api.github.com/users/NinjaAniket/followers",
  following: 17,
  following_url:
    "https://api.github.com/users/NinjaAniket/following{/other_user}",
  gists_url: "https://api.github.com/users/NinjaAniket/gists{/gist_id}",
  gravatar_id: "",
  hireable: true,
  html_url: "https://github.com/NinjaAniket",
  id: 24718507,
  location: "mumbai",
  login: "NinjaAniket",
  name: "Aniket",
  node_id: "MDQ6VXNlcjI0NzE4NTA3",
  organizations_url: "https://api.github.com/users/NinjaAniket/orgs",
  public_gists: 12,
  public_repos: 36,
  received_events_url:
    "https://api.github.com/users/NinjaAniket/received_events",
  repos_url: "https://api.github.com/users/NinjaAniket/repos",
  site_admin: false,
  starred_url:
    "https://api.github.com/users/NinjaAniket/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/NinjaAniket/subscriptions",
  twitter_username: null,
  type: "User",
  updated_at: "2020-09-28T09:46:09Z",
  url: "https://api.github.com/users/NinjaAniket",
};

const repos = [
  {
    html_url: "https://github.com/NinjaAniket/app-ideas",
    name: "app-ideas",
  },
];

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Render HomePage", () => {
  

  act(() => {
    render(
      <Provider store={store}>
        <StaticRouter>
          <UserSearched user={user} repos={repos} count={"5"} />
        </StaticRouter>
      </Provider>,
      container
    );
  });
  expect(container.querySelector("div").textContent).not.toBeNull();
  expect(container.querySelector("span").textContent).not.toBeNull();

  const span = document.querySelector("[data-testid=click]");
  expect(span.innerHTML).toBe("+");


  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <div class=\\"container\\">
        <h3>Aniket</h3><img style=\\"width: 6rem; height: 6rem;\\" src=\\"https://avatars1.githubusercontent.com/u/24718507?v=4\\" alt=\\"profile\\">
        <div>
          <div>
            <div style=\\"display: flex; margin-top: 0.5rem; width: 100%; justify-content: center;\\"><a href=\\"https://github.com/NinjaAniket/app-ideas\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">
                <div style=\\"width: 60vw;\\" class=\\"list-group-item\\">app-ideas</div>
              </a><span name=\\"list\\" style=\\"width: 2rem; height: 2rem; background-color: lightblue; margin-left: 0.5rem; text-align: centre;\\" data-testid=\\"click\\">+</span></div>
          </div>
        </div><button class=\\"no-focusborder\\" style=\\"text-decoration: none; width: 40px; background: rgb(13, 211, 255); border-radius: 25px; color: white; margin: 2px;\\" value=\\"1\\">1</button>
      </div>
    </div>"
  `);
});

