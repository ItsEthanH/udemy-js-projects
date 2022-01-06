class Product {
  constructor(title, url, price, description) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = description;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookID, shouldRender = true) {
    this.hookID = renderHookID;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClass, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClass) {
      rootElement.className = cssClass;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookID).append(rootElement);
    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookID) {
    super(renderHookID, false);
    this.product = product;
    this.render();
  }

  render() {
    const productElement = this.createRootElement('li', 'product-item');

    productElement.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\£${this.product.price}<h3>
          <p>${this.product.description}</p>
          <button>Add to Basket</button>
      </div>
    `;

    const addToCartButton = productElement.querySelector('button');
    addToCartButton.addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    App.addProductToCart(this.product);
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookID) {
    super(renderHookID);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        'Nintendo Switch',
        'https://assets.newatlas.com/dims4/default/c147618/2147483647/strip/true/crop/5889x3926+112+0/resize/1200x800!/quality/90/?url=http:%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fswitch-precursors-10.jpg',
        199.99,
        'The newest Switch console, by Nintendo!'
      ),
      new Product(
        'Animal Crossing: New Horizons',
        'https://static.miraheze.org/awesomegameswiki/2/2c/AC-NH-Switch.jpg',
        39.99,
        'The best game ever!'
      ),
      new Product(
        'A Punnet of Raspberries',
        'https://aldprdproductimages.azureedge.net/media/resized/$Aldi_GB/ALL_RESIZED3/4088600081472_0_XL.png',
        1.24,
        'Handpicked.'
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const product of this.products) {
      new ProductItem(product, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: £${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (previousValue, currentItem) => previousValue + currentItem.price,
      0
    );

    return sum;
  }

  constructor(renderHookID) {
    super(renderHookID);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts() {
    console.log('Order placed. See items below...');
    console.log(this.items);
  }

  render() {
    const cartElement = this.createRootElement('section', 'cart');

    cartElement.innerHTML = `
    <h2>Total: £${0}</h2>
    <button>Order Now</button>
    `;
    this.totalOutput = cartElement.querySelector('h2');

    const orderButton = cartElement.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts.bind(this));
  }
}

class Shop extends Component {
  constructor() {
    super();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
