import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { supabase } from '../../lib/supabase';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ProductFormValues } from '../../types/FormValues';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  private baseURL = `${environment.BACK_URL}/product`;

  async addProduct(product: ProductFormValues) {
    const { data } = await supabase.auth.getSession();
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
    return this.httpClient
      .get<any>(`${this.baseURL}/get`)
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }
}
