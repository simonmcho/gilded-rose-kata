import { expect } from 'chai';
import { Item, GildedRose } from '../../gilded-rose';
import { AgedBrie } from '../aged-brie';

import { ITEM_AGED_BRIE } from '../../constants';

describe('Aged Brie Model', function () {
  it('contains correct properties upon instantiation', function () {
    const agedBrie = new AgedBrie(ITEM_AGED_BRIE, 5, 10);
    expect(agedBrie.name).to.equal(ITEM_AGED_BRIE);
    expect(agedBrie.sellIn).to.equal(5);
    expect(agedBrie.quality).to.equal(10);
  });
  it('should increment quality by 1 if sold before or on the sell by date', function () {
    const agedBrie = new AgedBrie(ITEM_AGED_BRIE, 5, 10);
    agedBrie.processItem();
    expect(agedBrie.name).to.equal(ITEM_AGED_BRIE);
    expect(agedBrie.sellIn).to.equal(4);
    expect(agedBrie.quality).to.equal(11);
  });

  it('should increment quality by 2 if sold after the sell by date', function () {
      const agedBrie = new AgedBrie(ITEM_AGED_BRIE, -1, 10);
      agedBrie.processItem();
      expect(agedBrie.name).to.equal(ITEM_AGED_BRIE);
      expect(agedBrie.sellIn).to.equal(-2);
      expect(agedBrie.quality).to.equal(12);
  });

  it('should increment quality by 1 up to a max of 50 if sold before or on the sell by date', function () {
      const agedBrie = new AgedBrie(ITEM_AGED_BRIE, 0, 50);
      agedBrie.processItem();
      expect(agedBrie.name).to.equal(ITEM_AGED_BRIE);
      expect(agedBrie.sellIn).to.equal(-1);
      expect(agedBrie.quality).to.equal(50);
  });

  it('should increment quality by 1 up to a max of 50 if sold after the sell by date', function () {
      const agedBrie = new AgedBrie(ITEM_AGED_BRIE, -1, 49);
      agedBrie.processItem();
      expect(agedBrie.name).to.equal(ITEM_AGED_BRIE);
      expect(agedBrie.sellIn).to.equal(-2);
      expect(agedBrie.quality).to.equal(50);
  });
});
