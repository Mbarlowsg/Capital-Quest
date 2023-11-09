/** @format */

let cardDeck = [];
let playedCards = [];
let playerHandSize = 5;
let playerHand = [];

window.onload = () => {
	fillCardDeck(6);
	fillPlayerHand();
};

function checkCardDeck() {
	if (cardDeck.length <= playerHandSize) {
		fillCardDeck(5);
		fillPlayerHand();
	}
	fillPlayerHand();
}

function fillPlayerHand() {
	for (let i = 0; playerHand.length < playerHandSize; i++) {
		const currentCard = cardDeck.shift();
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.setAttribute("id", `card_${currentCard.id}`);

		// used later for user to be able to rearrange deck
		cardElement.classList.add("draggable");
		cardElement.setAttribute("draggable", "true");

		let elementHTML = `
        <h1>${currentCard.value}</h1>
        `;

		cardElement.innerHTML = elementHTML;
		setupModal(cardElement, currentCard);

		document.getElementById("card_container").appendChild(cardElement);

		playerHand.push(currentCard);
	}
}

function fillCardDeck(numCards) {
	for (let i = 0; i < numCards; i++) {
		let cardObject = {
			index: i,
			value: Math.floor(Math.random() * 10),
			id: Date.now() * i + 1,
		};
		cardDeck.push(cardObject);
	}
}

function setupModal(cardElement, cardObject) {
	const openButton = cardElement;
	const modal = document.getElementById("card_modal");

	openButton.addEventListener("click", () => {
		modal.showModal();

		// Displayed content
		modal.innerHTML = `
        <h1>${cardObject.value}</h1>
        <button id="play_card_button" data-play-card>Play Card</button>
        <button data-close-modal>close</button>
        `;

		const playCardButton = modal.querySelector("[data-play-card]");
		playCardButton.onclick = () => {
			modal.close();
			playerHand.splice(playerHand.indexOf(cardObject), 1);
			playedCards.push(cardObject);
			document.getElementById(`card_${cardObject.id}`).remove();
			checkCardDeck();
		};

		// Close Button logic (nested as it can only be set up once the modal is open)
		const closeButton = modal.querySelector("[data-close-modal]");
		closeButton.onclick = () => {
			modal.close();
		};
	});
}
