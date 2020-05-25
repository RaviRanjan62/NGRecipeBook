import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'Shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';




@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('f',{static:true}) slform:NgForm;
  subscription:Subscription
  editItemIndex:number;
  editMode=false;
  editItem:Ingredient;
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit()
  {
      this.subscription= this.shoppinglistService.editItemSubject.subscribe(
        (index:number) => { 
              this.editItemIndex= index; 
              this.editMode=true; 
              this.editItem=this.shoppinglistService.getIngredientbyIndex(this.editItemIndex);
           
              this.slform.setValue({
                     name:this.editItem.name,
                     amount:this.editItem.amount
              })
              

        } );
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
  onSubmitForm(form :NgForm)
  {
      const value=form.value;
      const newIngredient= new Ingredient(value.name,value.amount);
       // event.preventDefault();
        if(this.editMode)
        {
             this.shoppinglistService.updateIngredient(this.editItemIndex,newIngredient);
        }   
        else{
          this.shoppinglistService.addIngredient(newIngredient);
        }
         
        this.editMode=false;
        form.reset();   
  }
  onDelete()
  {
    this.shoppinglistService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onClear()
  {
    this.slform.reset();
    this.editMode=false;
  }
}
