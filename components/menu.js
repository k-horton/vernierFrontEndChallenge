import {LitElement, html, css} from 'lit';

const menuContent = html`
  <style>
    .menu-container {
      position: inline;
    }

    .menu-content {
      position: fixed;
      top: 0;
      transition: .5s;
      min-width: 250px;
      width: 25%;
      height: 100%;
      background-color: #007377; /* primary-color */
      box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.2);
    }

    #toggle {
      height: 30px;
      width: 30px;
      position: absolute;
      top: 0;
      left: 0;
      margin: 15px;
    }

    .close {
      position: absolute;
      left: 0;
      font-size: 24pt;
      margin: 10px;
      color: #ffffff;
    }

    #links {
      padding-top: 25%;
    }

    .link {
      padding: 15px;
      margin: 0;
    }

    .link:hover {
      background: #f79b2e;
    }

    .link a {
      font-size: 24pt;
      text-decoration: none;
      color: #ffffff;
    }
  </style>
`;
const openMenu = html`
  <style> .menu-content { left: 0; } </style>
`;
const closedMenu = html`
  <style> .menu-content { left: -100%; } </style>
`;

export class ChallengeMenu extends LitElement {
  static get properties() {
    return {
      /**
       * Whether the menu is open.
       */
      open: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.menuToggle = closedMenu;
  }

  _menuClick() {
    if (this.menuToggle == openMenu) {
      this.menuToggle = closedMenu;
    } else {
      this.menuToggle = openMenu;
    }
    // force update to reflect property change
    this.requestUpdate();
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

      <div class="menu-container">
        ${menuContent}
        ${this.menuToggle}
        <span id="toggle" @click=${this._menuClick}></span>
        <div class="menu-content">
          <button type="button" class="close" aria-label="Close" @click=${this._menuClick}>
          <span aria-hidden="true">&times;</span></button>
          <div id="links">
            <div class="link"><a href="http://www.vernier.com/">Vernier - Home</a></div>
            <div class="link"><a href="http://www.vernier.com/ideas/">Ideas</a></div>
            <div class="link"><a href="http://www.vernier.com/products/">Products</a></div>
            <div class="link"><a href="http://www.vernier.com/training/">Educator Training</a></div>
            <div class="link"><a href="http://www.vernier.com/caliper/">The Caliper</a></div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('challenge-menu', ChallengeMenu)
