import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

import {
    ITEM_AGED_BRIE,
    ITEM_BACKSTAGE,
    ITEM_SULFURAS,
    ITEM_CONJURED
  } from '../app/constants';

describe('Gilded Rose::', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    // Test: General Rules
        // Test: The Quality should always decrease
        // Test: Once the sell by date has passed, Quality degrades twice as fast
        // Test: The Quality of an item is never negative
        // Test: The Quality of an item is never more than 50...but quality cannot increase for General
    describe('General rules', function () {
        describe('before sell by date, when items are processed', function () {
            it('sellIn and quality should be decremented by 1', function () {
                const gildedRose = new GildedRose([ new Item('foo', 1, 1) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(0);
            });
        })
        describe('on or past sell by date, when items are processed', function () {
            it('sellIn and quality should be decremented by 1', function () {
                const gildedRose = new GildedRose([ new Item('foo', 0, 1) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(0);
            });
    
            it('sellIn should be decremented by 1 and quality by 2', function () {
                const gildedRose = new GildedRose([ new Item('foo', -1, 10) ]);
                const items = gildedRose.updateQuality();
    
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(8);
            });
        });
        describe('quality limit, when items are processed', function () {
            it('sellIn and quality should be decremented by 1 but limit value of quality at 0', function () {
                const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(0);
            });
            it('sellIn should be decremented by 1 and quality by 2 but limit value of quality at 0', function () {
                const gildedRose = new GildedRose([ new Item('foo', -2, 1) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(-3);
                expect(items[0].quality).to.equal(0);
            });
        });
    });

    // Test for Aged Brie
        // it should increase the quality, the older it gets
        // quality increases twice IF sellIn < 0 AND sellIn < 6
        // quality does not go past 50
    describe(ITEM_AGED_BRIE, function () {
        describe('as sellIn decrements by 1', function () {
            it('should increment quality by 1 if sold before or on the sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_AGED_BRIE, 1, 2) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(3);
            });
    
            it('should increment quality by 2 if sold after the sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_AGED_BRIE, -1, 2) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(4);
            });
    
            it('should increment quality by 1 up to a max of 50 if sold before or on the sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_AGED_BRIE, 1, 50) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(50);
            });
    
            it('should increment quality by 1 up to a max of 50 if sold after the sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_AGED_BRIE, -1, 49) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(50);
            });
        })
    });
    
    // Test for Backstage passes to a TAFKAL80ETC concert
        // It should increase in quality, the older it gets
        // It should increase in quality by 2 when there are 10 days or less
        // It should increase in quality by 3 when 5 days or less
        // It should decrease quality to 0 on or past sell date
    describe(ITEM_BACKSTAGE, function () {
        describe('as sellIn decrements by 1', function () {
            it('should increment quality by 1', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_BACKSTAGE, 25, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(24);
                expect(items[0].quality).to.equal(11);
            });
            it('should increment quality by 2 when 10 days or less sell date remains', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_BACKSTAGE, 10, 10) ]);
                let items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(9);
                expect(items[0].quality).to.equal(12);

                items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(8);
                expect(items[0].quality).to.equal(14);
            });
            it('should increment quality by 3 when 5 days or less sell date remains', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_BACKSTAGE, 5, 10) ]);
                let items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(4);
                expect(items[0].quality).to.equal(13);

                items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(3);
                expect(items[0].quality).to.equal(16);
            });
        });
        describe('as sellIn is on or past the sell date', function () {
            it('should decrease quality to 0', function () {
                let gildedRose = new GildedRose([ new Item(ITEM_BACKSTAGE, 0, 10) ]);
                let items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(0);

                gildedRose = new GildedRose([ new Item(ITEM_BACKSTAGE, -5, 10) ]);
                items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-6);
                expect(items[0].quality).to.equal(0);
            })
        });
    });

    // Test for Sulfuras, Hand of Ragnaros
        // It should never update sellIn or quality
    describe(ITEM_SULFURAS, function () {
        describe('never has to be sold or decreases in quality', function () {
            it('even on sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_SULFURAS, 0, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(80);
            });
            it('even if past sell by date ', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_SULFURAS, -5, 10) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(-5);
                expect(items[0].quality).to.equal(80);
            });
            it('even if before sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_SULFURAS, 5, 10) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(5);
                expect(items[0].quality).to.equal(80);
            });
        });
    });

    // Test Conjured
        // It should decrement quality by 2 always
    describe(ITEM_CONJURED, function () {
        describe('as sellIn decrements by 1', function () {
            it('decrements quality by 2 before or on sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_CONJURED, 0, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(8);
            });
            it('decrements quality by 2 when past sell by date', function () {
                const gildedRose = new GildedRose([ new Item(ITEM_CONJURED, -1, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(8);
            });
        });
    });
});
