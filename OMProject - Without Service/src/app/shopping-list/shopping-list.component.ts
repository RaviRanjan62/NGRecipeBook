import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'Shared/Ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent  {

  ingredients:Ingredient[]=[
       new Ingredient('Mango',5),
       new Ingredient('Mango',5),
       new Ingredient('Mango',5)
  ];
  onIngredientAdded(ingredient:Ingredient)
  {   
        
        this.ingredients.push(ingredient);
  }
  constructor() { }

}
