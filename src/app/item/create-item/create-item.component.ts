import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyItem } from '../../model/MyItem';
import { ItemService } from '../../services/item.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
})
export class CreateItemComponent {
  public itemForm: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }> = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string>(''),
  });

  public errorMessage: string = '';
  public successMessage: string = '';
  public saving: boolean = false;

  public factorialMessage: string = '';
  public gettingFactorials:boolean = false;
  public factorials: number[] = [];

  @Output() private itemAdded: EventEmitter<MyItem>;

  constructor(private itemService: ItemService) {
    this.itemAdded = new EventEmitter<MyItem>();
  }

  onFactorial() {
    this.factorialMessage = "Generating factorials...";
    this.gettingFactorials = true;
    this.itemService.getFactorials().subscribe({
      next: (value) => {
        this.gettingFactorials = false;
        this.factorialMessage = "";
        this.factorials = value;
      },
      error: () => {
        this.factorialMessage = "An error occurred while generating factorials.";
        this.gettingFactorials = false;
        this.factorials = [];
      },
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.itemForm.valid) {
      try {
        this.saving = true;
        const item: MyItem = {
          name: this.itemForm.get('name')?.value ?? '',
          description: this.itemForm.get('description')?.value ?? '',
        };
        this.itemService.createItem(item).subscribe({
          next: (value) => {
            this.successMessage = 'Item saved successfully.';
            this.errorMessage = '';
            this.itemForm.reset();
            this.itemAdded.emit(value); // notify the items-list component that an item has been added.
            this.saving = false;
          },
          error: () => {
            this.errorMessage = 'An error occurred. Try again later.';
            this.successMessage = '';
            this.saving = false;
          },
        });
      } catch (error) {
        this.errorMessage = 'An error occurred.';
        this.successMessage = '';
        this.saving = false;
      }
    }
  }
}
