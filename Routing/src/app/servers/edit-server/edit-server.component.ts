import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowedit=false;
  changesSaved=false;


  constructor(private serversService: ServersService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
     this.route.queryParams.subscribe(
       (queryparams:Params) =>{
     
        this.allowedit= queryparams['allowedit'] == 1;

       }
     )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, 
      {name: this.serverName, status: this.serverStatus});
      
    this.changesSaved=true;
    this.router.navigate(['../'],{relativeTo:this.route})

  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean
  {
      // if(!this.allowedit)
      // {
      //      return true;
      // }
      // if(true)
      // {
        return confirm("do you really want to redirect");
        console.log('called');
      // }
      // else
      // {
      //   return true;
      // }
  }

}
