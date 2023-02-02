/**
 * Streak interface
 * @interface IStreak
 * @property {string} id - The id of the streak
 * @property {string} name - The name of the streak
 * @property {string} image - The image of the streak
 * @property {string} startDate - The start date of the streak
 * @property {number} days - The number of days of the streak
 */
export interface IStreak {
  id: string;
  name: string;
  image: string;
  startDate: string;
  days: number;
}
