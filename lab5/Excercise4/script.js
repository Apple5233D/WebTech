let inventory = [];

// Load Data
async function loadInventory() {
    try {
        const response = await fetch('inventory.json');
        inventory = await response.json();
        renderTable(inventory);
    } catch (error) {
        console.error("Data Load Error:", error);
    }
}

// Render Table + Calculations
function renderTable(data) {
    const tbody = document.getElementById('inventoryBody');
    const totalDisplay = document.getElementById('totalValue');
    let totalValue = 0;
    tbody.innerHTML = "";

    data.forEach((item, index) => {
        const itemTotal = item.price * item.stock;
        totalValue += itemTotal;

        const isLowStock = item.stock < 5;
        const rowClass = isLowStock ? 'low-stock' : '';

        tbody.innerHTML += `
            <tr class="${rowClass}">
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    ${item.stock} 
                    ${isLowStock ? '<span class="badge badge-low">LOW</span>' : ''}
                </td>
                <td>
                    <button class="btn-del" onclick="deleteItem('${item.id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    totalDisplay.textContent = `$${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

// Add Item
document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = {
        id: document.getElementById('pid').value,
        name: document.getElementById('pname').value,
        category: document.getElementById('pcat').value,
        price: parseFloat(document.getElementById('pprice').value),
        stock: parseInt(document.getElementById('pstock').value)
    };

    inventory.push(newItem);
    renderTable(inventory);
    e.target.reset();
});

// Search/Filter
function filterByCategory() {
    const query = document.getElementById('searchCategory').value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.category.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

// Delete
function deleteItem(id) {
    inventory = inventory.filter(item => item.id !== id);
    renderTable(inventory);
}

loadInventory();