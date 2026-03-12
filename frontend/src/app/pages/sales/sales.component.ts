import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';

@Component({
  selector: 'app-sales',
  imports: [ProductListComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent {}
