import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductFormValues } from '../../../core/types/FormValues';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css',
})
export class AddProductFormComponent {
  @Input() initialData?: ProductFormValues;
  @Output() formSubmit = new EventEmitter<ProductFormValues>();
  productForm!: FormGroup;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [
        this.initialData?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      price: [
        this.initialData?.price || 0,
        [Validators.required, Validators.min(0)],
      ],
      quantity: [
        this.initialData?.quantity || 0,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      try {
        const resp = await this.productService.addProduct(
          this.productForm.value
        );

        // if (error) {
        //   console.error('Error al agregar producto:', error);
        // } else {
        //   console.log('Producto agregado:', data);
        //   this.productForm.reset();
        // }
      } catch (err) {
        console.error('Error inesperado:', err);
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
