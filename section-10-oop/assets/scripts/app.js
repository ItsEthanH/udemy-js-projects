class Product {
  constructor(title, url, price, description) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = description;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const productElement = document.createElement('li');

    productElement.className = 'product-item';
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

    return productElement;
  }

  addToCart() {
    console.log(this.product);
  }
}

class ProductList {
  products = [
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
  ];

  render() {
    const renderedProductList = document.createElement('ul');
    renderedProductList.classList = 'product-list';

    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const productElement = productItem.render();
      renderedProductList.append(productElement);
    }
    return renderedProductList;
  }
}

class ShoppingCart {
  items = [];

  render() {
    const cartElement = document.createElement('section');

    cartElement.className = 'cart';
    cartElement.innerHTML = `
    <h2>Total: £${0}</h2>
    <button>Order Now</button>
    `;
    return cartElement;
  }
}

class Shop {
  render() {
    const productApp = document.getElementById('app');
    const productList = new ProductList();
    const cart = new ShoppingCart();

    const productListElement = productList.render();
    const cartElement = cart.render();

    productApp.append(cartElement);
    productApp.append(productListElement);
  }
}

const shop = new Shop();
shop.render();
