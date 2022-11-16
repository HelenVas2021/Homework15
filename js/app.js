function showCategories() {
  const container = document.querySelector('.categories');

  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = data[i].name;
    elem.setAttribute('data-category', i);
    elem.addEventListener('click', showProducts);
    container.appendChild(elem);
  }
}

// handler of click on categories
function showProducts(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const products = data[categoryIndex].products;
  const container = document.querySelector('.products');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = products[i].name;
    elem.setAttribute('data-product', i);
    elem.setAttribute('data-category', categoryIndex);
    elem.addEventListener('click', showDetails);
    container.appendChild(elem);
  }

}

function showDetails(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const container = document.querySelector('.details');
  container.innerHTML = '';
  const elemPrice = document.createElement('div');
  const elemDescr = document.createElement('div');
  const buttonFinish = document.createElement('button');
  elemPrice.textContent = data[categoryIndex].products[productIndex].price;
  elemDescr.textContent = data[categoryIndex].products[productIndex].description;
  container.appendChild(elemPrice);
  container.appendChild(elemDescr);
  container.appendChild(buttonFinish);
  buttonFinish.textContent = 'Buy';
  buttonFinish.setAttribute("id", "button")
  buttonFinish.addEventListener('click', showForm);
  buttonFinish.setAttribute('data-category', categoryIndex);
  buttonFinish.setAttribute('data-product', productIndex);

}

// function showConfirm(event) {
//   const container = document.querySelector('.products');
//   const containerDetail = document.querySelector('.details');
//   alert("Congratulations!!!");
//   container.innerHTML = '';
//   containerDetail.innerHTML = '';
// }

function showForm(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  let container = document.querySelector('.container');
  let finishForm = document.getElementById('userForm');
  const button = document.getElementById('btn');
  container.className = "hidden";
  finishForm.className = "view";
  button.addEventListener('click', collectInfo);
  button.setAttribute('data-category', categoryIndex);
  button.setAttribute('data-product', productIndex);
}

function collectInfo(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const userInfo = {
    nameProduct: data[categoryIndex].products[productIndex].name,
    priceProduct: data[categoryIndex].products[productIndex].price,
    descriptionProduct: data[categoryIndex].products[productIndex].description,
    fullName: document.forms[0].elements.fullName.value,
    city: document.forms[0].elements.City.value,
    department: document.forms[0].elements.department.value,
    payment: document.forms[0].elements.payment.value,
    count: document.forms[0].elements.count.value,
    addInfo: document.forms[0].elements.addInfo.value,
  }

  checkInfo(userInfo);
}

function checkInfo(userInfo) {
  let finishForm = document.getElementById('userForm');
  const result = document.getElementById('result');
  let isError = false;

  if (!isNumberValid(userInfo.count)) {
    isError = true;
    document.forms[0].elements.count.setAttribute('class', 'invalid');
    alert('Change you Quantity products');
  }
  if (!isString(userInfo.fullName)) {
    isError = true;
    document.forms[0].elements.fullName.setAttribute('class', 'invalid');
    alert('Change you FullName');
  }
  if (!isString(userInfo.department)) {
    isError = true;
    document.forms[0].elements.department.setAttribute('class', 'invalid');
    alert('Change you department');
  }
  if (isError) {
    return;
  }
  for (key in userInfo) {
    let showFinishInfo = document.createElement('div');
    showFinishInfo.textContent += userInfo[key];
    result.appendChild(showFinishInfo);
  }
  finishForm.className = "hidden";
}



function isNumberValid(value) {
  if (value > 0) {
    return true;
  }
  return false;
}
function isString(value) {
  if (value === null || isNaN(value)) {
    return true;
  }
  return false;
}

showCategories();
