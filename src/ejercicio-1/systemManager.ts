import chalk from 'chalk';
import fs from 'fs';

export class SystemManager {
  static getDirectoryFrom(user: string): string {
    return `./cardCollection/${user}`;
  }

  static getCardFilePath(user: string, cardID: number): string {
    return `${SystemManager.getDirectoryFrom(user)}/${cardID}.json`;
  }

  static cardExistsIn(cardFilePath: string): boolean {
    return fs.existsSync(cardFilePath);
  }

  static USER_DOESNT_HAVE_COLLECTION(user: string) {
    return chalk.red.bold(`User ${user} doesn't have a collection yet.`);
  }

  static CARD_NOT_FOUND(user: string) {
    return chalk.red.bold(`Card not found in ${user}'s collection.`);
  }

  static CARD_ALREADY_EXISTS(user: string) {
    return chalk.red.bold(`A card with the same ID already exists in ${user}'s collection.`);
  }

  static CARD_ADDED(user: string) {
    return chalk.green.bold(`Card successfully added to ${user}'s collection.`);
  }

  static CARD_UPDATED(user: string) {
    return chalk.green.bold(`Card successfully updated in ${user}'s collection.`);
  }

  static CARD_REMOVED(user: string) {
    return chalk.green.bold(`Card successfully removed from ${user}'s collection.`);
  }

  static ERROR_ADDING_CARD(user: string) {
    return new Error(chalk.red.bold(`An error occurred while adding the card to ${user}'s collection:`));
  }

  static ERROR_UPDATING_CARD(user: string) {
    return new Error(chalk.red.bold(`An error occurred while updating the card in ${user}'s collection:`));
  }

  static ERROR_REMOVING_CARD(user: string) {
    return new Error(chalk.red.bold(`An error occurred while removing the card from ${user}'s collection:`));
  }

  static ERROR_SHOWING_CARD(user: string) {
    return new Error(chalk.red.bold(`An error occurred while showing the card in ${user}'s collection:`));
  }

  static ERROR_LISTING_COLLECTION(user: string) {
    return new Error(chalk.red.bold(`An error occurred while listing the collection of ${user}:`));
  }

  static get CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS() {
    return new Error(chalk.red.bold('Las cartas de tipo Criatura deben tener fuerza y resistencia'));
  }

  static get PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS() {
    return new Error(chalk.red.bold('Las cartas de tipo Planeswalker deben tener marcas de lealtad'));
  }
}