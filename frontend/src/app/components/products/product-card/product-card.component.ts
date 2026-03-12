import { Component, Input } from '@angular/core';
import { Product } from '../../../core/types/Product';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product | null;

  constructor(private productsService: ProductsService) {}

  async addProductToCart(): Promise<void> {
    if (this.product) {
      try {
        const resp = await this.productsService.addProductToCart(this.product);
      } catch (error) {
        console.error('Error', error);
      }
    }
  }
}
