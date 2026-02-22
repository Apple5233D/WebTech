let xmlDoc = null;
const tableBody = document.getElementById('tableBody');
const status = document.getElementById('status');


async function loadEmployees() {
    try {
        const response = await fetch('employees.xml');
        if (!response.ok) throw new Error("Could not find XML file");
        
        const text = await response.text();
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
        

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            throw new Error("Error parsing XML data");
        }

        renderTable();
    } catch (err) {
        status.innerHTML = `<span style="color:red">${err.message}</span>`;
    }
}


function renderTable() {
    tableBody.innerHTML = "";
    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No records found.</td></tr>";
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>$${salary}</td>
                <td><button class="btn-del" onclick="deleteEmployee(${i})">Delete</button></td>
            </tr>
        `;
    }
}


document.getElementById('employeeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const newEmp = xmlDoc.createElement("employee");
    
    const fields = {
        id: document.getElementById('empId').value,
        name: document.getElementById('empName').value,
        department: document.getElementById('empDept').value,
        salary: document.getElementById('empSalary').value
    };

    for (let key in fields) {
        const node = xmlDoc.createElement(key);
        node.textContent = fields[key];
        newEmp.appendChild(node);
    }

    xmlDoc.documentElement.appendChild(newEmp);
    status.textContent = "Employee Added Successfully!";
    renderTable();
    e.target.reset();
});


function deleteEmployee(index) {
    const empNode = xmlDoc.getElementsByTagName("employee")[index];
    empNode.parentNode.removeChild(empNode);
    status.textContent = "Employee Deleted.";
    renderTable();
}


loadEmployees();