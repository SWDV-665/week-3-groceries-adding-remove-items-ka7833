import { Injectable } from '@angular/core';
import { ITEMS } from '../Items'
import { GroceryItem } from '../GroceryItem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  constructor() { }

  getGroceries(): Observable<GroceryItem[]>{
    const items = of(ITEMS)
    return items;
  }
}
