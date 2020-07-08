import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
   recipe:Recipe;
   id:number;

  constructor(
    private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  
    this.route.params.subscribe(
        (params:Params) => {
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipeByID(this.id);
        
      });
  }
  onAddToShoppingList()
  {
     this.recipeService.addIngToShoppingList(this.recipe.ingredients);
      // console.log(this.recipe.ingredients);
  }

  onEditRecipe()
  {
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
 
}