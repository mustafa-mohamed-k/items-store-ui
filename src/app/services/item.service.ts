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

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`/api/Items/${id}`);
  }

  updateItem(item: MyItem): Observable<MyItem> {
    return this.http.patch<MyItem>(`/api/Items`, item);
  }
}
