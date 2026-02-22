
let students = [
    { id: "S10", name: "Mark ", dept: "CS", marks: 85 },
    { id: "S11", name: "Deva", dept: "EE", marks: 72 }
];

const form = document.getElementById('studentForm');
const studentBody = document.getElementById('studentBody');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');


function fetchStudents() {
    studentBody.innerHTML = "";
    students.forEach((student, index) => {
        studentBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dept}</td>
                <td>${student.marks}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="prepareEdit(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentData = {
        id: document.getElementById('studentId').value,
        name: document.getElementById('studentName').value,
        dept: document.getElementById('dept').value,
        marks: document.getElementById('marks').value
    };

    const editIndex = document.getElementById('editIndex').value;

    // Simulate AJAX Request
    showStatus("Processing...", "info");
    
    setTimeout(() => {
        if (editIndex === "") {
            // CREATE logic
            students.push(studentData);
            showStatus("Student Added Successfully!", "success");
        } else {
            // UPDATE logic
            students[editIndex] = studentData;
            showStatus("Student Updated Successfully!", "success");
            resetForm();
        }
        fetchStudents();
        form.reset();
    }, 500);
});

// --- DELETE ---
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        showStatus("Record Deleted", "danger");
        fetchStudents();
    }
}

// --- Helper: Prepare for Edit ---
function prepareEdit(index) {
    const s = students[index];
    document.getElementById('studentId').value = s.id;
    document.getElementById('studentName').value = s.name;
    document.getElementById('dept').value = s.dept;
    document.getElementById('marks').value = s.marks;
    document.getElementById('editIndex').value = index;

    saveBtn.textContent = "Update Student";
    cancelBtn.style.display = "inline-block";
    document.getElementById('formTitle').textContent = "Edit Student Details";
}

function resetForm() {
    document.getElementById('editIndex').value = "";
    saveBtn.textContent = "Save Student";
    cancelBtn.style.display = "none";
    document.getElementById('formTitle').textContent = "Add New Student";
    form.reset();
}

cancelBtn.addEventListener('click', resetForm);

function showStatus(msg, type) {

    console.log(`[${type.toUpperCase()}]: ${msg}`);
}


fetchStudents();