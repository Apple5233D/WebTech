const usernameInput = document.getElementById('username');
const feedback = document.getElementById('feedback');
const loader = document.getElementById('loader');
const form = document.getElementById('registrationForm');

let isUsernameValid = false;

usernameInput.addEventListener('input', async () => {
    const username = usernameInput.value.trim();

    // Reset if empty
    if (username.length === 0) {
        feedback.textContent = "";
        loader.style.display = "none";
        return;
    }

    // Show loading spinner
    loader.style.display = "block";
    feedback.textContent = "";

    try {
        // Simulating network delay for realistic effect
        await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch('users.json');
        if (!response.ok) throw new Error("Could not fetch user data");
        
        const data = await response.json();
        const taken = data.takenUsernames.map(u => u.toLowerCase());

        if (taken.includes(username.toLowerCase())) {
            feedback.textContent = "✘ Username already taken";
            feedback.className = "feedback-msg taken";
            isUsernameValid = false;
        } else {
            feedback.textContent = "✔ Username available";
            feedback.className = "feedback-msg available";
            isUsernameValid = true;
        }
    } catch (error) {
        feedback.textContent = "Error connecting to server...";
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
});

// Prevent form submission
form.addEventListener('submit', (e) => {
    if (!isUsernameValid) {
        e.preventDefault();
        alert("Please choose a valid username before registering.");
    } else {
        alert("Registration successful!");
    }
});