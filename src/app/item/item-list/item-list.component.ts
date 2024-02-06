import { Component, OnInit } from '@angular/core';
import { MyItem } from '../../model/MyItem';
import { MyItemComponent } from "../my-item/my-item.component";
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-item-list',
    standalone: true,
    templateUrl: './item-list.component.html',
    styleUrl: './item-list.component.css',
    imports: [MyItemComponent]
})
export class ItemListComponent implements OnInit {
  public items: MyItem[] = [];

  constructor(private itemsService: ItemService){

  }
  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }
  
}
