import { General } from './utils/general';
import { ItemProcessor } from './utils/item-processor';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
      this.items = items;
  }

  updateQuality() {
    const listOfBuiltItems = this.items.map((item: Item) => {
      const processedItem = ItemProcessor.buildItem(item);
      processedItem.processItem();
      return processedItem;
    })

    const filteredList = listOfBuiltItems
      .filter(Boolean)
      .map((builtItem) => <Item>builtItem);

    this.items = filteredList;
    return this.items;
  }
}
