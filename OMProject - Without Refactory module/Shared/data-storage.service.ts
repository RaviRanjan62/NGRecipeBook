import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/recipes/recipe.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
          
          providedIn:'root'
})
export class DataStorageService{
     constructor(private http:HttpClient,private recipeSer:RecipeService,
      private authservice:AuthService)
     {
            
     }

     storeRecipe()
     {
          const recipes=this.recipeSer.getRecipe();
          return this.http.put("https://lovely-ea1bd.firebaseio.com/recipes.json",recipes)
          .subscribe(
                   response => { console.log(response)})         
     }
   
     fetchPost()
     {
        return this.authservice.user.pipe(take(1),exhaustMap(user => {
          return this.http.get<Recipe[]>("https://lovely-ea1bd.firebaseio.com/recipes.json",
          {
             params:new HttpParams().set('auth',user.token)
          } 
         );
         }),
         map(recipes => {   
          console.log('data Storage');   
          return recipes.map(recipe => {           
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        
        tap(recipes => {          
          this.recipeSer.setRecipes(recipes);
        })

  );
         
            
        // .subscribe(recipes => { 
        //             console.log(recipes)
        //             //this.recipeSer.setRecipes(recipes);
        //   })
          
     }
}