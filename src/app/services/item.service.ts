import { Injectable } from '@angular/core';
import { MyItem } from '../model/MyItem';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<MyItem[]> {
    return this.http.get<MyItem[]>('/api/Items');
  }

  /**
   * Create an item.
   * @param item the item to add
   * @returns true if the item was added, false otherwise
   */
  createItem(item: MyItem): Observable<MyItem> {
    const body = {
      name: item.name,
      description: item.description,
    };
    return this.http.post<MyItem>('/api/Items', body);
  }

  /**
   * Delete an item.
   * @param id the id of the item to delete
   * @returns the API response
   */
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`/api/Items/${id}`);
  }

  /**
   * Update an item's field.
   * @param item the new item. The id of the item should be the ID of the item we want to upate.
   * @returns the updated item
   */
  updateItem(item: MyItem): Observable<MyItem> {
    return this.http.patch<MyItem>(`/api/Items`, item);
  }

  /**
   * Get the factorials of the number of items added. 
   * @returns the factorials. The element at each index is the factorial of that index.
   */
  getFactorials(): Observable<number[]>{
    return this.http.get<number[]>('api/Items/factorial');
  }
}
