/** @format */

// IK its named weirdly, it just helps it stick out.
const WORKINGCLASSCARDS = [
	{
		title: "Fair Wage Legislation",
        description: "Advocate for policy that ensure fair wages for workers.\n\nChallenge and try to stop the government and corporations from making too much money",
		index: 0,
		id: 0,
	},
	{
		title: "Labor Rights",
		description: "Advocate for policy that ensure better worker treatment. \n\nDo your best to stop any policy or actions that hinder worker rights!",
        index: 1,
		id: 1,
	},
	{
		title: "Cost of Living",
        description: "Challenge and dispute unfair rising living costs. \n\n As costs are climbing, be sure to challenge any unfair price hikes that the government and corporations set forth as the game progresses.",
		index: 2,
		id: 2,
	},
	{
		title: "Power to the People",
        description: "Your goal is to make sure the working class rise up! \n\nTo maintain a sense of power, do everything you can to make and hoard wealth for the working class.",
		index: 3,
		id: 3,
	},
	{
		title: "Community Protection",
        description: "Prioritize the working class safety and wellbeing as a community.\n\nDo whatever you can to stop unfair policies against the working class from being implemented!",
		index: 4,
		id: 4,
	},
	{
		title: "Mortal Enemies",
        description: "Choose between either corporations and government, and try and stop every policy they implement. Who cares about what they say, anyways?",
		index: 5,
		id: 5,
	},
	{
		title: "Lobbying",
        description: "Lobby against the government, no matter the cost. \n\nTry and get the policy card holders to veto their cards as much as you can!",
		index: 6,
		id: 6,
	},
	{
		title: "Reaganomics!",
        description: "Align yourelf with corporations for the game.\n\nConsistently challenge what the government and policy do, if it hurts corporations.",
		index: 7,
		id: 7,
	},
	{
		title: "Government Alignment",
        description: "Align yourelf with the government for the game.\n\nConsistently challenge what the corporations and policy do, if it hurts government.",
		index: 8,
		id: 8,
	},
	{
		title: "Corruption",
        description: "You are a corrupted, scorned, damaged working class. You got issues.\n\nDo whatever is needed at all costs to stop others from doing 'good things.' Also, hoard wealth.",
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
	fillCardDeck(); // change to fillCardDeck() to use WORKINGCLASSCARDS list || mockCardDeck(num)
	fillPlayerHand();
	setupCardLog();
};

// fills cardDeck directly from WORKINGCLASSCARDS
function fillCardDeck() {
	WORKINGCLASSCARDS.forEach((card) => {
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

		// Displayed HTML on the card
		let elementHTML = `
        <h2>${currentCard.title}</h2>
		<p>${currentCard.description}<p>
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
        <p>${cardObject.description}</p>
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
			description: `desc-${i}`,
			id: Date.now() * i + 1,
		};
		cardDeck.push(cardObject);
	}
	shuffleCards();
}
