import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Product } from "./product";

@Injectable()
export class ProductService {
  private productsUrl = "https://localhost:5001/api/Products"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl, this.httpOptions).pipe(
      tap((_) => console.log("fetched products")),
      catchError(this.handleError<Product[]>("getProducts", []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsUrl, product, this.httpOptions)
      .pipe(
        tap((newProduct: Product) =>
          console.log(`added product w/ id=${newProduct.id}`)
        ),
        catchError(this.handleError<Product>("addProduct"))
      );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === "number" ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>("deleteProduct"))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(
        `${this.productsUrl}/${product.id}`,
        product,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`updated product id=${product.id}`)),
        catchError(this.handleError<Product>("updateProduct"))
      );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http
      .get<Product[]>(`${this.productsUrl}/?searchString=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? console.log(`found products matching "${term}"`)
            : console.log(`no products matching "${term}"`)
        ),
        catchError(this.handleError<Product[]>("searchProducts", []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
