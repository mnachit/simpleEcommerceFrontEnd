import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenServiceService } from '../token-service.service';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.guard';
import { Observable } from 'rxjs';
import { product } from 'src/app/model/product';


const apiUrl = "http://localhost:8070/api/v1/rest/product/";
//ss
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private tokenservice : TokenServiceService, private authorizedGuard: AuthorizedGuardService) { }

  getProducts(id: number): Observable<{message: String, result: product[]}> {
    return this.http.get<{message: String, result: product[]}>(apiUrl+"all/"+id);
  }

  createProduct(product: product): Observable<{message: string}> {
    return this.http.post<{message: string}>(apiUrl+"new", product);
  }

  deleteProduct(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(apiUrl+id);
  }

  getProductById(id: string): Observable<{message: string, result: product}> {
    return this.http.get<{message: string, result: product}>(apiUrl+id);
  }
  updateProduct(id: string, product: product): Observable<{message: string}> {
    return this.http.put<{message: string}>(apiUrl+id, product);
  }
}
