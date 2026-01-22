const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const passwordInput = document.getElementById('password');
const skillsSection = document.getElementById('skillsSection');


roleSelect.addEventListener('change', (e) => {
    const role = e.target.value;

    skillsSection.style.display = (role === 'teacher') ? 'block' : 'none';
    validateForm(); 

const getValidationRules = (role) => {
    const rules = {
        student: { minLen: 6, regex: /.*/, age: 13 },
        teacher: { minLen: 8, regex: /\d/, age: 21 },
        admin: { minLen: 12, regex: /[!@#$%^&*]/, age: 25 }
    };
    return rules[role];
};
function validateForm() {
    const role = roleSelect.value;
    const rules = getValidationRules(role);
    const password = passwordInput.value;
    const email = document.getElementById('email').value;
    const age = parseInt(document.getElementById('age').value);
    
    let isValid = true;

    // Email Domain Check
    if (!email.includes('@') || email.split('@')[1].length < 3) {
        highlightError('email', true);
        isValid = false;
    } else {
        highlightError('email', false);
    }
    const isPassValid = password.length >= rules.minLen && rules.regex.test(password);
    highlightError('password', !isPassValid);
    document.getElementById('passwordFeedback').innerText = 
        isPassValid ? "" : `Required: ${rules.minLen} chars for ${role}s`;
    highlightError('age', age < rules.age);
    if (age < rules.age) isValid = false;

    return isValid && isPassValid;
}
function highlightError(id, isError) {
    const el = document.getElementById(id);
    el.style.borderColor = isError ? 'red' : '#ccc';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Registration Successful!");
    } else {
        alert("Please fix the errors highlighted in red.");
    }
});