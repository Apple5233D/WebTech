function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value.trim();

    if (taskName === "") return;

    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.id = 'task-' + Date.now();
    taskCard.draggable = true;
    taskCard.ondragstart = drag;

    const date = new Date().toLocaleDateString();

    taskCard.innerHTML = `
        <p><strong>${taskName}</strong></p>
        <p class="task-date">${date}</p>
    `;

    document.getElementById('todo').appendChild(taskCard);
    input.value = "";
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const dropTarget = e.target.closest('.column');

    if (dropTarget) {
        dropTarget.appendChild(draggedElement);

        if (dropTarget.id === 'completed') {
            alert("Task Completed Successfully");
        }
    }
}