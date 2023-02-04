import { StreaksArray } from "./streak-store.js";
export class Streak {
    constructor(name, image, startDate) {
        this.id = Math.random().toString();
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
    // Delete a streak
    deleteStreak(id) {
        const index = StreaksArray.findIndex((streak) => streak.id === id);
        StreaksArray.splice(index, 1);
    }
}
