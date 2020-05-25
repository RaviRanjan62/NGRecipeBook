import { Recipe } from './recipe.model';

export class RecipeService
{
         private recipes : Recipe[]=[
                        
                    new Recipe('Test Recipes 1',
                    'Recipe Discription',
                    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
                    new Recipe('Test Recipes 2',
                    'Recipe Discription 2',
                    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
                  ];

          getRecipe()
          {
                    return this.recipes.slice();
          }
}