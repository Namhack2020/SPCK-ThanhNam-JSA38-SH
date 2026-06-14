
const currentUser = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users")) || {};

window.onload = function() {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    const accountDiv = document.querySelector(".account");

    if (currentUser && users[currentUser]) {
        accountDiv.innerHTML = `
            <span>Xin chào, ${users[currentUser].username}</span>
            <button onclick="logout()">Đăng xuất</button>
        `;
    } else {
        accountDiv.innerHTML = `
            <a href="pages/login.html"><img src="../static/image/account.webp " /></a>
        `;
    }
};

function logout() {
    localStorage.removeItem("currentUser");
    alert("Bạn đã đăng xuất!");
    window.location.href = "pages/login.html";
}


async function loadProductDetail(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

    document.getElementById("product-detail").innerHTML = `
    <h2>${product.brand} ${product.title}</h2>
    <div class="carousel" id="carousel">
      <button class="arrow left">&#10094;</button>
      <button class="arrow right">&#10095;</button>
    </div>
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <button onclick="addToCart(${product.id})" >Mua ngay</button>
  `;

  const carousel = document.getElementById("carousel");
  const leftBtn = carousel.querySelector(".arrow.left");
  const rightBtn = carousel.querySelector(".arrow.right");

  product.images.forEach((url, i) => {
    const img = document.createElement("img");
    img.src = url;
    if (i === 0) img.classList.add("active");
    carousel.insertBefore(img, leftBtn);
  });
  
  const images = carousel.querySelectorAll("img");
  let current = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  leftBtn.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  rightBtn.addEventListener("click", () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

}

// Example: get ID from query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
if (productId) {
  loadProductDetail(productId);
}

function addToCart (id){
  if (!currentUser){
    alert("Bạn chưa đăng nhập")
  }
  if (!users[currentUser].cart) {
    users[currentUser].cart = [];
  }

  fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(product => {
      let cart = users[currentUser].cart
      let exist = cart.find(item => item.id === product.id)
      if (exist){
        exist.quantity += 1
      }
      else{
        users[currentUser].cart.push({
        id: product.id,
        name: product.brand + " " + product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: 1
      });
      }
      
      localStorage.setItem("users", JSON.stringify(users));
      alert(`${product.title} đã được thêm vào giỏ hàng!`);
    })
    .catch(err => console.error("Lỗi khi thêm sản phẩm:", err));
}