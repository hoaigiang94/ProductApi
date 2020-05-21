import { Product } from "./product";

export interface ConfirmationDialogData {
  title: string;
  confirmation_text: string;
  onConfirm: () => {};
}
