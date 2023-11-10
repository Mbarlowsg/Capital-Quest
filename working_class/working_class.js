/** @format */

// IK its named weirdly, it just helps it stick out.
const working_class_cards = [
	{
		title: "Title 0",
		index: 0,
		id: 0,
	},
	{
		title: "Title 1",
		index: 1,
		id: 1,
	},
	{
		title: "Title 2",
		index: 2,
		id: 2,
	},
	{
		title: "Title 3",
		index: 3,
		id: 3,
	},
	{
		title: "Title 4",
		index: 4,
		id: 4,
	},
	{
		title: "Title 5",
		index: 5,
		id: 5,
	},
	{
		title: "Title 6",
		index: 6,
		id: 6,
	},
	{
		title: "Title 7",
		index: 7,
		id: 7,
	},
	{
		title: "Title 8",
		index: 8,
		id: 8,
	},
	{
		title: "Title 9",
		index: 9,
		id: 9,
	},
];

let cardDeck = [];
let usedCards = [];
let playerHand = [];

let playerHandSize = 5;

// Used to log all cards played in the game
let playedCardsLog = [];

const cardLogOpenButton = document.getElementById("card_log_button");

window.onload = () => {
	fillCardDeck();
	fillPlayerHand();
	setupCardLog();
};

// fills cardDeck directly from working_class_cards
function fillCardDeck() {
	working_class_cards.forEach((card) => {
		cardDeck.push(card);
	});
	shuffleCards();
}

// refills cardDeck with the already-played cards
function refillCardDeck() {
	usedCards.forEach((card) => {
		cardDeck.push(card);
	});
	shuffleCards();
	usedCards = [];
}

// Called every time a card is played
function checkCardDeck() {
	if (cardDeck.length <= playerHandSize) {
		refillCardDeck();
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
        <h1>${currentCard.title}</h1>
        `;

		cardElement.innerHTML = elementHTML;
		setupCardModal(cardElement, currentCard);

		document.getElementById("card_container").appendChild(cardElement);

		playerHand.push(currentCard);
	}
}

function shuffleCards() {
	for (let i = cardDeck.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * i);
		let temp = cardDeck[i];
		cardDeck[i] = cardDeck[j];
		cardDeck[j] = temp;
	}
}

function setupCardModal(cardElement, cardObject) {
	// Setup for card page modals
	const openButton = cardElement;
	const modal = document.getElementById("card_modal");

	openButton.addEventListener("click", () => {
		modal.showModal();

		// Displayed content
		modal.innerHTML = `
        <h1>${cardObject.title}</h1>
        <button id="play_card_button" data-play-card>Play Card</button>
        <button data-close-modal>close</button>
        `;

		// Play Card Button logic
		const playCardButton = modal.querySelector("[data-play-card]");
		playCardButton.onclick = () => {
			modal.close();
			playerHand.splice(playerHand.indexOf(cardObject), 1);
			usedCards.push(cardObject);
			playedCardsLog.push(cardObject);
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

function setupCardLog() {
	cardLogOpenButton.addEventListener("click", () => {
		const modal = document.getElementById("card_log");
		modal.showModal();
		const cardLogDisplay = document.getElementById("card_log_body");
		cardLogDisplay.innerHTML = "";

		for (let i = playedCardsLog.length - 1; i >= 0; i--) {
			let itemHTML = `
            <td>${i + 1}</td>
            <td>${playedCardsLog[i].title}</td>
            <td>${playedCardsLog[i].id}</td>
            `;
			const logElement = document.createElement("tr");

			logElement.innerHTML = itemHTML;
			cardLogDisplay.appendChild(logElement);
		}
	});
}

// used to fill the card deck with test cards
function mockCardDeck(numCards) {
	for (let i = 0; i < numCards; i++) {
		let cardObject = {
			index: i,
			title: `test-${i}`,
			id: Date.now() * i + 1,
		};
		cardDeck.push(cardObject);
	}
}
