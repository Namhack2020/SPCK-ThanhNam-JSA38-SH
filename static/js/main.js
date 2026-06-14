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
            <a href="pages/login.html"><img src="static/image/account.webp" /></a>
        `;
    }
};

function logout() {
    localStorage.removeItem("currentUser");
    alert("Bạn đã đăng xuất!");
    window.location.href = "pages/login.html";
}

document.querySelectorAll(".sidebar ul li").forEach(li => {
  li.addEventListener("mouseenter", () => {
    const targetId = li.getAttribute("data-target");
    if (targetId) {
      document.querySelectorAll(".submenu").forEach(sm => sm.classList.remove("show"));
      document.getElementById(targetId).classList.add("show");
    }
  });
  li.addEventListener("mouseleave", () => {
    const targetId = li.getAttribute("data-target");
    if (targetId) {
      document.getElementById(targetId).classList.remove("show");
    }
  });
});

function loadLaptops() {
  fetch("https://dummyjson.com/products/category/laptops")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("laptop-grid");
      container.innerHTML = data.products.map(p => `
        <div class="product-card">
          <a href="pages/product.html?id=${p.id}">
            <img src="${p.thumbnail}" alt="${p.title}" />
            <h3>${p.brand} ${p.title}</h3>
          </a>
        </div>
      `).join("");
    })
    .catch (error => {
      console.error("Error loading dummy laptops:", error);
      document.getElementById("product-grid").innerHTML =
        "<p>Không thể tải dữ liệu từ DummyJSON.</p>";
  });
}
function loadSmartphones() {
  fetch("https://dummyjson.com/products/category/Smartphones")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("smartphones-grid");
      container.innerHTML = data.products.map(p => `
       <div class="product-card">
         <a href="pages/product.html?id=${p.id}">
           <img src="${p.thumbnail}" alt="${p.title}" />
           <h3>${p.brand} ${p.title}</h3>
         </a>
       </div>
      `).join("");
    })
   .catch (error => {
    console.error("Error loading dummy smartphones:", error);
    document.getElementById("smartphones-grid").innerHTML =
      "<p>Không thể tải dữ liệu từ DummyJSON.</p>";
  });
}

loadLaptops();
loadSmartphones();