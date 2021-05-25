import { catchError, map, observeOn } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackaBar: MatSnackBar, private http: HttpClient) { }

    showMenssage(msg: string, isError:boolean = false):void{
      this.snackaBar.open(msg, 'X', {
        duration:3000,
        horizontalPosition:"right",
        verticalPosition:"top",
        panelClass: isError ? ['msg-erro'] : ['msg-success']
      });
    }

    create(product: Product ): Observable<Product>{
      return this.http.post<Product>(this.baseUrl, product).pipe(
        map((obj) => obj),
        catchError(e => this.erroHandler(e))
      );
    }

    erroHandler (e:any):Observable<any>{
      this.showMenssage('Ocorreu um erro', true)
      return EMPTY
    }

    read():Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl).pipe(
        map((obj) => obj),
        catchError(e => this.erroHandler(e))
      );
    }

    readById(id:string | null):Observable<Product>{
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Product>(url).pipe(
        map((obj) => obj),
        catchError(e => this.erroHandler(e))
      );;
    }

    update(product:Product):Observable<Product>{
      const url = `${this.baseUrl}/${product.id}`;
      return this.http.put<Product>(url, product).pipe(
        map((obj) => obj),
        catchError(e => this.erroHandler(e))
      );;
    }

    delete(id:string | null):Observable<Product>{
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<Product>(url).pipe(
        map((obj) => obj),
        catchError(e => this.erroHandler(e))
      );;
    }

 
}
