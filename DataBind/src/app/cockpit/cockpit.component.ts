import { Component, OnInit, Output ,
EventEmitter, ViewChild,ElementRef} 
  from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName = '';
  newServerContent = '';

  @Output() serverCreated=new EventEmitter<{serverName:string,serverContent:string}>();
  @Output() blueprintCreated=new EventEmitter<{serverName:string,serverContent:string}>();

  @ViewChild('serverContentInput',{static:false}) serverContendInput:ElementRef;

  constructor() { }

  ngOnInit() {
  }
  
  onAddServer(localReferenceVariable:HTMLInputElement) {
       this.serverCreated.emit(
         {serverName:localReferenceVariable.value,
         serverContent:this.serverContendInput.nativeElement.value
         }
         );
  }

  onAddBlueprint(localReferenceVariable:HTMLInputElement) {
    this.blueprintCreated.emit(
      {serverName:localReferenceVariable.value,
        serverContent:this.serverContendInput.nativeElement.value
      }
    );
  }
}
