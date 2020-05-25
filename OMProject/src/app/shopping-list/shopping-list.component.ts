import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'Shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[];
  igChangedSubscription:Subscription
  
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit(){
       this.ingredients=this.shoppinglistService.getIngredient();
       this.igChangedSubscription= this.shoppinglistService.IngredientChaged.subscribe( 
         
        (ingredients:Ingredient[])=>{
            this.ingredients=ingredients;
        })
  }
  ngOnDestroy()
  {
     this.igChangedSubscription.unsubscribe();
  }
  onEditItem(index:number)
  {  
     this.shoppinglistService.editItemSubject.next(index);    
  }
  
}
