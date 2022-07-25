class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
          background: rgba(0,0,0,0.75);
          z-index: 10;
        }

        :host([opened]) #backdrop {
          display: block;
        }
        
        :host([opened]) #modal {
          display: flex;
        }

        #modal {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          padding: 1rem;
          z-index: 100;
          background: white;
          border-radius: 3px;
          box-shadow: 0px 2px 8px rgba(0,0,0,0.25);

        }

        ::slotted(h1) {
          margin: 0;
          border-bottom: 1px solid #ccc
        }

        #main {
          padding: 1rem;
        }

        #actions {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #ccc;
          padding: 1rem;
        }

        #actions button {
          margin: 0 0.25rem;
          background: transparent;
          border: 2px solid #666;
          cursor: pointer;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title"></slot>
          </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel">Cancel</button>
          <button id="confirm">Confirm</button>
      </div>
    `;

    this.shadowRoot.getElementById('confirm').addEventListener('click', this._close.bind(this));
    this.shadowRoot.getElementById('cancel').addEventListener('click', this._close.bind(this));
    this.shadowRoot.getElementById('backdrop').addEventListener('click', this._close.bind(this));
  }

  open() {
    this.setAttribute('opened', '');
  }

  _close() {
    this.removeAttribute('opened');
  }
}

customElements.define('my-modal', Modal);
