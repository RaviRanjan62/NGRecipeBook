import { Component } from '@angular/core';
import{LoggingServcie} from '../logging.servcie';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers:[LoggingServcie]
})
export class NewAccountComponent {
  

  constructor(private logging:LoggingServcie,private accountService:AccountService){}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName,accountStatus);
    // this.logging.logStatuschanged(accountStatus);
  }
}
