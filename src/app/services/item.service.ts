import { Injectable } from '@angular/core';
import { MyItem } from '../model/MyItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: MyItem[];

  constructor() {
    this.items = [];
  }

  getItems(): MyItem[] {
    return this.items;
  }

  /**
   * Create an item.
   * @param item the item to add
   * @returns true if the item was added, false otherwise
   */
  createItem(item: MyItem): boolean {
    const foundItem = this.items.find((current) => current.id === item.id);
    if (foundItem) return false;
    item.id = this.items.length;
    this.items.push(item);
    return true;
  }

  deleteItem(id: number): boolean {
    return false;
  }
}
