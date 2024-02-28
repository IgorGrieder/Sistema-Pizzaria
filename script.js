// Initial data
const pizzaArea = document.querySelector(".pizza-area");
const modalArea = document.querySelector(".pizzaWindowArea");
const quitModal = document.querySelector(".pizzaInfo--cancelButton");
const openCartTop = document.querySelector(".menu-openner");
const menuCloserTop = document.querySelector(".menu-closer");
const cart = document.querySelector(".cart");
const aside = document.querySelector("aside");
const cartItems = [];

let cartNumber = 0;
let currentPizza = null;
let currentPizzaCount = 1;
let currentPizzaPrice = 0;
let currentPizzaSize = 2;

// -------------------------------- events --------------------------------

// start the website
showPizza();
updateCart();

// close the modal when clicking on cancel
quitModal.addEventListener("click", () => closeModal());

// open the cart or close it when clicked
openCartTop.addEventListener("click", () => {
    // if the user clicks on it when the cart is open it closes
    if (aside.classList.contains("show")) {
        aside.classList.remove("show");
    } else openCart();
});

// close the cart menu
menuCloserTop.addEventListener("click", () => closeCart());

// adding events to change the pizza size and the price of the pizza
modalArea.querySelectorAll(".pizzaInfo--size").forEach((item, index) => item.addEventListener("click", (event) => {

    // removing th eselected class from all the sizes
    modalArea.querySelectorAll(".selected").forEach((item) => item.classList.remove("selected"));
    
    // add the selected class to the size choosen
    event.currentTarget.classList.add("selected");
    
    // changing the price to the correct size
    currentPizzaPrice = pizzaJson[currentPizza].price[index];
    modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${currentPizzaPrice.toFixed(2)}`;

    // changing the pizza size
    currentPizzaSize = index;

    // reset the quantity
    modalArea.querySelector(".pizzaInfo--qt").innerHTML = "1";
}));

// adding event to control increment of pizza quantity
modalArea.querySelector(".pizzaInfo--qtmais").addEventListener("click", () => {
    // capture the quantity and increase
    currentPizzaCount++; 
    modalArea.querySelector(".pizzaInfo--qt").innerHTML = currentPizzaCount;
});

// adding event to control the decrement of pizza quantity
modalArea.querySelector(".pizzaInfo--qtmenos").addEventListener("click", () => {
    // setting a barrier that can't be lower then 1
    if (currentPizzaCount > 1) {
        currentPizzaCount--;
        modalArea.querySelector(".pizzaInfo--qt").innerHTML = currentPizzaCount;
    }
});

// adding the pizza to the cart
modalArea.querySelector(".pizzaInfo--addButton").addEventListener("click", () => {
    // getting the pizza name to display
    const name = `${pizzaJson[currentPizza].name} (${document.querySelector(".selected").innerHTML[0]})`;

    // getting the image
    const img = pizzaJson[currentPizza].img;

    // getting the id
    const id = `${pizzaJson[currentPizza].id}@${currentPizzaSize}`;

    // creating a object to retain information about the pizza
    const newPizza = {
        id,
        name,
        quantity: currentPizzaCount,
        price: currentPizzaPrice,
        img,
    }

    // checking if the pizza is already in the pizza cart
    const samePizza = cartItems.findIndex((item) => item.id === id);

    if (samePizza !== -1) {
        cartItems[samePizza].quantity += currentPizzaCount;
    } else {
        // inserting the new pizza to the cart if there isn't one equals to it on the cart already
        cartItems.push(newPizza);
    }

    // changing the cart number
    cartNumber += currentPizzaCount;
    openCartTop.querySelector("span").innerHTML = cartNumber;

    // closign the modal and opening the cart area
    closeModal();
    updateCart();
    openCart();
});

// -------------------------------- general functions --------------------------------

// function to display the pizzas and the following behaviors
function showPizza() {
    // iterates the array and adds the pizzas in the display area
    for (let pizza of pizzaJson) {
        // cloning the pizza model
        let newPizza = document.querySelector(".models .pizza-item").cloneNode(true);

        // setting a reference value 
        newPizza.setAttribute("data-pizza", pizza.id);

        // changing the name
        newPizza.querySelector(".pizza-item--name").innerHTML = pizza.name;

        // changing the price
        const price = [];
        for (const pricing of pizza.price) {
            const actualPrice = `R$${pricing.toFixed(2)}`;
            price.push(actualPrice);
        }
        newPizza.querySelector(".pizza-item--price").innerHTML = price.join(" - ");

        // changing the image
        newPizza.querySelector("img").src = pizza.img;

        // changing the discription
        newPizza.querySelector(".pizza-item--desc").innerHTML = pizza.description;

        // adding a event to open the modal for each pizza selected
        newPizza.querySelector("a").addEventListener("click", (event) => {
            
            // show the current pizza on the modal
            currentPizza = newPizza.getAttribute("data-pizza");

            // reseting the pizza count
            currentPizzaCount = 1;
            
            // setting a current pizza price
            currentPizzaPrice = pizzaJson[currentPizza].price[2];

            // setting the current pizza size
            currentPizzaSize = 2;

            // preventing default refresh of the page
            event.preventDefault();

            // changing the pizza image in the modal
            modalArea.querySelector("img").src = pizza.img;

            // changing the pizza name in the modal
            modalArea.querySelector(".pizzaInfo h1").innerHTML = pizza.name;

            // changing the discription in the modal
            modalArea.querySelector(".pizzaInfo--desc").innerHTML = pizza.description;

            // changing the price of the pizza - the standart one is always the larger pizza
            modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${pizza.price[2].toFixed(2)}`;

            // changing the grams of each pizza - the standart one is always the larger pizza
            modalArea.querySelectorAll(".pizzaInfo--size").forEach((size, index) => {
                size.querySelector("span").innerHTML = pizza.sizes[index];
            });

            // reseting the size selection  - the standart one is always the larger pizza
            modalArea.querySelectorAll(".selected").forEach((item) => item.classList.remove("selected"));
            modalArea.querySelector(".pizzaInfo--size:last-child").classList.add("selected");

            // reseting the quanity of pizzas
            modalArea.querySelector(".pizzaInfo--qt").innerHTML = "1";

            // oppening the modal area
            openModal();
        });
        
        // adding the pizza to the area
        pizzaArea.append(newPizza);
    }
}

