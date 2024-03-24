import chalk from 'chalk';
import fs from 'fs';
import { Card, Color, Type } from './card.js';
import { SystemManager as SM } from './systemManager.js';

export class CardManager {
  constructor() {}

  public addCard(user: string, card: Card): void {
    const userDirectory = SM.getDirectoryFrom(user);
    const cardFilePath = SM.getCardFilePath(user, card.getId());

    try {
      if (!fs.existsSync(userDirectory)) fs.mkdirSync(userDirectory, { recursive: true });

      if (SM.cardExistsIn(cardFilePath)) {
        console.log(SM.CARD_ALREADY_EXISTS(user));
      } else {
        fs.writeFileSync(cardFilePath, JSON.stringify(card));
        console.log(SM.CARD_ADDED(user));
      }
    } catch (error) {
      console.error(SM.ERROR_ADDING_CARD(user), error);
    }
  }

  public updateCard(user: string, card: Card): void {
    const cardFilePath = SM.getCardFilePath(user, card.getId());

    try {
      if (SM.cardExistsIn(cardFilePath)) {
        fs.writeFileSync(cardFilePath, JSON.stringify(card));
        console.log(SM.CARD_UPDATED(user));
      } else {
        console.log(SM.CARD_NOT_FOUND(user));
      }
    } catch (error) {
      console.error(SM.ERROR_UPDATING_CARD(user), error);
    }
  }

  public removeCard(user: string, cardID: number): void {
    const cardFilePath = SM.getCardFilePath(user, cardID);

    try {
      if (SM.cardExistsIn(cardFilePath)) {
        fs.unlinkSync(cardFilePath);
        console.log(SM.CARD_REMOVED(user));
      } else {
        console.log(SM.CARD_NOT_FOUND(user));
      }
    } catch (error) {
      console.error(SM.ERROR_REMOVING_CARD(user), error);
    }
  }

  public showCard(user: string, cardID: number): void {
    const cardFilePath = SM.getCardFilePath(user, cardID);

    try {
      if (SM.cardExistsIn(cardFilePath)) {
        const content = fs.readFileSync(cardFilePath).toString();
        this.printCard(content);
      } else {
        console.log(SM.CARD_NOT_FOUND(user));
      }
    } catch (error) {
      console.error(SM.ERROR_SHOWING_CARD(user), error);
    }
  }

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

  private formatCard(card: string): string {
    const { id, nombre, costeDeMana, color, lineaDeTipo, rareza, textoDeReglas, valorDeMercado, fuerzaYResistencia, marcasDeLealtad } = JSON.parse(card);
    let contenido = `
    ID: ${id}
    Nombre: ${nombre}
    Costo de mana: ${costeDeMana}
    Color: ${color}
    Tipo: ${lineaDeTipo}
    Rareza: ${rareza}
    Texto de reglas: ${textoDeReglas}
    Valor de mercado: ${valorDeMercado}`;
  
    if (lineaDeTipo === "Creature") contenido += `\n    Fuerza/Resistencia: ${fuerzaYResistencia.join('/')}`;
    else if (lineaDeTipo === "Planeswalker") contenido += `\n    Marcas de lealtad: ${marcasDeLealtad}`;
    return contenido;
  }
  
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
        const colors = [chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan];
        let coloredText = '';
        for (let i = 0; i < cardInfo.length; i++) {
          coloredText += colors[i % colors.length](cardInfo[i]);
        }
        console.log(coloredText);
        break;
      default:
        console.log(chalk.red.bold('Unknown color'));
        break;
    }
  }
}