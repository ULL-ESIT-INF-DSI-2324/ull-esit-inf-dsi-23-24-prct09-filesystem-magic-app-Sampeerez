import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CardManager } from "./cardManager.js";
import { Card, Color, Type, Rarity } from "./card.js";

/**
 * Instance of CardManager.
 */
const cardManager = new CardManager();

/**
 * Command line interface for adding a card to the collection.
 */
yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a card to the collection",
    {
      user: {
        description: "user name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Card ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Card name",
        type: "string",
        demandOption: true,
      },
      manaCost: {
        description: "Mana cost",
        type: "number",
        demandOption: true,
      },
      color: {
        description: "Color of the card",
        type: "string",
        choices: [
          "White",
          "Blue",
          "Black",
          "Red",
          "Green",
          "Colorless",
          "Multicolor",
        ],
        demandOption: true,
      },
      cardType: {
        description: "Type of the card",
        type: "string",
        choices: [
          "Land",
          "Creature",
          "Enchantment",
          "Sorcery",
          "Instant",
          "Artifact",
          "Planeswalker",
        ],
        demandOption: true,
      },
      rarity: {
        description: "Rarity of the card",
        type: "string",
        choices: ["Common", "Uncommon", "Rare", "Mythic"],
        demandOption: true,
      },
      rulesText: {
        description: "Rules text of the card",
        type: "string",
        demandOption: true,
      },
      powerToughness: {
        description: "Power and Toughness of the card (for Creatures)",
        type: "array",
        coerce: (arg) => arg.map(Number),
      },
      loyalty: {
        description: "Loyalty of the card (for Planeswalkers)",
        type: "number",
      },
      marketValue: {
        description: "Market value of the card",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.cardType === "Creature" && argv.powerToughness === undefined) {
        throw new Error("Creatures needs the powerToughness attribute");
      }
      if (argv.cardType === "Planeswalker" && argv.loyalty === undefined) {
        throw new Error("Planeswalker needs the loyalty attribute");
      }
      const cardData: Card = new Card(
        argv.id,
        argv.name,
        argv.manaCost,
        argv.color as unknown as Color,
        argv.cardType as unknown as Type,
        argv.rarity as unknown as Rarity,
        argv.rulesText,
        argv.marketValue,
        argv.powerToughness,
        argv.loyalty,
      );
      cardManager.addCard(argv.user, cardData);
    },
  )
  .help().argv;

/**
 * Command line interface for updating a card in the collection.
 */
yargs(hideBin(process.argv))
  .command(
    "update",
    "Updates a card of the collection",
    {
      user: {
        description: "user name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Card ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Card name",
        type: "string",
        demandOption: true,
      },
      manaCost: {
        description: "Mana cost",
        type: "number",
        demandOption: true,
      },
      color: {
        description: "Color of the card",
        type: "string",
        choices: [
          "White",
          "Blue",
          "Black",
          "Red",
          "Green",
          "Colorless",
          "Multicolor",
        ],
        demandOption: true,
      },
      cardType: {
        description: "Type of the card",
        type: "string",
        choices: [
          "Land",
          "Creature",
          "Enchantment",
          "Sorcery",
          "Instant",
          "Artifact",
          "Planeswalker",
        ],
        demandOption: true,
      },
      rarity: {
        description: "Rarity of the card",
        type: "string",
        choices: ["Common", "Uncommon", "Rare", "Mythic"],
        demandOption: true,
      },
      rulesText: {
        description: "Rules text of the card",
        type: "string",
        demandOption: true,
      },
      powerToughness: {
        description: "Power and Toughness of the card (for Creatures)",
        type: "array",
        coerce: (arg) => arg.map(Number),
      },
      loyalty: {
        description: "Loyalty of the card (for Planeswalkers)",
        type: "number",
      },
      marketValue: {
        description: "Market value of the card",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.cardType === "Creature" && argv.powerToughness === undefined) {
        throw new Error("Creatures needs the powerToughness attribute");
      }
      if (argv.cardType === "Planeswalker" && argv.loyalty === undefined) {
        throw new Error("Planeswalker needs the loyalty attribute");
      }
      const cardData: Card = new Card(
        argv.id,
        argv.name,
        argv.manaCost,
        argv.color as unknown as Color,
        argv.cardType as unknown as Type,
        argv.rarity as unknown as Rarity,
        argv.rulesText,
        argv.marketValue,
        argv.powerToughness,
        argv.loyalty,
      );
      cardManager.updateCard(argv.user, cardData);
    },
  )
  .help().argv;

/**
 * Command line interface for removing a card from the collection.
 */
yargs(hideBin(process.argv))
  .command(
    "remove",
    "Removes a card of the collection",
    {
      user: {
        description: "user name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Card ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      cardManager.removeCard(argv.user, argv.id);
    },
  )
  .help().argv;

/**
 * Command line interface for showing a card from the collection.
 */
yargs(hideBin(process.argv))
  .command(
    "show",
    "Show a card of the collection",
    {
      user: {
        description: "user name",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Card ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      cardManager.showCard(argv.user, argv.id);
    },
  )
  .help().argv;

/**
 * Command line interface for listing the collection.
 */
yargs(hideBin(process.argv))
  .command(
    "list",
    "List the collection",
    {
      user: {
        description: "user name",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      cardManager.listCollection(argv.user);
    },
  )
  .help().argv;
