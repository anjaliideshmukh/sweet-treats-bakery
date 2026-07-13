// ================= ORDER BUTTON =================

const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const productName = button.dataset.product;

        localStorage.setItem("selectedProduct", productName);

    });

});


// ================= CART =================

// Get existing cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cart Counter
const cartCounter = document.getElementById("cart-count");

updateCartCount();

function updateCartCount(){

    if(cartCounter){

        let totalItems = 0;

        cart.forEach(function(product){

            totalItems += product.quantity;

        });

        cartCounter.innerText = totalItems;

    }

}


// ================= ADD TO CART =================

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let productName = button.dataset.product;

        let productPrice = Number(button.dataset.price);

        // Check if product already exists

        let existingProduct = cart.find(function(item){

            return item.name === productName;

        });

        if(existingProduct){

            existingProduct.quantity++;

        }

        else{

            cart.push({

                name: productName,

                price: productPrice,

                quantity:1

            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(productName + " added to cart!");

    });

});

// ================= CART PAGE =================

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if(cartItems){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product,index){

        let subTotal = product.price * product.quantity;

        total += subTotal;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <p>Quantity : ${product.quantity}</p>

                <p><strong>Subtotal : ₹${subTotal}</strong></p>

            </div>

            <button class="remove-btn" data-index="${index}">

                Remove

            </button>

        </div>

        `;

    });

    if(totalPrice){

        totalPrice.innerText = total;

    }

    // Remove Button

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(function(button){

        button.addEventListener("click",function(){

            let index = button.dataset.index;

            if(cart[index].quantity > 1){

                cart[index].quantity--;

            }

            else{

                cart.splice(index,1);

            }

            localStorage.setItem("cart",JSON.stringify(cart));

            location.reload();

        });

    });

}
// ================= ORDER FORM =================

const selectedItem = document.getElementById("selectedItem");
const orderTotal = document.getElementById("order-total");

if(selectedItem){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let productList = "";

    let total = 0;

    if(cart.length > 0){

        cart.forEach(function(product){

            productList += `${product.name} × ${product.quantity}\n`;

            total += product.price * product.quantity;

        });

        selectedItem.value = productList;

        if(orderTotal){

            orderTotal.innerText = total;

        }

    }

    else{

        // If user clicked Order directly

        const product = localStorage.getItem("selectedProduct");

        if(product){

            selectedItem.value = product;

        }

    }

}
// ================= FORM VALIDATION =================

const orderForm = document.getElementById("orderForm");

if(orderForm){

    orderForm.addEventListener("submit",function(event){

        event.preventDefault();

        let fullName = document.getElementById("name").value.trim();

        let phone = document.getElementById("phone").value.trim();

        let items = document.getElementById("selectedItem").value.trim();

        let address = document.getElementById("address").value.trim();

        let namePattern = /^[A-Za-z ]+$/;

        if(fullName===""){

            alert("Name cannot be empty");

            return;

        }

        if(!namePattern.test(fullName)){

            alert("Only alphabets and spaces are allowed.");

            return;

        }

        let phonePattern=/^[0-9]{10}$/;

        if(phone===""){

            alert("Phone number cannot be empty.");

            return;

        }

        if(!phonePattern.test(phone)){

            alert("Enter a valid 10-digit phone number.");

            return;

        }

        if(items===""){

            alert("Your cart is empty.");

            return;

        }

        if(address===""){

            alert("Address cannot be empty.");

            return;

        }

        orderForm.submit();

    });

}
// ================= SUCCESS PAGE =================

const successCard = document.querySelector(".success-card");

if(successCard){

    localStorage.removeItem("cart");

    localStorage.removeItem("selectedProduct");

}
const checkoutButton = document.querySelector(".checkout-btn");

if (checkoutButton && cart.length === 0) {
    checkoutButton.disabled = true;
    checkoutButton.innerText = "Cart is Empty";
}