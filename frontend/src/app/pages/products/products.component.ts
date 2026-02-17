import { Component } from '@angular/core';
import { AddProductFormComponent } from '../../components/products/add-product-form/add-product-form.component';
import { ProductsService } from '../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  imports: [AddProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
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
