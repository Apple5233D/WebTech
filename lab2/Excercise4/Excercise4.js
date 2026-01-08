const registrationForm = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearAllBtn = document.getElementById('clearAll');

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
        `;
        userList.appendChild(row);
    });
}

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Mobile number must be 10 digits");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert("Email already registered");
        return;
    }

    users.push({ name, email, mobile, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    registrationForm.reset();
    displayUsers();
});

window.deleteUser = function(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
};

clearAllBtn.addEventListener('click', () => {
    localStorage.removeItem('users');
    displayUsers();
});

displayUsers();