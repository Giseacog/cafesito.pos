import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { supabase } from '../../lib/supabase';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ProductFormValues } from '../../types/FormValues';
import { Product } from '../../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  private baseURL = `${environment.BACK_URL}/product`;

  async addProduct(product: ProductFormValues) {
    const { data } = await supabase.auth.getSession(); //Obtengola inf de mi usuario
    const token = data?.session?.access_token;

    return firstValueFrom(
      this.httpClient.post(`${this.baseURL}/add`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  getProducts() {
    let numbersss = 2;
    console.log(numbersss);
    return this.httpClient
      .get<any>(`${this.baseURL}/get`)
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  async addProductToCart(product: Product) {
    const { data } = await supabase.auth.getSession(); //Obtengola inf de mi usuario
    const token = data?.session?.access_token;
    const user = JSON.parse(localStorage.getItem('user') || '');

    const payload = { cartId: 1, productId: product.id, quantity: 1 };

    return firstValueFrom(
      this.httpClient.post(`${this.baseURL}/add-to-cart`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
}
