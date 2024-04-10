import "mocha";
import { expect } from "chai";
import { CardManager } from "../src/modificacion_pr11/cardManager.js";
import { Card, Color, Type, Rarity } from "../src/modificacion_pr11/card.js";
import { SystemManager as SM } from "../src/modificacion_pr11/systemManager.js";

describe("CardManager method addCard tests", () => {
  it("addCard should add a card successfully", (done) => {
    const cardManager = new CardManager();
    const card = new Card(
      2,
      "Card Name",
      5,
      Color.Red,
      Type.Creature,
      Rarity.Rare,
      "Rules Text",
      10,
      [3, 3]
    );
    const user = "user";

    cardManager.addCard(user, card, (_, message) => {
      if (message) {
        expect(message).to.be.equal(SM.CARD_ADDED(user));
        done();
      }
    });
  });
});

describe("CardManager method updateCard tests", () => {
  it("updateCard should update a card successfully", (done) => {
    const cardManager = new CardManager();
    const card = new Card(
      2,
      "Card Name",
      5,
      Color.Red,
      Type.Creature,
      Rarity.Rare,
      "Rules Text",
      10,
      [3, 3]
    );
    const user = "user";

    cardManager.updateCard(user, card, (_, message) => {
      if (message) {
        expect(message).to.be.equal(SM.CARD_UPDATED(user));
        done();
      }
    });
  });
});
