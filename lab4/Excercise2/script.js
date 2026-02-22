const searchInput = document.getElementById('searchInput');
const resultsGrid = document.getElementById('resultsGrid');
const loader = document.getElementById('loader');

let debounceTimer;

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    
    clearTimeout(debounceTimer);
    
    if (!query) {
        resultsGrid.innerHTML = '';
        return;
    }

    loader.style.display = 'block';

    debounceTimer = setTimeout(() => {
        performSearch(query);
    }, 400); 
});

async function performSearch(query) {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error("Server error");
        
        const products = await response.json();
        
        const matches = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );

        renderUI(matches);
    } catch (err) {
        resultsGrid.innerHTML = `<p class="no-results">Oops! Something went wrong.</p>`;
    } finally {
        loader.style.display = 'none';
    }
}

function renderUI(items) {
    if (items.length === 0) {
        resultsGrid.innerHTML = `<div class="no-results">No products found for that search.</div>`;
        return;
    }

    resultsGrid.innerHTML = items.map(item => `
        <div class="product-card">
            <span class="category-tag">${item.category}</span>
            <h3>${item.name}</h3>
            <span class="price-tag">$${item.price.toFixed(2)}</span>
        </div>
    `).join('');
}