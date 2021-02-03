import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    // Test: General Rules
        // Test: The Quality should always decrease
        // Test: Once the sell by date has passed, Quality degrades twice as fast
        // Test: The Quality of an item is never negative
        // Test: The Quality of an item is never more than 50
    describe('General rules', function () {
        describe('before sell past date', function () {
            it('should decrement sellIn and quality by 1', function () {
                const gildedRose = new GildedRose([ new Item('foo', 1, 1) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(0);
            });
        })
        describe('on or past sell past date', function () {
            it('should decrement sellIn and quality by 1', function () {
                const gildedRose = new GildedRose([ new Item('foo', 0, 1) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(0);
            });
    
            it('should decrement sellIn by 1 and quality by 2', function () {
                const gildedRose = new GildedRose([ new Item('foo', -1, 10) ]);
                const items = gildedRose.updateQuality();
    
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(8);
            });
        });
        describe('quality limit', function () {
            it('should decrement sellIn by 1 but limit value of quality at 0', function () {
                const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(0);
            });
            it('should decrement sellIn by 2 but limit value of quality at 0', function () {
                const gildedRose = new GildedRose([ new Item('foo', -2, 0) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(-3);
                expect(items[0].quality).to.equal(0);
            });
        });

        // it('check quality cap', function () {
        //     const gildedRose = new GildedRose([ new Item('foo', 0, 55) ]);
        //     let items = gildedRose.updateQuality();
        //     expect(items[0].sellIn).to.equal(-1);
        //     expect(items[0].quality).to.equal(53);
        // });
    });

    // Test for Aged Brie
        // Test 
        // it should increase the quality, the older it gets
        // quality increases twice IF sellIn < 0 AND sellIn < 6
    const AGED_BRIE = 'Aged Brie';
    describe(AGED_BRIE, function () {
        describe('as sellIn decrements by 1', function () {
            it('should increment quality by 1 if sold before or on the sell past date', function () {
                const gildedRose = new GildedRose([ new Item(AGED_BRIE, 1, 2) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(3);
            });
    
            it('should increment quality by 2 if sold after the sell past date', function () {
                const gildedRose = new GildedRose([ new Item(AGED_BRIE, -1, 2) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(4);
            });
    
            it('should increment quality by 1 up to a max of 50 if sold before or on the sell past date', function () {
                const gildedRose = new GildedRose([ new Item(AGED_BRIE, 1, 50) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(0);
                expect(items[0].quality).to.equal(50);
            });
    
            it('should increment quality by 1 up to a max of 50 if sold after the sell past date', function () {
                const gildedRose = new GildedRose([ new Item(AGED_BRIE, -1, 49) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-2);
                expect(items[0].quality).to.equal(50);
            });
        })
    });
    
    const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
    // Test for Backstage passes to a TAFKAL80ETC concert
        // It should increase in quality, the older it gets
        // It should increase in quality by 2 when there are 10 days or less
        // It should increase in quality by 3 when 5 days or less
        // It should decrease quality to 0 on or past sell date
    describe(BACKSTAGE, function () {
        describe('as sellIn decrements by 1', function () {
            it('should increment quality by 1', function () {
                const gildedRose = new GildedRose([ new Item(BACKSTAGE, 25, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(24);
                expect(items[0].quality).to.equal(11);
            });
            it('should increment quality by 2 when 10 days or less sell date remains', function () {
                const gildedRose = new GildedRose([ new Item(BACKSTAGE, 10, 10) ]);
                let items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(9);
                expect(items[0].quality).to.equal(12);

                items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(8);
                expect(items[0].quality).to.equal(14);
            });
            it('should increment quality by 3 when 5 days or less sell date remains', function () {
                const gildedRose = new GildedRose([ new Item(BACKSTAGE, 5, 10) ]);
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
                let gildedRose = new GildedRose([ new Item(BACKSTAGE, 0, 10) ]);
                let items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-1);
                expect(items[0].quality).to.equal(0);

                gildedRose = new GildedRose([ new Item(BACKSTAGE, -5, 10) ]);
                items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(-6);
                expect(items[0].quality).to.equal(0);
            })
        });
    });

    // Test for Sulfuras, Hand of Ragnaros
    const SULFURAS = 'Sulfuras, Hand of Ragnaros';
    describe(SULFURAS, function () {
        describe('never has to be sold or decreases in quality', function () {
            it('even if sell past date is 0', function () {
                const gildedRose = new GildedRose([ new Item(SULFURAS, 0, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(80);
                expect(items[0].quality).to.equal(10);
            });
            it('even if past sell past date ', function () {
                const gildedRose = new GildedRose([ new Item(SULFURAS, -5, 10) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(80);
                expect(items[0].quality).to.equal(10);
            });
            it('even if quality is equal to 0', function () {
                const gildedRose = new GildedRose([ new Item(SULFURAS, 0, 10) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(80);
                expect(items[0].quality).to.equal(10);
            });
            it('even if quality is greater than 0', function () {
                const gildedRose = new GildedRose([ new Item(SULFURAS, 0, 10) ]);
                const items = gildedRose.updateQuality();

                expect(items[0].sellIn).to.equal(80);
                expect(items[0].quality).to.equal(10);
            });
        });
    });
});
