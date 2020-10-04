import React from "react";
import NavBar from "./NavBar";
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

it("Render Navbar COmponent", () => {
  act(() => {
    render(
      <Provider store={store}>
        <StaticRouter>
          <NavBar />
        </StaticRouter>
      </Provider>,
      container
    );
  });
  expect(container.querySelector("div")).not.toBeNull();
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<div class=\\"nav\\"><a style=\\"text-decoration: none;\\" href=\\"/\\">Github Profile Finder</a></div>"`
  );
});
