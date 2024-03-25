import { SystemManager } from "../src/ejercicio-1/systemManager.js";
import "mocha";
import { expect } from "chai";
import fs from "fs";
import chalk from "chalk";
import { Card, Color, Type, Rarity } from "../src/ejercicio-1/card.js";
import sinon from "sinon";

describe("Card", () => {
  describe("constructor", () => {
    it("should throw an error if the card is a creature and does not have power and toughness", () => {
      expect(
        () =>
          new Card(
            1,
            "Card Name",
            3,
            Color.Blue,
            Type.Creature,
            Rarity.Common,
            "Card rules text",
            10,
            undefined,
            undefined,
          ),
      ).to.throw(
        SystemManager.CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS.message,
      );
    });

    it("should throw an error if the card is a planeswalker and does not have loyalty marks", () => {
      expect(
        () =>
          new Card(
            1,
            "Card Name",
            3,
            Color.Blue,
            Type.Planeswalker,
            Rarity.Common,
            "Card rules text",
            10,
            undefined,
            undefined,
          ),
      ).to.throw(
        SystemManager.PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS.message,
      );
    });
  });
});

describe("Magic Cards", () => {
  it("should create a new Card instance", () => {
    const card = new Card(
      1,
      "Nombre de la carta",
      3,
      Color.Blue,
      Type.Land,
      Rarity.Common,
      "Texto de las reglas de la carta",
      10,
    );
    expect(card).to.be.an.instanceOf(Card);
    expect(card.getId()).to.equal(1);
    expect(card.getNombre()).to.equal("Nombre de la carta");
    expect(card.getCosteDeMana()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getTipo()).to.equal(Type.Land);
    expect(card.getRareza()).to.equal(Rarity.Common);
    expect(card.getTextoDeReglas()).to.equal("Texto de las reglas de la carta");
    expect(card.getValorDeMercado()).to.equal(10);
    expect(card.getFuerzaYResistencia()).to.be.null;
    expect(card.getMarcasDeLealtad()).to.be.null;
  });

  it("should create a new Card instance with FuerzaYResistencia", () => {
    const card = new Card(
      1,
      "Nombre de la carta",
      3,
      Color.Blue,
      Type.Creature,
      Rarity.Common,
      "Texto de las reglas de la carta",
      10,
      [2, 2],
    );
    expect(card).to.be.an.instanceOf(Card);
    expect(card.getId()).to.equal(1);
    expect(card.getNombre()).to.equal("Nombre de la carta");
    expect(card.getCosteDeMana()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getTipo()).to.equal(Type.Creature);
    expect(card.getRareza()).to.equal(Rarity.Common);
    expect(card.getTextoDeReglas()).to.equal("Texto de las reglas de la carta");
    expect(card.getValorDeMercado()).to.equal(10);
    expect(card.getFuerzaYResistencia()).to.deep.equal([2, 2]);
    expect(card.getMarcasDeLealtad()).to.be.null;
  });

  it("should create a new Card instance with MarcasDeLealtad", () => {
    const card = new Card(
      1,
      "Nombre de la carta",
      3,
      Color.Blue,
      Type.Planeswalker,
      Rarity.Common,
      "Texto de las reglas de la carta",
      10,
      null,
      3,
    );
    expect(card).to.be.an.instanceOf(Card);
    expect(card.getId()).to.equal(1);
    expect(card.getNombre()).to.equal("Nombre de la carta");
    expect(card.getCosteDeMana()).to.equal(3);
    expect(card.getColor()).to.equal(Color.Blue);
    expect(card.getTipo()).to.equal(Type.Planeswalker);
    expect(card.getRareza()).to.equal(Rarity.Common);
    expect(card.getTextoDeReglas()).to.equal("Texto de las reglas de la carta");
    expect(card.getValorDeMercado()).to.equal(10);
    expect(card.getFuerzaYResistencia()).to.be.null;
    expect(card.getMarcasDeLealtad()).to.equal(3);
  });
});

