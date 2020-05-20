import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ConstantsService } from "../constants.service";
import { HttpClientModule } from "@angular/common/http";

import { ProductService } from "./product.service";
import { AppRoutingModule } from "./app-routing.module";
import { ProductDialogComponent } from "./product-dialog/product-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  declarations: [AppComponent, TopBarComponent, ProductDialogComponent],
  providers: [ConstantsService, ProductService],
  bootstrap: [AppComponent],
  entryComponents: [ProductDialogComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
