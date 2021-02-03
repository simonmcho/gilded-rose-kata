import { expect } from 'chai';
import { General } from '../general';

describe('General Model::', function() {
  describe('upon instantiation', function () {
    it('should contain correct properties', function() {
      const general = new General('foo', 10, 5);
      expect(general.name).to.equal('foo');
      expect(general.sellIn).to.equal(10);
      expect(general.quality).to.equal(5);
    });
  })
  describe('before sell by date, when items are processed', function () {
    it('sellIn and quality should be decremented by 1', function () {
      const general = new General('foo', 10, 5);
      general.processItem();
      expect(general.sellIn).to.equal(9);
      expect(general.quality).to.equal(4);
    });
  });
  describe('on or past sell by date, when items are processed', function () {
    it('sellIn and quality should be decremented by 1', function () {
      const general = new General('foo', 0, 5);
      general.processItem();
      expect(general.sellIn).to.equal(-1);
      expect(general.quality).to.equal(4);
    });
    it('sellIn should be decremented by 1 and quality by 2', function () {
        const general = new General('foo', -1, 5);
        general.processItem();
  
        expect(general.sellIn).to.equal(-2);
        expect(general.quality).to.equal(3);
    });
  });
  describe('quality limit, when items are processed', function () {
    it('sellIn and quality should be decremented by 1 but limit value of quality at 0', function () {
      const general = new General('foo', 10, 0);
      general.processItem();
  
      expect(general.sellIn).to.equal(9);
      expect(general.quality).to.equal(0);
    });
    it('sellIn should be decremented by 1 and quality by 2 but limit value of quality at 0', function () {
        const general = new General('foo', 1, 1);
        general.processItem();
  
        expect(general.sellIn).to.equal(0);
        expect(general.quality).to.equal(0);
    });
  });
});
