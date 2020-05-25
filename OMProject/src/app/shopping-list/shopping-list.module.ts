import { NgModule } from '@angular/core';
import { ShoppingListRoutingModule } from './Shopping-list.routing';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'Shared/shared.module';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';




@NgModule({
          declarations:[ ShoppingListComponent,ShoppingEditComponent],
          imports:[ShoppingListRoutingModule,
                    SharedModule,
                   FormsModule]
})
export class ShoppingListModule{

}