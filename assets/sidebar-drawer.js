class SidebarDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 100vw;
          display: none;
          z-index: 10000;
        }
        .backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          transition: opacity 0.3s;
        }
        .drawer {
          position: absolute;
          top: 0;
          right: 0;
          width: 550px;
          max-width: 100vw;
          height: 100vh;
          background: #fff;
          box-shadow: -2px 0 8px rgba(0,0,0,0.15);
          transform: translateX(100%);
          transition: transform 0.3s;
          will-change: transform;
          display: flex;
          flex-direction: column;
        }
        :host([open]) {
          display: block;
        }
        :host([open]) .drawer {
          transform: translateX(0);
        }
        :host([open]) .backdrop {
          opacity: 1;
          pointer-events: auto;
        }
      </style>
      <div class="backdrop"></div>
      <div class="drawer">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.backdrop').addEventListener('click', () => this.close());
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }
}

customElements.define('sidebar-drawer', SidebarDrawer);
