/* 
    ----------Streak page----------
<!-- 
Streak Counter With HTML, CSS AND TS
Typescript Task 2
Streak Counter
We are Going to Build a Simple streak Counter. A streak Counter is a tracker for Good Habit. For
Example, if I Stop smoking today, I want to add that as an activity an in future, like next month I can see
how many days have gone without me smoking.
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
The Functionality to calculate days of the streak should be in its own class, 
Same for the functionality to Show the best Streak

This page is to show all the streaks added by the user
    The user should be able to add a streak

    A streak should have a name, an image and a start date
    The user should be able to delete a streak
    The user should be able to view a streak
    The user should be able to see the best streak
 -->

<body>
    <div class="streaks-container">
        <div class="add-new-streak-container">
            <div class="add-btn">
                <button class="btn" title="Add A New Streak">
                    <a href="/new-streak.html">+</a>
                </button>
            </div>
        </div>
        <div class="streaks">
            <h1>My Streaks</h1>
            <div class="streak-card selected">
                <img src="./public/assets/running.png" alt="running image">
                <h2>Running</h2>
                <p>Started on 12th March 2021</p>
                <p>Days: 3</p>
                <button class="btn">View Streak</button>
            </div>
            <div class="streak-card">
                <img src="./public/assets/running.png" alt="running image">
                <h2>Running</h2>
                <p>Started on 12th March 2021</p>
                <p>Days: 3</p>
                <button class="btn">View Streak</button>
            </div>
            <div class="streak-card">
                <img src="./public/assets/running.png" alt="running image">
                <h2>Running</h2>
                <p>Started on 12th March 2021</p>
                <p>Days: 3</p>
                <button class="btn">View Streak</button>
            </div>
            <div class="streak-card">
                <img src="./public/assets/running.png" alt="running image">
                <h2>Running</h2>
                <p>Started on 12th March 2021</p>
                <p>Days: 3</p>
                <button class="btn">View Streak</button>
            </div>
        </div>
    </div>
</body>
----------Streaks page----------
.streaks-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
  
  .streaks {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: space-evenly;
  }
  
  .streaks h1 {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 50px;
    margin-bottom: 20px;
  }
  
  .streak-card {
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 50px;
  }
  
  .streak-card img {
    width: 100px;
    height: 100px;
  }
  
  .streak-card h2 {
    color: #ff704c;
    font-size: 30px;
  }
  
  .streak-card button {
    height: 40px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ff704c;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  
  .streak-card button:hover {
    background-color: #e4512c;
    color: #fff;
  }
  

  Add a CSS to View a Streak as a Pop Up when view streak clicked(selected),
  Increase the size of the streak card and show it in the middle of the screen
  Blur the background and disable everything else in the background
  OnClose Close the Pop Up 
  
  .streak-card.selected {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 50px;
    z-index: 10;
  }
  
  .streak-card.selected img {
    width: 150px;
    height: 150px;
  }
  
  .streak-card.selected h2 {
    color: #ff704c;
    font-size: 30px;
  }
  
  .streak-card.selected button {
    height: 40px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ff704c;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  
  .streak-card.selected button:hover {
    background-color: #e4512c;
    color: #fff;
  }
  
  .streak-card.selected .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  
  .streak-card.selected .close-btn:hover {
    background-color: #f5967e;
  }
  
  .streak-card.selected .close-btn img {
    width: 15px;
    height: 15px;
  }
  
  .streak-card.selected .close-btn:active {
    background-color: #e4512c;
  }
  
  .streak-card.selected .close-btn:focus {
    outline: none;
  }
 */

// This is the streaks TS file

// Grab the DOM elements
const streaksContainer = document.querySelector(
  ".streaks-container"
) as HTMLDivElement;
const streaksDiv = document.querySelector(".streaks") as HTMLDivElement;
const addNewStreakContainer = document.querySelector(
  ".add-new-streak-container"
) as HTMLDivElement;
const addBtn = document.querySelector(".add-btn") as HTMLDivElement;
const addBtnBtn = document.querySelector(".add-btn .btn") as HTMLButtonElement;
const addBtnBtnA = document.querySelector(
  ".add-btn .btn a"
) as HTMLAnchorElement;

// Streak interface id(startdatestring), name, image, startDate, days
interface IStreak {
  id: string;
  name: string;
  image: string;
  date: string;
  days: number;
}

// array of streaks
const streaksArray: IStreak[] = [
  {
    id: "1",
    name: "Coding",
    image: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    date: "28/07/2020",
    days: 10,
  },
  {
    id: "2",
    name: "Reading",
    image: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    date: "01/08/2020",
    days: 7,
  },
  {
    id: "3",
    name: "Working Out",
    image: "https://image.flaticon.com/icons/svg/2729/2729006.svg",
    date: "02/08/2020",
    days: 6,
  },
  {
    id: "4",
    name: "Drawing",
    image: "https://image.flaticon.com/icons/svg/2729/2729004.svg",
    date: "03/08/2020",
    days: 5,
  },
  {
    id: "5",
    name: "Meditating",
    image: "https://image.flaticon.com/icons/svg/2729/2729008.svg",
    date: "04/08/2020",
    days: 4,
  },
  {
    id: "6",
    name: "Cycling",
    image: "https://image.flaticon.com/icons/svg/2729/2729009.svg",
    date: "05/08/2020",
    days: 3,
  },
  {
    id: "7",
    name: "Yoga",
    image: "https://image.flaticon.com/icons/svg/2729/2729010.svg",
    date: "06/08/2020",
    days: 2,
  },
  {
    id: "8",
    name: "Running",
    image: "https://image.flaticon.com/icons/svg/2729/2729011.svg",
    date: "07/08/2020",
    days: 1,
  },
];

// Create a function to render the streaks
const renderStreaks = (streaksArray: any) => {
  // Clear the streaks container
  streaksDiv.innerHTML = "";

  // Create a fragment
  const fragment = document.createDocumentFragment();

  // Loop through the streaks array
  streaksArray.forEach((streak: any) => {
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
renderStreaks(streaksArray);

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
    viewStreakBtn.style.display = "block";
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
    streaksArray.forEach((streak: any, index: number) => {
      if (streak.id === streakCard.id) {
        streaksArray.splice(index, 1);
      }
    });

    // Render the streaks
    renderStreaks(streaksArray);
  }
};
streaksDiv.addEventListener("click", deleteStreak);
