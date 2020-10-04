import React from "react";
import HomePage from "./HomePage";
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
  act(() => {
    render(
      <Provider store={store}>
        <StaticRouter>
          <HomePage />
        </StaticRouter>
      </Provider>,
      container
    );
  });
  expect(container.querySelector("div").textContent).not.toBeNull();

  act(() => {
    render(
      <Provider store={store}>
        <StaticRouter>
          <HomePage />
        </StaticRouter>
      </Provider>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"main-home\\"><a href=\\"/search\\"><button style=\\"float: right; margin-right: 3rem;\\" type=\\"button\\" class=\\"btn btn-dark\\">Add Repo</button> </a>
      <div class=\\"container\\">
        <div style=\\"display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 2rem;\\">
          <h2>Kem chho</h2>
        </div>
      </div>
    </div>"
  `);
});
