# Front End Development Challenge

A sample web application developed for Vernier that pulls sets of data from a provided API and displays them on a graph.

## Setup

To set up the application, first install dependencies:

```bash
npm i
```
To launch, run the command:

```bash
npm run serve
```
The application can then be found running at `http://localhost:8000`.

## Architecture

Vernier provided the `challenge-chart` files, as well as `challengeDataService.js`,
which can be found in the Components folder.

Components also holds `chart.js`, which processes and renders the chart & table data,
as well as `menu.js`, a simple menu component that can be opened and closed. Both
of these components are LitElements.

The root directory holds the `index.html` and `index.css` files, which make up
the rest of the application; the rest of the files are boilerplate code, mostly from
the [LitElement starter repo](https://github.com/PolymerLabs/lit-element-starter-js), which I used to set up the application.

## Resources Used

* [@web/dev-server](https://www.npmjs.com/package/@web/dev-server)
* [LitElement starter repo](https://github.com/PolymerLabs/lit-element-starter-js) & its included libraries
* [Bootstrap](https://getbootstrap.com/) - buttons
* [Font Awesome](https://fontawesome.com/) - misc. icons
