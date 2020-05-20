import { Component } from "@angular/core";

import { products } from "../products";
import { ConstantsService } from "../../constants.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { pipe, Observable, Subject } from "rxjs";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
  products: Product[];
  products$: Observable<Product[]>;
  display_products: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProducts(term))
    );

    // display_products
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log("term", term)
    this.searchTerms.next(term);
  }

  openAddProduct(): void {
    this.openDialog("add");
  }

  openUpdateProduct(product: Product): void {
    this.openDialog("update", product);
  }

  openDialog(mode: string, product?: Product) {
    this.dialog.open(ProductDialogComponent, {
      height: "300px",
      width: "300px",
      data: {
        mode: mode,
        product: product,
        afterSave: () => this.getProducts()
      }
    });
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe(products => (this.products = products));
  }

  removeProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe(_ => {
      this.products = this.products.filter(p => p.id != product.id);
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
