class Tooltip extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = this.getAttribute('text');
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          top: 2rem;
          z-index: 10;
          padding: 0.2rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgb(0,0,0,0.6);
        }

        .icon {
          background-color: black;
          color: white;
          padding: 0.25rem;
          border-radius: 1rem;
          cursor: help;
        }

        ::slotted(.bold) {
          padding: 0.5rem;
          background: var(--clr-primary, lightblue)
        }

        :host {
          position: relative;
        }
      </style>
      
      <slot></slot>
      <span class="icon">?</span>
    `;
  }
  // notes on styling custom elements:
  // 1) :host can be used to style the tooltip element from within the component file.
  // 2) :host(.classname) can be used to apply styles when .classname is applied (e.g programmatically).
  // 3) :host-context(div) can be used to determine styles based on what the parent is to the host element.

  static get observedAttributes() {
    return ['text'];
  }

  connectedCallback() {
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipText = this.getAttribute('text');

    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('my-tooltip', Tooltip);
