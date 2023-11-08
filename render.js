/** @format */

let cardDeck = [1, 2, 4, 73, 5, 6, 7, 4, 3, 5, 8, 4, 3, 2, 7, 4, 3];

window.onload = () => {
	for (let i = 0; i < cardDeck.length; i++) {
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.classList.add("draggable");
		cardElement.setAttribute("draggable", "true");
		let elementHTML = `
        <h1>${cardDeck[i]}</h1>
    `;
		cardElement.innerHTML = elementHTML;
		document.getElementById("card_container").appendChild(cardElement);
	}
};
