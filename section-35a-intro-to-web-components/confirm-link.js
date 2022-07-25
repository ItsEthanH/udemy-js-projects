class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
    this.innerHTML = `
      <style>
      a {
        margin: 1rem 0;
      }
      </style>
    `;
  }

  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('my-confirm-link', ConfirmLink, { extends: 'a' });
