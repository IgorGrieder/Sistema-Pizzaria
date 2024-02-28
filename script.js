// Initial data
const pizzaArea = document.querySelector(".pizza-area");
const modalArea = document.querySelector(".pizzaWindowArea");
const quitModal = document.querySelector(".pizzaInfo--cancelButton");
const openCartTop = document.querySelector(".menu-openner");
const menuCloserTop = document.querySelector(".menu-closer");
const aside = document.querySelector("aside");
const cartItems = [];
let cartNumber = 0;
let currentPizza = null;
let currentPizzaCount = 1;

// -------------------------------- events --------------------------------

// start the website
showPizza();

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
    modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${pizzaJson[currentPizza].price[index].toFixed(2)}`;
    
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

/*

            // adding event to add to the cart
            modalArea.querySelector(".pizzaInfo--addButton").addEventListener("click", () => {

                // updates the number of pizzas in the cart
                let countPizza = parseInt(modalArea.querySelector(".pizzaInfo--qt").innerHTML);
                cartNumber += countPizza;

                // getting the pizza name to display on the cart
                let name = `${pizza.name} (${document.querySelector(".pizzaInfo--size.selected").innerHTML[0]})`;

                // getting the pizza image
                let img = pizza.img;

                // creating a object pizza to add to the cart
                const pizzaCart = {
                    name,
                    countPizza,
                    img,
                    pizzaPrice
                };

                // adding the object to the pizza cart
                cartItems.push(pizzaCart);

                // opens the cart area
                openCart();

                // closes the modal area
                closeModal();
            });
*/

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

            // reseting the pizza count
            currentPizzaCount = 1;

            // show the current pizza on the modal
            currentPizza = newPizza.getAttribute("data-pizza");

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