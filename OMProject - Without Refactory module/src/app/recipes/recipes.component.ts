import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

})
export class RecipesComponent implements OnInit {

  selectedRecipe:Recipe;
  isauthenticate:boolean=false;

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
   

  }
  
}
