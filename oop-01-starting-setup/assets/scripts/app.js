class Product {
  title = 'TITLE';
  imageUrl;
  price;
  description;

  constructor(title, url, price, description) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = description;
  }
}

const productList = {
  products: [
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
  ],
  render() {
    const productApp = document.getElementById('app');
    const renderedProductList = document.createElement('ul');
    renderedProductList.classList = 'product-list';

    for (const product of this.products) {
      const productElement = document.createElement('li');

      productElement.className = 'product-item';
      productElement.innerHTML = `
        <div>
          <img src="${product.imageUrl}" alt="${product.title}">
          <div class="product-item__content">
            <h2>${product.title}</h2>
            <h3>\£${product.price}<h3>
            <p>${product.description}</p>
            <button>Add to Basket</button>
        </div>
      `;
      renderedProductList.append(productElement);
    }
    productApp.append(renderedProductList);
  },
};

productList.render();
