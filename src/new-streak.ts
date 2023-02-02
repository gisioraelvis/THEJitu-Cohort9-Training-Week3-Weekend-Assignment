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
import { IStreak } from "./interfaces.js";
import { StreakStore } from "./store.js";

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

// Class for Streak
class Streak implements IStreak {
  id: string;
  name: string;
  image: string;
  startDate: string;
  days: number;

  constructor(name: string, image: string, startDate: string) {
    this.id = startDate;
    this.name = name;
    this.image = image;
    this.startDate = startDate;
    this.days = 0;
  }

  // Calculate the days of the streak
  calculateDays() {
    const today = new Date();
    const startDate = new Date(this.startDate);
    const diff = today.getTime() - startDate.getTime();
    this.days = Math.ceil(diff / (1000 * 3600 * 24));
  }

  // log the streak
  logStreak() {
    console.log(this);
  }

  // add the streak to the Streak Store
  addStreak() {
    StreakStore.unshift(this);

    // Navigate to the Streaks Page without reloading the page but change to the Streaks Page
    window.history.pushState({}, "", "/streaks");
  
  }
}

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
    // Add the new Streak to the Streak Store
    const newStreak = new Streak(
      newStreakName.value,
      newStreakImg.value,
      newStreakStartDate.value
    );
    newStreak.calculateDays();
    newStreak.addStreak();
    newStreak.logStreak();

    // Clear the form
    newStreakName.value = "";
    newStreakImg.value = "";
    newStreakStartDate.value = "";
  }
});
