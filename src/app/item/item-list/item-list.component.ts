import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MyItem } from '../../model/MyItem';
import { ItemService } from '../../services/item.service';
import { MyItemComponent } from '../my-item/my-item.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
  imports: [MyItemComponent],
})
export class ItemListComponent implements OnInit {
  public items: MyItem[] = [];

  @Input()
  refreshList!: Subject<boolean>; // this is used to detect when to refresh the list (after an item has been added)

  constructor(private itemsService: ItemService) {}
  ngOnInit(): void {
    this.getItems();
    this.refreshList.subscribe({ next: this.getItems });
  }

  onItemAdded(item: MyItem): void {
    this.getItems();
  }

  public getItems = (): void => {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  };
}
