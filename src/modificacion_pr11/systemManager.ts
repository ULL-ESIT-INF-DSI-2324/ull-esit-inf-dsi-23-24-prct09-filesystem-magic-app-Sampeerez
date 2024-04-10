import chalk from "chalk";
import fs from "fs";

/**
 * Class representing a system manager.
 */
export class SystemManager {
  /**
   * Get the directory for a user's card collection.
   * @param {string} user - The user's name.
   * @return {string} The directory for the user's card collection.
   */
  static getDirectoryFrom(user: string): string {
    return `./cardCollection/${user}`;
  }

  /**
   * Get the file path for a card in a user's collection.
   * @param {string} user - The user's name.
   * @param {number} cardID - The ID of the card.
   * @return {string} The file path for the card.
   */
  static getCardFilePath(user: string, cardID: number): string {
    return `${SystemManager.getDirectoryFrom(user)}/${cardID}.json`;
  }

  /**
   * Check if a card exists in a user's collection.
   * @param {string} cardFilePath - The file path for the card.
   * @return {boolean} True if the card exists, false otherwise.
   */
  static cardExistsIn(cardFilePath: string): boolean {
    return fs.existsSync(cardFilePath);
  }

  /**
   * Message for when a user doesn't have a collection.
   * @param {string} user - The user's name.
   * @return {string} The message.
   */
  static USER_DOESNT_HAVE_COLLECTION(user: string) {
    return chalk.red.bold(`User ${user} doesn't have a collection yet.`);
  }

  /**
   * Message for when a card already exists in a user's collection.
   * @param {string} user - The user's name.
   * @return {string} The message.
   */
  static CARD_ALREADY_EXISTS(user: string) {
    return chalk.red.bold(
      `A card with the same ID already exists in ${user}'s collection.`,
    );
  }

  /**
   * Message for when a card is added to a user's collection.
   * @param {string} user - The user's name.
   * @return {string} The message.
   */
  static CARD_ADDED(user: string) {
    return chalk.green.bold(`Card successfully added to ${user}'s collection.`);
  }

  /**
   * Message for when a card is updated in a user's collection.
   * @param {string} user - The user's name.
   * @return {string} The message.
   */
  static CARD_UPDATED(user: string) {
    return chalk.green.bold(
      `Card successfully updated in ${user}'s collection.`,
    );
  }

  /**
   * Message for when a card is removed from a user's collection.
   * @param {string} user - The user's name.
   * @return {string} The message.
   */
  static CARD_REMOVED(user: string) {
    return chalk.green.bold(
      `Card successfully removed from ${user}'s collection.`,
    );
  }

  /**
   * Error for when there is an issue adding a card to a user's collection.
   * @param {string} user - The user's name.
   * @return {Error} The error.
   */
  static ERROR_ADDING_CARD(user: string) {
    return new Error(
      chalk.red.bold(
        `An error occurred while adding the card to ${user}'s collection:`,
      ),
    );
  }

  /**
   * Error for when there is an issue updating a card in a user's collection.
   * @param {string} user - The user's name.
   * @return {Error} The error.
   */
  static ERROR_UPDATING_CARD(user: string) {
    return new Error(
      chalk.red.bold(
        `An error occurred while updating the card in ${user}'s collection:`,
      ),
    );
  }

  /**
   * Error for when there is an issue removing a card from a user's collection.
   * @param {string} user - The user's name.
   * @return {Error} The error.
   */
  static ERROR_REMOVING_CARD(user: string) {
    return new Error(
      chalk.red.bold(
        `An error occurred while removing the card from ${user}'s collection:`,
      ),
    );
  }

  /**
   * Error for when there is an issue showing a card in a user's collection.
   * @param {string} user - The user's name.
   * @return {Error} The error.
   */
  static ERROR_SHOWING_CARD(user: string) {
    return new Error(
      chalk.red.bold(
        `An error occurred while showing the card in ${user}'s collection:`,
      ),
    );
  }

  /**
   * Error for when there is an issue listing a user's collection.
   * @param {string} user - The user's name.
   * @return {Error} The error.
   */
  static ERROR_LISTING_COLLECTION(user: string) {
    return new Error(
      chalk.red.bold(
        `An error occurred while listing the collection of ${user}:`,
      ),
    );
  }

  /**
   * Message for when a card is not found in a user's collection.
   * @param {string} user - The user's name.
   * @return {string} The message.
   */
  static ERROR_CARD_NOT_FOUND(user: string) {
    return new Error(
      chalk.red.bold(
        `Card not found in ${user}'s collection.`,
      ),
    );
  }

  /**
   * Returns a custom Error when an error occurs while creating the directory.
   * @param user - The user's name.
   * @returns {Error} - The custom error message.
   */
  static ERROR_CREATING_DIRECTORY(user: string): Error {
    return new Error(
      chalk.red.bold(
        `An error occurred while creating the directory for ${user}'s collection:`,
      ),
    );
  }

  /**
   * Returns a custom Error when an error occurs while writing the card file.
   * @param user - The user's name.
   * @returns {Error} - The custom error message.
   */
  static ERROR_WRITING_CARD_FILE(user: string): Error {
    return new Error(
      chalk.red.bold(
        `An error occurred while writing the card file to ${user}'s collection:`,
      ),
    );
  }

  /**
   * Error for when a creature card doesn't have power and toughness.
   * @return {Error} The error.
   */
  static get CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS() {
    return new Error(
      chalk.red.bold(
        "Las cartas de tipo Criatura deben tener fuerza y resistencia",
      ),
    );
  }

  /**
   * Error for when a planeswalker card doesn't have loyalty marks.
   * @return {Error} The error.
   */
  static get PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS() {
    return new Error(
      chalk.red.bold(
        "Las cartas de tipo Planeswalker deben tener marcas de lealtad",
      ),
    );
  }
}
