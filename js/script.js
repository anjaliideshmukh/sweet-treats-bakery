// ================= ORDER PAGE =================

// Order Button
const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const productName = button.dataset.product;

        localStorage.setItem("selectedProduct", productName);

    });

});


// ================= ADD TO CART =================

const cartButtons = document.querySelectorAll(".cart-btn");

let cart = [];

if(localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"));
}

const cartCounter = document.getElementById("cart-count");

if(cartCounter){
    cartCounter.innerText = cart.length;
}

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let productName = button.dataset.product;
        let productPrice = Number(button.dataset.price);

        let product = {

            name: productName,
            price: productPrice

        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        if(cartCounter){
            cartCounter.innerText = cart.length;
        }

    });

});


// ================= CART PAGE =================

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if(cartItems){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product,index){

        total += product.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

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

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(function(button){

        button.addEventListener("click",function(){

            let index = button.dataset.index;

            cart.splice(index,1);

            localStorage.setItem("cart",JSON.stringify(cart));

            location.reload();

        });

    });

}
// ================= ORDER FORM =================

cconst selectedItem = document.getElementById("selectedItem");

if (selectedItem) {

    // Check if there are products in the cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {

        let productList = "";

        cart.forEach(function(product){

            productList += product.name + "\n";

        });

        selectedItem.value = productList;

    }
    else{

        // If cart is empty, use Order button product
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
        let quantity = document.getElementById("quantity").value;
        let address = document.getElementById("address").value.trim();

        let namePattern = /^[A-Za-z ]+$/;

        if(fullName===""){
            alert("Name cannot be empty");
            return;
        }

        if(!namePattern.test(fullName)){
            alert("Only alphabets and spaces are allowed");
            return;
        }

        let phonePattern=/^[0-9]{10}$/;

        if(phone===""){
            alert("Phone number cannot be empty");
            return;
        }

        if(!phonePattern.test(phone)){
            alert("Phone number must contain exactly 10 digits");
            return;
        }

        if(items===""){
            alert("Please select a product.");
            return;
        }

        if(quantity===""){
            alert("Quantity cannot be empty");
            return;
        }

        if(quantity<1){
            alert("Quantity must be at least 1");
            return;
        }

        if(address===""){
            alert("Address cannot be empty");
            return;
        }

        orderForm.submit();

    });

}