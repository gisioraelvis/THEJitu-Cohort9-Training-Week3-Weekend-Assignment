/*
Streak Counter With HTML, CSS AND TS
Typescript Task 2
Streak Counter
We are Going to Build a Simple streak Counter. A streak Counter is a tracker for Good Habit. For
Example, if I Stop smoking today, I want to add that as an activity an in future, like next month I can see
how many days have gone without me smoking.
Below is a Guide to follow:
On Page Load the page should look like This
When you click the add Button
On Close Go Back to the First Frame
Adding a Streak by filling in a Name an image (URL) and a start date.
On Validation Display a Message on the DOM that disappears after 5 seconds
The message saying no Activities added yet on add should be Activities
On Adding Several Activities, The UI should look like this or Better
Add a Functionality to View a Streak by displaying a Pop UpOn Close, Close the Pop Up
Delete, Delete the Activity
What To add
Add a best streak Feature That Shows the activity with the best streak next to the header.
Use the Following
Arrays no Local Storage and should be private
Three or More Classes
At least one static method
Strong Typing
Interfaces, Have all interfaces on their one Folder.
Readable Code
The Functionality to calculate days of the streak should be in its own class, Same for the
functionality to Show the best Streak

<div class="new-streak-form">
            <form action="">
                <h1>Add A New Streak</h1>
                <div class="form-control">
                    <label for="streak-name">Streak Name:</label>
                    <input type="text" name="streak-name" id="streak-name" placeholder="Streak Name">
                </div>
                <div class="form-control">
                    <label for="streak-img">Streak Image:</label>
                    <input type="file" name="streak-img" id="streak-img" placeholder="Streak Image" accept="image/*">
                </div>
                <div class="form-control">
                    <label for="streak-start-date">Streak Start Date:</label>
                    <input type="date" name="streak-start-date" id="streak-start-date">
                </div>
                <div class="form-control">
                    <button type="submit" class="submit-btn">Add</button>
                </div>
            </form>
</div> 

On Validation Display a Message on the DOM that disappears after 5 seconds
The message saying no Activities added yet on add should be Activities

This a TS file that will be used to create a new streak
 */

// Grap the DOM Elements
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

// Interface for Streak
interface Streak {
  name: string;
  img: string;
  startDate: string;
}

// Class for Streak
class Streak implements Streak {
  name: string;
  img: string;
  startDate: string;
  constructor(name: string, img: string, startDate: string) {
    this.name = name;
    this.img = img;
    this.startDate = startDate;
  }
}

// Create an Array to hold the Streaks
const streaks: Streak[] = [];

// Create a new Streak
const newStreak = new Streak(
  newStreakName.value,
  newStreakImg.value,
  newStreakStartDate.value
);

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
    // Add the new Streak to the Streaks Array
    streaks.push(newStreak);
    // Clear the form
    newStreakName.value = "";
    newStreakImg.value = "";
    newStreakStartDate.value = "";
  }
});

// Display the Streaks
const displayStreaks = () => {
  // Check if there are any Streaks
  if (streaks.length === 0) {
    const noStreaksMsg = document.createElement("p");
    noStreaksMsg.textContent = "No Streaks Added Yet";
    noStreaksMsg.className = "no-streaks-msg";
    document.body.appendChild(noStreaksMsg);
  } else {
    // Show the Streaks
    const streaksContainer = document.createElement("div");
    streaksContainer.className = "streaks-container";
    streaks.forEach((streak) => {
      const streakItem = document.createElement("div");
      streakItem.className = "streak-item";
      const streakItemName = document.createElement("h2");
      streakItemName.textContent = streak.name;
      const streakItemImg = document.createElement("img");
      streakItemImg.src = streak.img;
      const streakItemStartDate = document.createElement("p");
      streakItemStartDate.textContent = streak.startDate;
      streakItem.appendChild(streakItemName);
      streakItem.appendChild(streakItemImg);
      streakItem.appendChild(streakItemStartDate);
      streaksContainer.appendChild(streakItem);
    });
    document.body.appendChild(streaksContainer);
  }
};
