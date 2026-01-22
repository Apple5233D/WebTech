
let currentStep = 1;
const totalSteps = 4;
let formData = {
    name: "",
    phone: "",
    city: "",
    pin: ""
};

const form = document.getElementById('workflowForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const stepTitle = document.getElementById('stepTitle');


nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        if (validateStage(currentStep)) {
            navigateTo(currentStep + 1);
        }
    } else {
        if (validateStage(4)) {
            alert("Registration Complete for " + formData.name + " in " + formData.city);
            console.log("Final Data Submitted:", formData);
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        navigateTo(currentStep - 1);
    }
});

function navigateTo(targetStep) {
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep = targetStep;
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    
    updateProgressUI();
}

function validateStage(step) {
    let isValid = true;
    document.querySelectorAll('.error').forEach(e => e.style.display = 'none');

    if (step === 1) {
        const nameVal = document.getElementById('fullName').value.trim();
        if (nameVal.length < 3) {
            document.getElementById('err-fullName').style.display = 'block';
            isValid = false;
        }
        formData.name = nameVal;
    }

    if (step === 2) {
        const phoneVal = document.getElementById('phone').value.trim();
        const phoneRegex = /^[6-9]\d{9}$/; 
        if (!phoneRegex.test(phoneVal)) {
            document.getElementById('err-phone').style.display = 'block';
            isValid = false;
        }
        formData.phone = phoneVal;
    }

    if (step === 3) {
        const cityVal = document.getElementById('city').value.trim();
        if (cityVal === "") {
            document.getElementById('err-city').style.display = 'block';
            isValid = false;
        }
        formData.city = cityVal;
    }

    if (step === 4) {
        const pinVal = document.getElementById('pin').value.trim();
        if (!/^\d{4}$/.test(pinVal)) {
            document.getElementById('err-pin').style.display = 'block';
            isValid = false;
        }
        formData.pin = pinVal;
    }

    return isValid;
}


function updateProgressUI() {

    const percent = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${percent}%`;
    prevBtn.disabled = (currentStep === 1);
    
    if (currentStep === totalSteps) {
        nextBtn.innerText = "Finish";
        nextBtn.style.background = "var(--success)";
        renderSummary();
    } else {
        nextBtn.innerText = "Next";
        nextBtn.style.background = "var(--primary)";
    }
    const titles = ["Personal Info", "Contact Details", "Location", "Final Review"];
    stepTitle.innerText = `Step ${currentStep}: ${titles[currentStep - 1]}`;
}

function renderSummary() {
    const summaryArea = document.getElementById('reviewArea');
    summaryArea.innerHTML = `
        <div class="summary-box">
            <strong>Confirm Details:</strong><br>
            Name: ${formData.name}<br>
            Phone: ${formData.phone}<br>
            City: ${formData.city}
        </div>
    `;
}