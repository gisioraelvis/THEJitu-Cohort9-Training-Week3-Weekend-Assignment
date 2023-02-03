import { IStreak } from "./interfaces";

// Streak Store, Array objects of type IStreak
export const StreaksArray: IStreak[] = [
  {
    id: "1",
    name: "Coding",
    image: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    startDate: "28/07/2020",
    days: 10,
  },
];

// Grap the DOM Elements
//Hero Section
const heroAddBtn = document.querySelector("#add-btn-hero") as HTMLDivElement;

//when hero add btn is clicked, hide the hero section and show the new streak form
heroAddBtn.addEventListener("click", () => {
  const heroSection = document.querySelector(
    "#hero-container"
  ) as HTMLDivElement;
  heroSection.style.display = "none";
});

// Form
// close-btn-streak-form
const closeBtnOnStreakForm = document.querySelector(
  "#close-btn-streak-form"
) as HTMLDivElement;
const newStreakForm = document.querySelector(
  ".new-streak-form"
) as HTMLFormElement;
const newStreakName = document.querySelector(
  "#streak-name"
) as HTMLInputElement;
const newStreakImg = document.querySelector("#streak-img") as HTMLInputElement;
const newStreakStartDate = document.querySelector(
  "#streak-start-date"
) as HTMLInputElement;
const newStreakSubmitBtn = document.querySelector(
  ".submit-btn"
) as HTMLButtonElement;

// Class for Streak
class Streak {
  id: string;
  name: string;
  image: string;
  startDate: string;
  days: number;

  constructor(name: string, image: string, startDate: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.image = image;
    this.startDate = startDate;
    this.days = 0;
  }

  // Calculate the days of the streak
  calculateDays() {
    const startDate = new Date(this.startDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.days = diffDays;
  }

  // Add the Streak to the Streak Store
  addStreak() {
    StreaksArray.unshift(this);
  }

  // static method to delete a streak
  static deleteStreak(id: string) {
    const index = StreaksArray.findIndex((streak) => streak.id === id);
    StreaksArray.splice(index, 1);
  }
}

// When the close btn on the streak form is clicked, hide the form and show the hero section
closeBtnOnStreakForm.addEventListener("click", () => {
  const heroSection = document.querySelector(
    "#hero-container"
  ) as HTMLDivElement;
  heroSection.style.display = "flex";
});

// Add a new Streak
newStreakSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Validate the form
  if (
    newStreakName.value === "" ||
    newStreakImg.value === "" ||
    newStreakStartDate.value === ""
  ) {
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
  } else {
    // save the image to the ./public/assets folder and get the path(local file system) upload from the browser from the local file system
    // const image: File | null = newStreakImg?.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(image ?? "");

    // // save image to the local file system and get the path
    // // This is on the browser side
    // reader.onload = () => {
    //   const imageSrc = reader.result;
    //   console.log(imageSrc);
    // };

    // Add the new Streak to the Streak Store
    const newStreak = new Streak(
      newStreakName.value,
      newStreakImg.value,
      newStreakStartDate.value
    );
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
    const heroSection = document.querySelector(
      "#hero-container"
    ) as HTMLDivElement;
    heroSection.style.display = "none";

    // Hide the new streak form #new-streak-container
    const newStreakContainer = document.querySelector(
      "#new-streak-container"
    ) as HTMLDivElement;
    newStreakContainer.style.display = "none";

    // Show the streaks container #streaks-container
    streaksContainer.style.display = "flex";
  }
});

// Grab the DOM elements
const streaksContainer = document.querySelector(
  ".streaks-container"
) as HTMLDivElement;
const streaksDiv = document.querySelector(".streaks") as HTMLDivElement;
const addNewStreakContainer = document.querySelector(
  ".add-new-streak-container"
) as HTMLDivElement;
const addBtnOnStreaks = document.querySelector(
  "#add-btn-streaks-section"
) as HTMLDivElement;

// When the add new streak button is clicked, hide the streaks container and show the new streak form
addBtnOnStreaks.addEventListener("click", () => {
  const newStreakContainer = document.querySelector(
    "#new-streak-container"
  ) as HTMLDivElement;
  newStreakContainer.style.display = "flex";
});

// Create a function to render the streaks
const renderStreaks = (streakStore: IStreak[]) => {
  // Clear the streaks container
  streaksDiv.innerHTML = "";

  // Create a fragment
  const fragment = document.createDocumentFragment();

  // Loop through the streaks array
  streakStore.forEach((streak: any) => {
    // Create a streak card
    const streakCard = document.createElement("div");

    // Create streak cards
    streakCard.classList.add("streak-card");
    streakCard.id = streak.id;
    streakCard.innerHTML = `
        <img src="${streak.image}" alt="${streak.name} image" />
        <h2>${streak.name}</h2>
        <p>Started on ${streak.date}</p>
        <p>Days: ${streak.days}</p>
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
const showStreakCardAsPopUp = (e: any) => {
  // Check if the view streak button was clicked
  if (e.target.classList.contains("btn")) {
    // Grab the streak card
    const streakCard = e.target.parentElement as HTMLDivElement;
    streakCard.classList.add("selected");

    // Create a close button
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.setAttribute("title", "Close Streak");
    closeBtn.innerText = `x`;
    streakCard.appendChild(closeBtn);

    // hide view streak button
    e.target.style.display = "none";

    // Create a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("title", "Delete Streak");
    deleteBtn.innerText = `Delete Streak`;
    streakCard.appendChild(deleteBtn);
  }
};
streaksDiv.addEventListener("click", showStreakCardAsPopUp);

// Create a function to close the streak card pop up
const closeStreakCardPopUp = (e: any) => {
  // Check if the close button was clicked
  if (e.target.classList.contains("close-btn")) {
    // Grab the streak card
    const streakCard = e.target.parentElement as HTMLDivElement;

    // Remove the class from the streak card
    streakCard.classList.remove("selected");

    // Remove the close button
    e.target.remove();

    // Remove the delete button
    const deleteBtn = streakCard.querySelector(
      ".delete-btn"
    ) as HTMLButtonElement;
    deleteBtn.remove();

    // Show the view streak button
    const viewStreakBtn = streakCard.querySelector(".btn") as HTMLButtonElement;
    viewStreakBtn.style.display = "flex";
  }
};
streaksDiv.addEventListener("click", closeStreakCardPopUp);

// Function to delete the a streak
const deleteStreak = (e: any) => {
  // Check if the delete button was clicked
  if (e.target.classList.contains("delete-btn")) {
    // Grab the streak card
    const streakCard = e.target.parentElement as HTMLDivElement;

    // Remove the streak from the streaks array
    StreaksArray.forEach((streak: IStreak, index: number) => {
      if (streak.id === streakCard.id) {
        StreaksArray.splice(index, 1);
      }
    });

    // Render the streaks
    renderStreaks(StreaksArray);
  }
};
streaksDiv.addEventListener("click", deleteStreak);
