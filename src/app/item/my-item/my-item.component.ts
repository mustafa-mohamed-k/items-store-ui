import { Component, Input, OnInit } from '@angular/core';
import { MyItem } from '../../model/MyItem';
import { ItemService } from '../../services/item.service';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-my-item',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './my-item.component.html',
  styleUrl: './my-item.component.css',
})
export class MyItemComponent implements OnInit {
  @Input({ required: true }) item!: MyItem;

  @Input() refreshItems!: () => void;

  public deleting: boolean = false;
  public editing: boolean = false;
  public saving: boolean = false;

  public itemForm: FormGroup;

  constructor(private itemService: ItemService) {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.itemForm.setValue({
      name: this.item.name,
      description: this.item.description,
    });
  }

  deleteItem(id: number): void {
    this.deleting = true;
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.deleting = false;
        this.refreshItems?.();
      },
      error: () => {
        this.deleting = false;
      },
    });
  }

  onEdit(): void {
    if (this.itemForm.valid) {
      let item: MyItem = {
        name: this.itemForm.get('name')?.value ?? '',
        description: this.itemForm.get('description')?.value ?? '',
        id: this.item.id,
      };
      this.saving = true;
      this.itemService.updateItem(item).subscribe({
        next: (value) => {
          this.editing = false;
          // no need of making API call if just one item has changed. Simply update the values.
          this.item.name = value.name;
          this.item.description = value.description;
          this.saving = false;
        },
        error: () => {
          this.editing = false;
          this.saving = false;
        },
      });
    }
  }
}
