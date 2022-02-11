const contents = document.querySelector('#contents');
const cart = document.querySelector('#cart');

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
    price.textContent = '$' + commaSep(products[val].price);
    desc.appendChild(price);
    product.appendChild(desc);

    const addBtn = document.createElement('button');
    addBtn.textContent = 'ADD CART';
    addBtn.addEventListener('click', () => {
      addBtnClickEvent(products[val].id);
      callToast();
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
  cartNumOutput();
};

const cartNumOutput = () => {
  let productsVal = 0;
  for (let val in cartArr) {
    productsVal += cartArr[val].quantity;
  }
  cartVal.textContent = productsVal < 100 ? productsVal : '99+';
  cart.appendChild(cartVal);
};

cart.addEventListener('click', () => {
  cartOutput();

  location.href = '#popup';
});

const cartOutput = () => {
  const popup = document.querySelector('#popupContent');
  const popupPrice = document.querySelector('#popupPrice');
  const popupDef = document.querySelector('#popupDef');
  popup.innerHTML = '';
  popupPrice.innerHTML = '';

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

      const img = document.createElement('img');
      img.src = exProduct.img;
      itemBox.appendChild(img);

      const productData = document.createElement('div');
      const name = document.createElement('span');
      name.textContent = exProduct.name;
      productData.appendChild(name);
      const price = document.createElement('h3');
      price.textContent = '$' + commaSep(exProduct.price);
      productData.appendChild(price);
      itemBox.appendChild(productData);

      if (cartArr[val].quantity < 10) {
        let selectList = document.createElement('select');
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
          cartArr[val].quantity = parseInt(e.currentTarget.value, 10);
          cartOutput();
          cartNumOutput();
        });
      } else {
        const itemVal = document.createElement('input');
        itemVal.setAttribute('type', 'tel');
        itemVal.setAttribute('maxlength', '3');
        itemVal.value = cartArr[val].quantity;
        itemVal.classList.add('popup__input-value');
        itemVal.addEventListener('focusout', () => {
          cartArr[val].quantity = parseInt(itemVal.value, 10);
          cartOutput();
          cartNumOutput();
        });
        itemBox.appendChild(itemVal);
      }

      const prices = document.createElement('h3');
      let calcPrice =
        Math.round(exProduct.price * 100 * cartArr[val].quantity) / 100;
      prices.textContent = '$' + commaSep(calcPrice);
      itemBox.appendChild(prices);
      totalPrice += calcPrice;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'delete';
      deleteBtn.addEventListener('click', () => {
        cartArr = cartArr.filter((item) => item.id !== cartArr[val].id);
        cartOutput();
        cartNumOutput();
      });
      itemBox.appendChild(deleteBtn);
      popup.appendChild(itemBox);
    }

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('popup__total-div');
    const totalTxt = document.createElement('span');
    totalTxt.textContent = 'Total';
    totalDiv.appendChild(totalTxt);
    const total = document.createElement('span');
    total.textContent = '$' + commaSep(Math.round(totalPrice * 100) / 100);
    totalDiv.appendChild(total);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'all delete';
    deleteBtn.addEventListener('click', () => {
      cartArr = [];
      cartOutput();
      cartNumOutput();
    });
    totalDiv.appendChild(deleteBtn);
    popupPrice.appendChild(totalDiv);
  }
};

const commaSep = (price) => {
  let s = String(price).split('.');
  let ret = String(s[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  if (s.length > 1) {
    ret += '.' + s[1];
  }
  return ret;
};

const callToast = () => {
  // Get the snackbar DIV
  let x = document.getElementById('snackbar');

  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => {
    x.className = x.className.replace('show', '');
  }, 3000);
};

const cartVal = document.createElement('span');
cartVal.classList.add('user-nav__value');
init();
