let students = [];
const studentList = document.getElementById('studentList');
const studentForm = document.getElementById('studentForm');

// 1. Initial Load (READ)
async function loadData() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error("Failed to fetch data");
        
        students = await response.json();
        renderTable();
    } catch (err) {
        showMessage("Error: " + err.message, "red");
    }
}

// 2. Render Table
function renderTable() {
    studentList.innerHTML = "";
    students.forEach((s, index) => {
        studentList.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td>${s.marks}</td>
                <td>
                    <button class="btn-edit" onclick="editMarks(${index})">Update Marks</button>
                    <button class="btn-delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// 3. Create: Add new student
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic Validation
    const id = document.getElementById('sid').value;
    const name = document.getElementById('sname').value;
    const course = document.getElementById('scourse').value;
    const marks = document.getElementById('smarks').value;

    if (students.some(s => s.id === id)) {
        return showMessage("ID already exists!", "orange");
    }

    students.push({ id, name, course, marks: parseInt(marks) });
    renderTable();
    studentForm.reset();
    showMessage("Student added successfully!", "green");
});

// 4. Update: Modify marks
function editMarks(index) {
    const newMarks = prompt("Enter new marks (0-100):", students[index].marks);
    if (newMarks !== null && newMarks >= 0 && newMarks <= 100) {
        students[index].marks = parseInt(newMarks);
        renderTable();
        showMessage("Marks updated!", "blue");
    }
}

// 5. Delete: Remove student
function deleteStudent(index) {
    if (confirm(`Delete ${students[index].name}?`)) {
        students.splice(index, 1);
        renderTable();
        showMessage("Record deleted.", "red");
    }
}

function showMessage(text, color) {
    const msg = document.getElementById('msg');
    msg.textContent = text;
    msg.style.display = "block";
    msg.style.backgroundColor = color === "green" ? "#dcfce7" : "#fee2e2";
    msg.style.color = color === "green" ? "#166534" : "#991b1b";
    setTimeout(() => msg.style.display = "none", 3000);
}

loadData();