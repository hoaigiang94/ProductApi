import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../dialog-data";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.css"],
})
export class ProductDialogComponent implements OnInit {
  product: Product;
  name = new FormControl("");
  price = new FormControl(0.0);
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
    this.modal_title = this.product
      ? `Edit ${this.product.name}`
      : "New product";

    if (this.product) {
      this.name.setValue(this.product.name);
      this.price.setValue(this.product.price);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.product && this.product.id ? this.updateProduct() : this.addProduct();
  }
  addProduct(): void {
    const name = this.name.value;
    const price = this.price.value;
    this.productService
      .addProduct({ name, price } as Product)
      .subscribe(() => this.afterSave());
  }
  updateProduct(): void {
    const name = this.name.value;
    const price = this.price.value;
    this.product = { ...this.product, name: name, price: price };
    this.productService
      .updateProduct(this.product)
      .subscribe(() => this.afterSave());
  }
  afterSave(): void {
    this.dialogRef.close();
    this.data.afterSave();
  }
}
