let cart = [];
let activeCouponDiscount = 0;

// 1. Add/Update Item
function addToCart(name, price, category) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    renderCart();
}

// 2. Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// 3. Discount Logic Engine
function calculateTotals() {
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Rule: Bulk Discount (10% off if more than 5 of the same item)
        if (item.quantity > 5) {
            totalDiscount += itemTotal * 0.10;
        }

        // Rule: Category Discount (20% off Electronics)
        if (item.category === 'Electronics') {
            totalDiscount += itemTotal * 0.20;
        }
    });

    // Add coupon discount
    totalDiscount += (subtotal * activeCouponDiscount);

    return {
        subtotal: subtotal.toFixed(2),
        discount: totalDiscount.toFixed(2),
        final: (subtotal - totalDiscount).toFixed(2)
    };
}

// 4. Coupon Validation (String Methods)
function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    
    // Pattern: Must start with 'SAVE', followed by two digits, and end with '-PROMO'
    if (code.startsWith('SAVE') && code.endsWith('-PROMO')) {
        const percentStr = code.substring(4, 6); // Extract the digits
        const percent = parseInt(percentStr);
        
        if (!isNaN(percent)) {
            activeCouponDiscount = percent / 100;
            alert(`Coupon Applied: ${percent}% off!`);
        }
    } else {
        alert("Invalid Coupon Format");
        activeCouponDiscount = 0;
    }
    renderCart();
}

// 5. DOM Rendering
function renderCart() {
    const tbody = document.getElementById('cart-items');
    tbody.innerHTML = '';

    cart.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    const totals = calculateTotals();
    document.getElementById('subtotal').innerText = totals.subtotal;
    document.getElementById('discount-amount').innerText = totals.discount;
    document.getElementById('total').innerText = totals.final;
}