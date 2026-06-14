const currentUser = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users")) || {};


if (currentUser && users[currentUser]) {
  document.querySelector(".account").innerHTML =
    `Xin chào, ${users[currentUser].username} <button onclick="logout()">Đăng xuất</button>`;
} else {
  document.querySelector(".account").innerHTML =
    `<a href="login.html"><img src="../static/image/account.webp" /></a>`;
}

function logout() {
    localStorage.removeItem("currentUser");
    alert("Bạn đã đăng xuất!");
    window.location.href = "login.html";
}

let total = 0;
function loadCart(){
  let container = document.getElementById('cart')
  if (!currentUser || !users[currentUser]) {
      container.innerHTML = "<p>Bạn chưa đăng nhập!</p>";
      return;
  }

  let cart = users[currentUser].cart || []
  let html="";
  let total = 0;

  if (cart.length===0){
    total=0;
    container.innerHTML="<p>Giỏ hàng trống</p>"
    document.querySelector('.total strong').textContent =
    `Tổng (${cart.length} sản phẩm): $${total.toLocaleString()}`;
    return
  }

  cart.forEach((item,index) =>{
      total+=item.price
      html+= `
      <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="item-img" />
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>Giá: $${item.price.toLocaleString()}</p>
        <p>Số lượng: ${item.quantity}</p>
        <button onclick="removeFromCart(${index})">Xóa</button>
      </div>
    </div>
    `
  })
  container.innerHTML = html
  document.querySelector('.total strong').textContent =
  `Tổng (${cart.length} sản phẩm): $${total.toLocaleString()}`;
}


function removeFromCart(index){
  let cart = users[currentUser].cart;
  let currentQuantity = cart[index].quantity;
  let quantity = parseInt(prompt(`Sản phẩm hiện có ${currentQuantity}. Nhập số lượng muốn xóa:`));
  if (isNaN(quantity) || quantity <= 0) return
  if (quantity < currentQuantity) {
    cart[index].quantity -= quantity;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("users", JSON.stringify(users));
  loadCart()
  console.log(users[currentUser].cart)
}
loadCart()