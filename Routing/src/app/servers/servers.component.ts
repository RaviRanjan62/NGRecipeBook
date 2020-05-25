import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
   
    this.servers = this.serversService.getServers();
    for(let server of this.servers)
    {
      console.log(server.id);
    }
       
  }

  Reloadpage()
  {     console.log('hi')
       // this.router.navigate(['servers'],{relativeTo:this.route});
  }

}
