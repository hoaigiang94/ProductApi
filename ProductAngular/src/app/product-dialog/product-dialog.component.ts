import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../dialog-data";
import { Product } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.css"]
})
export class ProductDialogComponent implements OnInit {
  product: Product;
  name: string;
  price: number;
  mode: string;
  modal_title: string;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    const { product, mode } = this.data;
    this.product = product;
    this.mode = mode;
    this.name = this.product ? this.product.name : "";
    this.price = this.product ? this.product.price : null;
    this.modal_title = this.product
      ? `Edit ${this.product.name}`
      : "New product";
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.product && this.product.id ? this.updateProduct() : this.addProduct();
  }
  addProduct(): void {
    const { name, price } = this;

    this.productService.addProduct({ name, price } as Product).subscribe(_ => {
      this.dialogRef.close();
      this.data.afterSave();
    });
  }
  updateProduct(): void {
    this.product = { ...this.product, name: this.name, price: this.price };
    this.productService.updateProduct(this.product).subscribe(() => {
      this.dialogRef.close();
      this.data.afterSave();
    });
  }
}
