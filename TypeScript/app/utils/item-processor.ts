import { Item } from '../gilded-rose';

import { General } from './general';
import { AgedBrie } from './aged-brie';
import { BackstagePass } from './backstage-pass';
import { Sulfuras } from './sulfuras';

import {
  ITEM_AGED_BRIE,
  ITEM_BACKSTAGE,
  ITEM_SULFURAS
} from '../constants';

export class ItemProcessor {
  static buildItem(item: Item): General {
    if (!item) {
      return new General('', 0, 0);
    }
    switch (item.name) {
      case ITEM_AGED_BRIE:
        return new AgedBrie(item.name, item.sellIn, item.quality);
      case ITEM_BACKSTAGE:
        return new BackstagePass(item.name, item.sellIn, item.quality);
      case ITEM_SULFURAS:
        return new Sulfuras(item.name, item.sellIn, item.quality);
      default:
        return new General(item.name, item.sellIn, item.quality);
    }
  }
}
