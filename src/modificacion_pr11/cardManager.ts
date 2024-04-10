import chalk from "chalk";
import fs from "fs";
import { Card } from "./card.js";
import { SystemManager as SM } from "./systemManager.js";

/**
 * Class representing a card manager.
 */
export class CardManager {
  /**
   * Create a card manager.
   */
  constructor() {}

  /**
   * Add a card to a user's collection.
   * @param {string} user - The user's name.
   * @param {Card} card - The card to add.
   * @param {function} callback - The callback to execute after adding the card.
   * The callback function should take two parameters: an Error object (or null if no error occurred) and a message string.
   */
  public addCard(user: string, card: Card, callback: (err: Error | null, message: string | null) => void): void {
    const userDirectory = SM.getDirectoryFrom(user);
    const cardFilePath = SM.getCardFilePath(user, card.getId());
  
    fs.access(userDirectory, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(userDirectory, { recursive: true }, (err) => {
          if (err) {
            callback(SM.ERROR_CREATING_DIRECTORY(user), null);
            return;
          }
        });
      }
  
      fs.access(cardFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
            if (err) {
              callback(SM.ERROR_WRITING_CARD_FILE(user), null);
              return;
            }
            callback(null, SM.CARD_ADDED(user));
          });
        } else {
          callback(null, SM.CARD_ALREADY_EXISTS(user));
        }
      });
    });
  }

  /**
   * Update a card in a user's collection.
   * @param {string} user - The user's name.
   * @param {Card} card - The card to update.
   * @param {function} callback - The callback to execute after updating the card.
   * The callback function should take two parameters: an Error object (or null if no error occurred) and a message string.
   */
  public updateCard(user: string, card: Card, callback: (err: Error | null, message: string | null) => void): void {
    const cardFilePath = SM.getCardFilePath(user, card.getId());
  
    fs.access(cardFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        callback(SM.ERROR_CARD_NOT_FOUND(user), null);
      } else {
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(SM.ERROR_WRITING_CARD_FILE(user), null);
            return;
          }
          callback(null, SM.CARD_UPDATED(user));
        });
      }
    });
  }

  /**
   * Remove a card from a user's collection.
   * @param {string} user - The user's name.
   * @param {number} cardID - The ID of the card to remove.
   */
  public removeCard(user: string, cardID: number): void {
    const cardFilePath = SM.getCardFilePath(user, cardID);

    try {
      if (SM.cardExistsIn(cardFilePath)) {
        fs.unlinkSync(cardFilePath);
        console.log(SM.CARD_REMOVED(user));
      } else {
        console.log(SM.ERROR_CARD_NOT_FOUND(user));
      }
    } catch (error) {
      console.error(SM.ERROR_REMOVING_CARD(user), error);
    }
  }

  /**
   * Show a card from a user's collection.
   * @param {string} user - The user's name.
   * @param {number} cardID - The ID of the card to show.
   */
  public showCard(user: string, cardID: number): void {
    const cardFilePath = SM.getCardFilePath(user, cardID);

    try {
      if (SM.cardExistsIn(cardFilePath)) {
        const content = fs.readFileSync(cardFilePath).toString();
        this.printCard(content);
      } else {
        console.log(SM.ERROR_CARD_NOT_FOUND(user));
      }
    } catch (error) {
      console.error(SM.ERROR_SHOWING_CARD(user), error);
    }
  }

  /**
   * List all cards in a user's collection.
   * @param {string} user - The user's name.
   */
  public listCollection(user: string): void {
    const dirPath = SM.getDirectoryFrom(user);

    try {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        if (files.length === 0) {
          console.log(SM.USER_DOESNT_HAVE_COLLECTION(user));
        } else {
          files.forEach((file) => {
            const content = fs.readFileSync(`${dirPath}/${file}`).toString();
            this.printCard(content);
          });
        }
      } else {
        console.log(SM.USER_DOESNT_HAVE_COLLECTION(user));
      }
    } catch (error) {
      console.error(SM.ERROR_LISTING_COLLECTION(user), error);
    }
  }

  /**
   * Format a card for printing.
   * @param {string} card - The card to format.
   * @return {string} The formatted card.
   */
  private formatCard(card: string): string {
    const {
      id,
      nombre,
      costeDeMana,
      color,
      lineaDeTipo,
      rareza,
      textoDeReglas,
      valorDeMercado,
      fuerzaYResistencia,
      marcasDeLealtad,
    } = JSON.parse(card);
    let contenido = `
    ID: ${id}
    Nombre: ${nombre}
    Costo de mana: ${costeDeMana}
    Color: ${color}
    Tipo: ${lineaDeTipo}
    Rareza: ${rareza}
    Texto de reglas: ${textoDeReglas}
    Valor de mercado: ${valorDeMercado}`;

    if (lineaDeTipo === "Creature")
      contenido += `\n    Fuerza/Resistencia: ${fuerzaYResistencia.join("/")}`;
    else if (lineaDeTipo === "Planeswalker")
      contenido += `\n    Marcas de lealtad: ${marcasDeLealtad}`;
    return contenido;
  }

  /**
   * Print a card.
   * @param {string} card - The card to print.
   */
  private printCard(card: string): void {
    const JSONcard = JSON.parse(card);
    const cardInfo = this.formatCard(card);
    switch (JSONcard.color) {
      case "White":
        console.log(chalk.white.bold(cardInfo));
        break;
      case "Blue":
        console.log(chalk.blue.bold(cardInfo));
        break;
      case "Black":
        console.log(chalk.black.bold(cardInfo));
        break;
      case "Red":
        console.log(chalk.red.bold(cardInfo));
        break;
      case "Green":
        console.log(chalk.green.bold(cardInfo));
        break;
      case "Colorless":
        console.log(chalk.gray.bold(cardInfo));
        break;
      case "Multicolor":
        const colors = [
          chalk.red,
          chalk.green,
          chalk.yellow,
          chalk.blue,
          chalk.magenta,
          chalk.cyan,
        ];
        let coloredText = "";
        for (let i = 0; i < cardInfo.length; i++) {
          coloredText += colors[i % colors.length](cardInfo[i]);
        }
        console.log(coloredText);
        break;
      default:
        console.log(chalk.red.bold("Unknown color"));
        break;
    }
  }
}
