import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { MyItem } from './model/MyItem';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CreateItemComponent, ItemListComponent],
})
export class AppComponent {
  refreshList: Subject<boolean> = new Subject();
  
  onItemAdded(item: MyItem): void {
    this.refreshList.next(true);
  }
}
