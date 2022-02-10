const contents = document.querySelector('#contents');
const cart = document.querySelector('#cart');

const products = [
  {
    img: '../img/test1.jpg',
    name: 'zootie（ズーティー）：ヘビーウェイト デニム ルーズテーパードパンツ',
    price: '39.9',
    id: 1,
  },
  {
    img: '../img/test2.jpg',
    name: 'zootie（ズーティー）：ヘビーウェイト デニム ルーズテーパードパンツ',
    price: '39.9',
    id: 2,
  },
];

const init = () => {
  // products
  for (let val in products) {
    const product = document.createElement('div');
    product.classList.add('product');

    const img = document.createElement('img');
    img.src = products[val].img;
    product.appendChild(img);

    const desc = document.createElement('div');
    desc.classList.add('desc');

    const name = document.createElement('span');
    name.textContent = products[val].name;
    desc.appendChild(name);

    const price = document.createElement('h3');
    price.textContent = '$' + products[val].price;
    desc.appendChild(price);
    product.appendChild(desc);

    const addBtn = document.createElement('button');
    addBtn.textContent = 'ADD CART';
    addBtn.addEventListener('click', () => {
      addBtnClickEvent(products[val].id);
    });
    product.appendChild(addBtn);

    contents.appendChild(product);
  }
  cartNumOutput();
};

let cartArr = new Array();
const addBtnClickEvent = (itemId) => {
  // add cart
  if (cartArr.length === 0) {
    cartArr.push({ id: itemId, quantity: 1 });
  } else {
    const existingItem = cartArr.find((item) => item.id === itemId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartArr.push({ id: itemId, quantity: 1 });
    }
  }
  // console.log(cartArr);
  cartNumOutput();
};

const cartNumOutput = () => {
  // cart num
  let productsVal = 0;
  for (let val in cartArr) {
    productsVal += cartArr[val].quantity;
  }
  cartVal.textContent = productsVal;
  cart.appendChild(cartVal);
};

cart.addEventListener('click', () => {
  cartOutput();

  location.href = '#popup';
});

const cartOutput = () => {
  console.log('cart click');
  const popup = document.querySelector('#popupContent');
  const popupDef = document.querySelector('#popupDef');
  popup.innerHTML = '';
  // refer to cart
  if (cartArr.length === 0) {
    // nothing
    popupDef.classList.remove('hide');
  } else {
    popupDef.classList.add('hide');
    let totalPrice = 0;
    for (let val in cartArr) {
      const exProduct = products.find((item) => item.id === cartArr[val].id);

      const itemBox = document.createElement('div');
      itemBox.classList.add('popup__item-box');

      const checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('name', 'check');
      checkBox.setAttribute('checked', 'checked');
      itemBox.appendChild(checkBox);

      const img = document.createElement('img');
      img.src = exProduct.img;
      itemBox.appendChild(img);

      const productData = document.createElement('div');
      const name = document.createElement('span');
      name.textContent = exProduct.name;
      productData.appendChild(name);
      const price = document.createElement('h3');
      price.textContent = '$' + exProduct.price;
      productData.appendChild(price);
      itemBox.appendChild(productData);

      // const value = document.createElement('span');
      // value.textContent = cartArr[val].quantity;
      // itemBox.appendChild(value);
      let selectList = document.createElement('select');
      // selectList.id = 'selectList';
      //Create and append the options
      for (let i = 0; i < 11; i++) {
        let option = document.createElement('option');
        option.value = i;
        if (i === 10) option.text = '10+';
        else option.text = i;
        if (i === cartArr[val].quantity) option.selected = true;
        selectList.appendChild(option);
      }
      itemBox.appendChild(selectList);
      selectList.addEventListener('change', (e) => {
        console.log('change', parseInt(e.currentTarget.value, 10));
        cartArr[val].quantity = parseInt(e.currentTarget.value, 10);
        cartOutput();
        cartNumOutput();
      });

      const prices = document.createElement('h3');
      let calcPrice =
        Math.round(exProduct.price * 100 * cartArr[val].quantity) / 100;
      prices.textContent = '$' + calcPrice;
      itemBox.appendChild(prices);
      totalPrice += calcPrice;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'delete';
      deleteBtn.addEventListener('click', function () {
        cartArr = cartArr.filter((item) => item.id !== cartArr[val].id);
        cartOutput();
        cartNumOutput();
      });
      itemBox.appendChild(deleteBtn);
      popup.appendChild(itemBox);
    }
    console.log(totalPrice);
    console.log(Math.round(totalPrice * 100) / 100);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('popup__total-div');
    const totalTxt = document.createElement('span');
    totalTxt.textContent = 'Total';
    totalDiv.appendChild(totalTxt);
    const total = document.createElement('span');
    total.textContent = '$' + Math.round(totalPrice * 100) / 100;
    totalDiv.appendChild(total);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'all delete';
    deleteBtn.addEventListener('click', () => {
      cartArr = [];
      cartOutput();
      cartNumOutput();
    });
    totalDiv.appendChild(deleteBtn);
    popup.appendChild(totalDiv);
  }
};

// cart value
const cartVal = document.createElement('span');
cartVal.classList.add('user-nav__value');
init();
