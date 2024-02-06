import { Component, Input } from '@angular/core';
import { MyItem } from '../../model/MyItem';

@Component({
  selector: 'app-my-item',
  standalone: true,
  imports: [],
  templateUrl: './my-item.component.html',
  styleUrl: './my-item.component.css'
})
export class MyItemComponent {
  @Input({required: true}) item!: MyItem;

  public editing: boolean = false;
}
