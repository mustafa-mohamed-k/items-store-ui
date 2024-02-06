import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyItem } from '../../model/MyItem';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
})
export class CreateItemComponent {
  public itemForm: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }> = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
  });

  private item?: MyItem;

  constructor(private itemService: ItemService) {}

  onSubmit() {
    console.log(this.itemForm.get('name')?.value);
    if (this.itemForm.valid) {
      this.item = {
        name: this.itemForm.get('name')?.value ?? '',
        description: this.itemForm.get('description')?.value ?? '',
      };
      const created = this.itemService.createItem(this.item);
      console.log({ created });
      if (created) {
        this.itemService.getItems();
      }
    }
  }
}
