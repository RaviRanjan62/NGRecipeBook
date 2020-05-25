import { Component, EventEmitter, Input } from '@angular/core';
import{LoggingServcie} from '../logging.servcie';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers:[LoggingServcie]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
 

   constructor(private logging:LoggingServcie,private accountService:AccountService){}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id,status);
    // this.logging.logStatuschanged(status);
  }
}
