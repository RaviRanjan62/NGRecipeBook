import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';



const ShoopingListroutes: Routes = [

          {path: '',component : ShoppingListComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(ShoopingListroutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule{

}