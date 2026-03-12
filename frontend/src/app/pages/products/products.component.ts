import { Component } from '@angular/core';
import { AddProductFormComponent } from '../../components/products/add-product-form/add-product-form.component';
import { ProductsService } from '../../core/services/products/products.service';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-products',
  imports: [AddProductFormComponent, ProductListComponent, NavBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private productsService: ProductsService) {}
}
