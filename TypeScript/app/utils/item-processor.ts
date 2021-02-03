import { Item } from '../gilded-rose';

import { General } from '../models/general';
import { AgedBrie } from '../models/aged-brie';
import { BackstagePass } from '../models/backstage-pass';
import { Sulfuras } from '../models/sulfuras';
import { Conjured } from '../models/conjured';

import {
  ITEM_AGED_BRIE,
  ITEM_BACKSTAGE,
  ITEM_SULFURAS,
  ITEM_CONJURED
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
      case ITEM_CONJURED:
        return new Conjured(item.name, item.sellIn, item.quality);
      default:
        return new General(item.name, item.sellIn, item.quality);
    }
  }
}
