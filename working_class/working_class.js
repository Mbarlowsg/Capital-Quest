/** @format */

let cardDeck = [];
let playerHandSize = 5;

window.onload = () => {
	fillCardDeck(10);
	for (let i = 0; i < playerHandSize; i++) {
		const currentCard = cardDeck.pop();
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.classList.add("draggable");
		cardElement.setAttribute("draggable", "true");
		let elementHTML = `
        <h1>${currentCard.value}</h1>
    `;
		cardElement.innerHTML = elementHTML;
		setupModal2(cardElement, currentCard);

		document.getElementById("card_container").appendChild(cardElement);
	}
	// setupModal();
};

//
function setupModal() {
	const openButton = document.querySelectorAll(".card");
	const modal = document.getElementById("card_modal");
	const cardDisplay = document.getElementById("card_display");
	const displayedHTML = `
    <h1>openButton.value</h1>
    <button data-close-modal>close</button>
    `;

	for (let i = 0; i < openButton.length; i++) {
		openButton[i].addEventListener("click", () => {
			modal.showModal();
			modal.innerHTML = `
		<h1>${cardDeck[i]}</h1>
		<button data-close-modal>close</button>
		`;
			const closeButton = modal.querySelector("[data-close-modal]");
			closeButton.onclick = () => {
				modal.close();
			};
		});
	}
}

function setupModal2(cardElement, cardObject) {
	const openButton = cardElement;
	console.log(cardObject);
	const modal = document.getElementById("card_modal");

	openButton.addEventListener("click", () => {
		modal.showModal();
		modal.innerHTML = `
		<h1>${cardObject.value}</h1>
		<button data-close-modal>close</button>
		`;
		const closeButton = modal.querySelector("[data-close-modal]");
		closeButton.onclick = () => {
			modal.close();
		};
	});
}

function fillCardDeck(numCards) {
	for (let i = 0; i < numCards; i++) {
		let cardObject = {
			index: i,
			value: Math.floor(Math.random() * 10),
		};
		cardDeck.push(cardObject);
	}
}
