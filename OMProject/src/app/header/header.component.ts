import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from 'Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
   selector:'app-header',
   templateUrl:'./header.component.html',
   styleUrls:['./header.component.css']      
})
export class HeaderComponent implements OnInit,OnDestroy
{
   constructor(private dataStorageService:DataStorageService,
      private authService:AuthService,
      private router:Router){}

      isAuthenticate:boolean=false;
   
   usersub:Subscription;

   logout()
   {
      this.authService.logout();
      
   }
   
   ngOnInit()
   {
      if(!this.isAuthenticate)
      {
         //this.router.navigate(['auth']);
      }
      
      this.usersub=this.authService.user.subscribe(user =>{
         this.isAuthenticate=!!user;   
          //this.isAuthenticate =user ? true : false;
          

      });
   }
   ngOnDestroy()
   {
        this.usersub.unsubscribe();
   }
   onSaveData()
   {     
          this.dataStorageService.storeRecipe();
   }  
   fetchRecipe()
   {   
       this.dataStorageService.fetchPost().subscribe();
     
   }
}