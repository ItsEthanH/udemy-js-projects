export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateElement = document.getElementById(contentId);
    this.modalTemplateElement = document.getElementById('modal-template');
  }

  show() {
    // browser support check
    if (!'content' in document.createElement('template')) {
      alert(this.fallbackText);
    }

    const modalTemplateElements = document.importNode(this.modalTemplateElement.content, true);
    const contentElement = document.importNode(this.contentTemplateElement.content, true);

    this.modalElement = modalTemplateElements.querySelector('.modal');
    this.backdropElement = modalTemplateElements.querySelector('.backdrop');
    this.modalElement.appendChild(contentElement);

    document.body.insertAdjacentElement('afterbegin', this.modalElement);
    document.body.insertAdjacentElement('afterbegin', this.backdropElement);
  }

  hide() {
    if (!this.modalElement || !this.backdropElement) {
      return;
    }
    document.body.removeChild(this.modalElement);
    document.body.removeChild(this.backdropElement);

    this.modalElement = null;
    this.backdropElement = null;
  }
}
