import { Subject } from 'rxjs';
import { Ingredient } from 'Shared/Ingredient.model';


export class ShoppingListService
{
         IngredientChaged=new Subject<Ingredient[]>();
         editItemSubject=new Subject<number>();
         private ingredients:Ingredient[]=[
                    new Ingredient('Mango',5),
                    new Ingredient('Mango',5),
                    new Ingredient('Mango',5)
               ];

          getIngredient()
          {
                    return this.ingredients.slice();
          }
          getIngredientbyIndex(index:number)
          { 

             return this.ingredients[index];
          }

          addIngredient(ingredient:Ingredient)
          {
                    this.ingredients.push(ingredient);
                    this.IngredientChaged.next(this.ingredients.slice());
          }
          updateIngredient(index:number, ingredient:Ingredient)
          {
                    this.ingredients[index]=ingredient;
                    this.IngredientChaged.next(this.ingredients.slice());
          }
          deleteIngredient(index:number)
          {
                    this.ingredients.splice(index,1)
                    this.IngredientChaged.next(this.ingredients.slice());
          }

          addIngredients(ingredients:Ingredient[])
          {
               for(let ingredient of ingredients)
               {
                    this.ingredients.push(ingredient);
                    this.IngredientChaged.next(this.ingredients.slice());

               }
               
               // ingredients.push(...ingredients);
               // console.log(ingredients)
              // this.IngredientChaged.emit(this.ingredients.slice());
          }
}