// open the modal area
function openModal() {
    modalArea.style.opacity = "0";
    modalArea.style.display = "flex";
    setTimeout(() => modalArea.style.opacity = "1", 200);
}

// close the modal area
function closeModal() {
    modalArea.style.opacity = "0";
    setTimeout(() => modalArea.style.display = "none", 200);
}

// open the cart area
function openCart() {
    aside.style.opacity = "0";
    aside.classList.add("show");
    aside.style.opacity = "1";
}

// close the cart area
function closeCart() {
    aside.classList.remove("show");
}

// update the cart area display
function updateCart() {

    // reseting the HTML of cart
    cart.innerHTML = "";

    // Pricing of the cart
    let subtotal = 0;
    let discount = 0;
    let totalPrice = 0;

    // updating cart number
    
    // adding the pizzas to the cart
    cartItems.forEach((item, index) => {

        // cloning the structure
        const add = document.querySelector(".models .cart--item").cloneNode(true);

        // changing the image for each pizza
        add.querySelector("img").src = item.img;

        // changing the name
        add.querySelector(".cart--item-nome").innerHTML = item.name;

        // changing the quantity
        add.querySelector(".cart--item--qt").innerHTML = item.quantity;

        // adding the price
        subtotal += item.quantity * item.price;

        // adding event to decrease pizza count
        add.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
            // remove the cartItem if the quantity be less then 1
            if (item.quantity === 1) {
                cartItems.splice(index, 1);
            } else item.quantity--;

            // changing the cart number and updating the cart
            cartNumber--;
            openCartTop.querySelector("span").innerHTML = cartNumber;
            updateCart();
        }); 

        // adding event to increase pizza count
        add.querySelector(".cart--item-qtmais").addEventListener("click", () => {
            item.quantity++;
            
            // changing the cart number and updating the cart
            cartNumber++;
            openCartTop.querySelector("span").innerHTML = cartNumber;
            updateCart();
        });

        // adding the pizza to the cart display
        cart.append(add);
    });

    // displaying the discounts, total and subtotal to the cart
    discount = (subtotal * 0.1).toFixed(2);
    totalPrice = (subtotal - discount).toFixed(2);

    document.querySelector("#subtotal").innerHTML = `R${subtotal.toFixed(2)}`;
    document.querySelector("#desc").innerHTML = `R$${discount}`;
    document.querySelector("#total").innerHTML = `R$${totalPrice}`;
}