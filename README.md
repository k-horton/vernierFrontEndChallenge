# Front End Development Challenge

A sample web application developed for Vernier

## Setup

Install dependencies:

```bash
npm i
```
To launch the web application using modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server), run the command

```bash
npm run serve
```
The application can be found at `http://localhost:8000`.

## Architecture

Vernier provided the `challenge-chart` files, as well as `challengeDataService.js`,
which can be found in the Components folder.

Components also holds `chart.js`, which processes and renders the chart & table data,
as well as `menu.js`, a simple menu component that can be opened and closed. Both
of these components are LitElements.

The root directory holds the `index.html` and `index.css` files, which make up
the rest of the application; the rest of the files are boilerplate code, mostly from
the [LitElement starter repo](https://github.com/PolymerLabs/lit-element-starter-js), which I used to set up the application.
