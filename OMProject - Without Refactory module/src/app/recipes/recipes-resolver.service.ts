import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';

import { RecipeService } from './recipe.service';
import { DataStorageService } from 'Shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipe();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchPost();
      console.log('I am fetching from data servcie');
      console.log(recipes);
    } else {
      console.log('I am resolver')
      console.log(this.dataStorageService.fetchPost())
      console.log(recipes);
      return recipes;
    }
  }
}
