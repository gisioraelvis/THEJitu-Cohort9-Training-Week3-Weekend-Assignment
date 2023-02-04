import { StreaksArray } from "./streak-store.js";
import { Streak } from "./streak.js";
// Grap the DOM Elements
//Hero Section
const heroAddBtn = document.querySelector("#add-btn-hero");
const heroSection = document.querySelector("#hero-container");
//when hero add btn is clicked, hide the hero section and show the new streak form
heroAddBtn.addEventListener("click", () => {
    heroSection.style.display = "none";
});
// Form section
const newStreakContainer = document.querySelector("#new-streak-container");
const closeBtnOnStreakForm = document.querySelector("#close-btn-streak-form");
const newStreakForm = document.querySelector(".new-streak-form");
const newStreakName = document.querySelector("#streak-name");
const newStreakImg = document.querySelector("#streak-img");
const newStreakStartDate = document.querySelector("#streak-start-date");
const newStreakSubmitBtn = document.querySelector(".submit-btn");
// When the close btn on the streak form is clicked, hide the form and show the hero section
closeBtnOnStreakForm.addEventListener("click", () => {
    heroSection.style.display = "flex";
});
// Add a new Streak
newStreakSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Validate the form
    if (newStreakName.value === "" ||
        newStreakImg.value === "" ||
        newStreakStartDate.value === "") {
        //For 5 Sec show error message and disable the Submit Button
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Please fill in all the fields";
        errorMsg.className = "error-msg";
        newStreakSubmitBtn.insertAdjacentElement("beforebegin", errorMsg);
        newStreakSubmitBtn.setAttribute("disabled", "true");
        setTimeout(() => {
            errorMsg.remove();
            newStreakSubmitBtn.removeAttribute("disabled");
        }, 5000);
    }
    else {
        // Get the image file and create a URL for the image
        let image = null;
        let imagePath = "/public/assets/default-streak-img.gif";
        if (newStreakImg && newStreakImg.files && newStreakImg.files[0]) {
            image = newStreakImg.files[0];
            imagePath = URL.createObjectURL(image);
        }
        // Add the new Streak to the Streak Store
        const newStreak = new Streak(newStreakName.value, imagePath, newStreakStartDate.value);
        newStreak.calculateDays();
        newStreak.addStreak();
        // Clear the form
        newStreakName.value = "";
        newStreakImg.value = "";
        newStreakStartDate.value = "";
        // Render the streaks
        renderStreaks(StreaksArray);
        // scroll to the streaks container #streaks-container
        streaksContainer.scrollIntoView({ behavior: "smooth" });
        // keep the hero section hidden
        heroSection.style.display = "none";
        // Hide the new streak form #new-streak-container
        newStreakContainer.style.display = "none";
        // Show the streaks container #streaks-container
        streaksContainer.style.display = "flex";
    }
});
// Grab the DOM elements
const streaksContainer = document.querySelector(".streaks-container");
const streaksDiv = document.querySelector(".streaks");
const addBtnOnStreaks = document.querySelector("#add-btn-streaks-section");
// When the add new streak button is clicked, hide the streaks container and show the new streak form
addBtnOnStreaks.addEventListener("click", () => {
    streaksContainer.style.display = "none";
    newStreakContainer.style.display = "flex";
});
// Create a function to render the streaks
const renderStreaks = (streakStore) => {
    // Clear the streaks container
    streaksDiv.innerHTML = "";
    // Create a fragment
    const fragment = document.createDocumentFragment();
    // Loop through the streaks array
    streakStore.forEach((streak) => {
        // Create a streak card
        const streakCard = document.createElement("div");
        // Create streak cards
        streakCard.classList.add("streak-card");
        streakCard.id = streak.id;
        streakCard.innerHTML = `
        <img src="${streak.image}" alt="${streak.name} image" />
        <h2>${streak.name}</h2>
        <p id="start-date">Started on: ${streak.startDate}</p>
        <button class="btn">View Streak</button>
      `;
        // Append the streak card to the fragment
        fragment.appendChild(streakCard);
    });
    // Append the fragment to the streaks container
    streaksDiv.appendChild(fragment);
};
// Render the streaks
renderStreaks(StreaksArray);
// Create a function to show the streak card as a pop up and add a close button
const showStreakCardAsPopUp = (e) => {
    // Check if the view streak button was clicked
    if (e.target.classList.contains("btn")) {
        // Grab the streak card
        const streakCard = e.target.parentElement;
        streakCard.classList.add("selected");
        // Create a close button
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("close-btn");
        closeBtn.setAttribute("title", "Close Streak");
        closeBtn.innerText = `x`;
        streakCard.appendChild(closeBtn);
        // Create a streak days element
        const streakId = streakCard.id;
        const streak = StreaksArray.find((streak) => streak.id === streakId);
        const streakDays = document.createElement("p");
        streakDays.id = "streak-days";
        streakDays.textContent = `Days: ${streak === null || streak === void 0 ? void 0 : streak.days}`;
        streakCard.children[2].insertAdjacentElement("afterend", streakDays);
        // hide view streak button
        e.target.style.display = "none";
        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.setAttribute("title", "Delete Streak");
        deleteBtn.innerText = `Delete Streak`;
        streakCard.appendChild(deleteBtn);
        // Scroll to the open streak card
        streakCard.scrollIntoView();
    }
};
streaksDiv.addEventListener("click", showStreakCardAsPopUp);
// Create a function to close the streak card pop up
const closeStreakCardPopUp = (e) => {
    // Check if the close button was clicked
    if (e.target.classList.contains("close-btn")) {
        // Grab the streak card
        const streakCard = e.target.parentElement;
        // Remove the class from the streak card
        streakCard.classList.remove("selected");
        // Remove the close button
        e.target.remove();
        // Remove the delete button
        const deleteBtn = streakCard.querySelector(".delete-btn");
        deleteBtn.remove();
        // Remove the days p tag
        const streakDays = streakCard.querySelector("#streak-days");
        streakDays.remove();
        // Show the view streak button
        const viewStreakBtn = streakCard.querySelector(".btn");
        viewStreakBtn.style.display = "flex";
        // Scroll to the streak card
        streakCard.scrollIntoView();
    }
};
streaksDiv.addEventListener("click", closeStreakCardPopUp);
// Function to delete the a streak
const deleteStreak = (e) => {
    // Check if the delete button was clicked
    if (e.target.classList.contains("delete-btn")) {
        // Grab the streak card
        const streakCard = e.target.parentElement;
        // Remove the streak from the streaks array
        StreaksArray.forEach((streak, index) => {
            if (streak.id === streakCard.id) {
                StreaksArray.splice(index, 1);
            }
        });
        // Render the streaks
        renderStreaks(StreaksArray);
        // Scroll to the streaks container
        streaksContainer.scrollIntoView();
    }
};
streaksDiv.addEventListener("click", deleteStreak);
