
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from 'Shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService
{
  recipesChanged = new Subject<Recipe[]>();
         constructor(private slService:ShoppingListService){}

                  

        //  private recipes : Recipe[]=[
                        
        //             new Recipe('Test Recipes 1',
        //             'What Else you need to Say.?',
        //             'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
        //              ,[
        //                new Ingredient('meat',2),
                      
        //              ]),
        //             new Recipe('Test Recipes 2',
        //             'What Else you need to Say.?',
        //             'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
        //             [
        //               new Ingredient('Potato',2),

        //             ])
        //           ];

          private recipes:Recipe[]=[];

          setRecipes(recipes: Recipe[]) {
          this.recipes=recipes;
          console.log('set recipe called');                
          this.recipesChanged.next(this.recipes.slice());
          console.log(recipes);       
        } 
          getRecipeByID(index:number)
          {
            return this.recipes[index];
          }
          getRecipe()
          {
                    return this.recipes.slice();
          }
          addIngToShoppingList(ingredient:Ingredient[])
          {
                this.slService.addIngredients(ingredient);
          }

          addRecipe(recipe: Recipe) {
            this.recipes.push(recipe);
            this.recipesChanged.next(this.recipes.slice());
          }
        
          updateRecipe(index: number, newRecipe: Recipe) {
            this.recipes[index] = newRecipe;
            this.recipesChanged.next(this.recipes.slice());
          }
        
          deleteRecipe(index: number) {
            this.recipes.splice(index, 1);
            this.recipesChanged.next(this.recipes.slice());
          }

         
           
          
}