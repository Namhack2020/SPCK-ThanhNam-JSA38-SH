function signUp(event){
    event.preventDefault()

    const username = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm_password').value

    if (username===''||email===''||password===''||confirmPassword===''){
        alert('Vui lòng nhập đầy đủ thông tin')
        return
    }
    if (password!==confirmPassword){
        alert('Mật khẩu không khớp')
        return
    }

    const emailPatern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    if (!email.match(emailPatern)){
        alert('Email không hợp lệ')
        return
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (users[email]) {
    alert("Email đã được đăng ký!");
    return;
    }

    users[email] = {
        username: username,
        email: email,
        password: password,
        cart: []
    };

    localStorage.setItem("users", JSON.stringify(users));
    
    alert('Đăng kí thành công')
    window.location.href = "../../pages/login.html"
}