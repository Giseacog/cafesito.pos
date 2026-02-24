import { Component, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productsResponse!: any; //Esta de forma global
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsResponse = this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.productsResponse = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
