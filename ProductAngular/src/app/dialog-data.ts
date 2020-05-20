import { Product } from "./product";

export interface DialogData {
  product: Product;
  mode: string;
  afterSave: () => {};
}
