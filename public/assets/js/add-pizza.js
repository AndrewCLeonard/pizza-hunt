// Selector section (dollar sign to show it's an query selector)
const $addToppingBtn = document.querySelector("#add-topping");
const $pizzaForm = document.querySelector("#pizza-form");
const $customToppingsList = document.querySelector("#custom-toppings-list");

const handleAddTopping = (event) => {
	event.preventDefault();

	const toppingValue = document.querySelector("#new-topping").value;

	if (!toppingValue) {
		return false;
	}

	//
	const checkbox = document.createElement("input");
	// key value pairs. Key is on left, value on the right
	checkbox.type = "checkbox";
	checkbox.name = "topping";
	checkbox.value = toppingValue;
	checkbox.id = toppingValue.toLowerCase().split(" ").join("-");
	// the key value pairs can be whatever I want:
	checkbox.customName = "you can make these whatever you want";

	const label = document.createElement("label");
	label.textContent = toppingValue;
	label.htmlFor = toppingValue.toLowerCase().split(" ").join("-");

	const divWrapper = document.createElement("div");

  // 
	divWrapper.appendChild(checkbox);
	divWrapper.appendChild(label);
	// ??? read MDN about console, `typeof`, and `console.dir`
	console.log(checkbox);
	console.dir(checkbox);
	console.log(typeof checkbox);
	$customToppingsList.appendChild(divWrapper);

	toppingValue.value = "";
};

const handlePizzaSubmit = (event) => {
	event.preventDefault();

	const pizzaName = $pizzaForm.querySelector("#pizza-name").value;
	const createdBy = $pizzaForm.querySelector("#created-by").value;
	const size = $pizzaForm.querySelector("#pizza-size").value;
  // 
	const toppings = [...$pizzaForm.querySelectorAll("[name=topping]:checked")].map((topping) => {
		return topping.value;
	});

	if (!pizzaName || !createdBy || !toppings.length) {
		return;
	}

	const formData = { pizzaName, createdBy, size, toppings };

	fetch("/api/pizzas", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((postResponse) => {
			alert("Pizza created successfully!");
			console.log(postResponse);
		})
		.catch((err) => {
			console.log(err);
		});
};

$pizzaForm.addEventListener("submit", handlePizzaSubmit);
$addToppingBtn.addEventListener("click", handleAddTopping);
