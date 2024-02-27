// Initial data
const pizzaArea = document.querySelector(".pizza-area");
const modalArea = document.querySelector(".pizzaWindowArea");
const cartItems = [];

// -------------------------------- events --------------------------------

// start the website
showPizza();

// -------------------------------- general functions --------------------------------

function showPizza() {
    // iterates the array and adds the pizzas in the display area
    for (const pizza of pizzaJson) {
        // cloning the pizza model
        const newPizza = document.querySelector(".pizza-item").cloneNode(true);
        let pizzaPrice = 0;

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

            // preventing default refresh of the page
            event.preventDefault();

            // changing the pizza image in the modal
            modalArea.querySelector("img").src = pizza.img;

            // changing the pizza name in the modal
            modalArea.querySelector(".pizzaInfo h1").innerHTML = pizza.name;

            // changing the discription in the modal
            modalArea.querySelector(".pizzaInfo--desc").innerHTML = pizza.description;

            // changing the price of the pizza - the standart one is always the larger pizza
            pizzaPrice = pizza.price[2].toFixed(2);
            modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${pizzaPrice}`;

            // changing the grams of each pizza - the standart one is always the larger pizza
            modalArea.querySelectorAll(".pizzaInfo--size").forEach((size, index) => {
                size.querySelector("span").innerHTML = pizza.sizes[index];
            });

            // reseting the size selection  - the standart one is always the larger pizza
            modalArea.querySelectorAll(".selected").forEach((item) => item.classList.remove("selected"));
            modalArea.querySelector(".pizzaInfo--size:last-child").classList.add("selected");

            // adding events to change the pizza size and th eprice of the pizza
            modalArea.querySelectorAll(".pizzaInfo--size").forEach((item, index) => item.addEventListener("click", (event) => {

                // removing th eselected class from all the sizes
                modalArea.querySelectorAll(".selected").forEach((item) => item.classList.remove("selected"));

                // add the selected class to the size choosen
                event.currentTarget.classList.add("selected");

                // changing the price to the correct size
                modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${pizza.price[index].toFixed(2)}`;

                // reset the quantity
                modalArea.querySelector(".pizzaInfo--qt").innerHTML = "1";

                // updating the value
                pizzaPrice = pizza.price[index].toFixed(2);
            }));

            // reseting the quanity of pizzas
            console.log(modalArea.querySelector(".pizzaInfo--qt"));

            modalArea.querySelector(".pizzaInfo--qt").innerHTML = "1";

            // adding event to the plus quantity
            modalArea.querySelector(".pizzaInfo--qtmais").addEventListener("click", () => {
                // capture the quantity and increase 
                let count = parseInt(modalArea.querySelector(".pizzaInfo--qt").innerHTML);
                count++;
                const totalPrice = pizzaPrice * count;

                // changing the information on the modal
                modalArea.querySelector(".pizzaInfo--qt").innerHTML = count;
                modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${totalPrice.toFixed(2)}`;
            });

            // decreasing event to the minus quantity
            modalArea.querySelector(".pizzaInfo--qtmenos").addEventListener("click", () => {
                if (parseInt(modalArea.querySelector(".pizzaInfo--qt").innerHTML) > 1) {
                    // capture the quantity and decreasing 
                    let count = parseInt(modalArea.querySelector(".pizzaInfo--qt").innerHTML);
                    count--;
                    const totalPrice = pizzaPrice * count;
                    
                    // changing the information on the modal
                    modalArea.querySelector(".pizzaInfo--qt").innerHTML = count;
                    modalArea.querySelector(".pizzaInfo--actualPrice").innerHTML = `R$${totalPrice.toFixed(2)}`;
                }
            });

            // oppening the modal area
            openModal();
        })
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
