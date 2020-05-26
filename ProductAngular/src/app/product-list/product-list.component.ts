import { Component } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  products: Product[];

  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    if (!term) {
      this.getProducts();
    } else {
      this.productService
        .searchProducts(term)
        .subscribe((products) => (this.products = products));
    }
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
        afterSave: () => this.getProducts(),
      },
    });
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }
  confirmRemoval(product: Product): void {
    this.dialog.open(ConfirmationDialogComponent, {
      height: "300px",
      width: "300px",
      data: {
        title: "",
        confirmation_text: `Are you sure you want to remove Product #${product.id}?`,
        onConfirm: () => {
          this.dialog.closeAll();
          this.removeProduct(product);
        },
      },
    });
  }

  removeProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe((_) => {
      this.products = this.products.filter((p) => p.id != product.id);
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
