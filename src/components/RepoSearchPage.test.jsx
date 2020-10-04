import React from "react";
import RepoSearch from "./RepoSearchPage";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import pretty from "pretty";
import { StaticRouter } from "react-router-dom";
import store from "../redux/store";

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
  const repos = [
    {
      html_url: "https://github.com/NinjaAniket/app-ideas",
      name: "app-ideas",
    },
  ];

  act(() => {
    render(
      <Provider store={store}>
        <StaticRouter>
          <RepoSearch reponame={"cinemeye"} repos={repos} rcount={"5"} />
        </StaticRouter>
      </Provider>,
      container
    );
  });
  expect(container.querySelector("div").textContent).not.toBeNull();
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <div class=\\"container\\">
        <h3>
          <div>
            <div>
              <div style=\\"display: flex; margin-top: 0.5rem; width: 100%; justify-content: center;\\"><a href=\\"https://github.com/NinjaAniket/app-ideas\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">
                  <div style=\\"width: 60vw;\\" class=\\"list-group-item\\">app-ideas</div>
                </a><span name=\\"list\\" style=\\"width: 2rem; height: 2rem; background-color: lightblue; margin-left: 0.5rem; text-align: centre;\\">+</span></div>
            </div>
          </div>
        </h3><button class=\\"no-focusborder\\" style=\\"text-decoration: none; width: 40px; background: rgb(13, 211, 255); border-radius: 25px; color: white; margin: 2px;\\" value=\\"1\\">1</button>
      </div>
    </div>"
  `);
});
