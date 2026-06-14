function login(event){
    event.preventDefault()

    const username = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email].password === password) {
        alert("Đăng nhập thành công! Xin chào " + users[email].username);

        localStorage.setItem("currentUser", email);

        window.location.href = "../index.html";
    } else {
        alert("Tên hoặc mật khẩu không đúng!");
    }
}