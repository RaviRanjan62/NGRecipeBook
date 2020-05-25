import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
   @Input() set appUnless(condition:boolean)
   {
        if(!condition)
        {
              this.viewcontainref.createEmbeddedView(this.temef);
        }
        else{
             this.viewcontainref.clear();
        } 
   }
  constructor(private temef:TemplateRef<any>,private viewcontainref:ViewContainerRef) { }

}
