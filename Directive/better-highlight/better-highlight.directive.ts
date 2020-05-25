import { Directive, ElementRef, Renderer2, OnInit, HostListener, RendererStyleFlags2, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
   @Input() defalutColor:string='transparent';
   @Input('appBetterHighlight') setColor:string='blue';
   @HostBinding('style.backgroundColor') backgroundColor:string;
  constructor(private elementref:ElementRef,private renderer:Renderer2) { }

  ngOnInit()
  {   //using --renderer
    // this.renderer.setStyle(this.elementref.nativeElement,'backgroundColor','blue');
  }

   @HostListener('mouseover') mouseover(evendata:Event)
   {
    //this.renderer.setStyle(this.elementref.nativeElement,'background-color','blue');
    this.backgroundColor=this.setColor;
   }
   @HostListener('mouseleave') mouseleave(evendata:Event)
   {
    //this.renderer.setStyle(this.elementref.nativeElement,'background-color','blue');
    this.backgroundColor=this.defalutColor;
   }
}
