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
      width: 20%;
      height: 100%;
      background-color: #a3a3a3;
      padding: 10px;
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
      <div class="menu-container">
        ${menuContent}
        ${this.menuToggle}
        <div @click=${this._menuClick}>|||</div>
        <div class="menu-content">
          <div @click=${this._menuClick}>x</div>
          test
        </div>
      </div>
    `;
  }
}

window.customElements.define('challenge-menu', ChallengeMenu)