describe("SystemManager", () => {
  describe("getDirectoryFrom", () => {
    it("should return the correct directory for a user", () => {
      expect(SystemManager.getDirectoryFrom("user1")).to.equal(
        "./cardCollection/user1",
      );
    });
  });

  describe("getCardFilePath", () => {
    it("should return the correct file path for a card", () => {
      expect(SystemManager.getCardFilePath("user1", 1)).to.equal(
        "./cardCollection/user1/1.json",
      );
    });
  });

  describe("cardExistsIn", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should return true if the card exists", () => {
      sinon.stub(fs, "existsSync").returns(true);
      expect(SystemManager.cardExistsIn("./cardCollection/user1/1.json")).to.be
        .true;
    });

    it("should return false if the card does not exist", () => {
      sinon.stub(fs, "existsSync").returns(false);
      expect(SystemManager.cardExistsIn("./cardCollection/user1/1.json")).to.be
        .false;
    });
  });

  describe("USER_DOESNT_HAVE_COLLECTION", () => {
    it("should return the correct message", () => {
      expect(SystemManager.USER_DOESNT_HAVE_COLLECTION("user1")).to.equal(
        chalk.red.bold(`User user1 doesn't have a collection yet.`),
      );
    });
  });

  describe("CARD_NOT_FOUND", () => {
    it("should return the correct message", () => {
      expect(SystemManager.CARD_NOT_FOUND("user1")).to.equal(
        chalk.red.bold(`Card not found in user1's collection.`),
      );
    });
  });

  describe("CARD_ALREADY_EXISTS", () => {
    it("should return the correct message", () => {
      expect(SystemManager.CARD_ALREADY_EXISTS("user1")).to.equal(
        chalk.red.bold(
          `A card with the same ID already exists in user1's collection.`,
        ),
      );
    });
  });

  describe("CARD_ADDED", () => {
    it("should return the correct message", () => {
      expect(SystemManager.CARD_ADDED("user1")).to.equal(
        chalk.green.bold(`Card successfully added to user1's collection.`),
      );
    });
  });

  describe("CARD_UPDATED", () => {
    it("should return the correct message", () => {
      expect(SystemManager.CARD_UPDATED("user1")).to.equal(
        chalk.green.bold(`Card successfully updated in user1's collection.`),
      );
    });
  });

  describe("CARD_REMOVED", () => {
    it("should return the correct message", () => {
      expect(SystemManager.CARD_REMOVED("user1")).to.equal(
        chalk.green.bold(`Card successfully removed from user1's collection.`),
      );
    });
  });

  describe("ERROR_ADDING_CARD", () => {
    it("should return the correct error", () => {
      expect(SystemManager.ERROR_ADDING_CARD("user1")).to.eql(
        new Error(
          chalk.red.bold(
            `An error occurred while adding the card to user1's collection:`,
          ),
        ),
      );
    });
  });

  describe("ERROR_UPDATING_CARD", () => {
    it("should return the correct error", () => {
      expect(SystemManager.ERROR_UPDATING_CARD("user1")).to.eql(
        new Error(
          chalk.red.bold(
            `An error occurred while updating the card in user1's collection:`,
          ),
        ),
      );
    });
  });

  describe("ERROR_REMOVING_CARD", () => {
    it("should return the correct error", () => {
      expect(SystemManager.ERROR_REMOVING_CARD("user1")).to.eql(
        new Error(
          chalk.red.bold(
            `An error occurred while removing the card from user1's collection:`,
          ),
        ),
      );
    });
  });

  describe("ERROR_SHOWING_CARD", () => {
    it("should return the correct error", () => {
      expect(SystemManager.ERROR_SHOWING_CARD("user1")).to.eql(
        new Error(
          chalk.red.bold(
            `An error occurred while showing the card in user1's collection:`,
          ),
        ),
      );
    });
  });

  describe("ERROR_LISTING_COLLECTION", () => {
    it("should return the correct error", () => {
      expect(SystemManager.ERROR_LISTING_COLLECTION("user1")).to.eql(
        new Error(
          chalk.red.bold(
            `An error occurred while listing the collection of user1:`,
          ),
        ),
      );
    });
  });

  describe("CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS", () => {
    it("should return the correct error", () => {
      expect(SystemManager.CREATURE_CARD_MUST_HAVE_POWER_AND_TOUGHNESS).to.eql(
        new Error(
          chalk.red.bold(
            "Las cartas de tipo Criatura deben tener fuerza y resistencia",
          ),
        ),
      );
    });
  });

  describe("PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS", () => {
    it("should return the correct error", () => {
      expect(SystemManager.PLANESWALKER_CARD_MUST_HAVE_LOYALTY_MARKS).to.eql(
        new Error(
          chalk.red.bold(
            "Las cartas de tipo Planeswalker deben tener marcas de lealtad",
          ),
        ),
      );
    });
  });
});
