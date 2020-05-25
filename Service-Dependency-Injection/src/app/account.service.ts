import { Injectable } from '@angular/core';
import { LoggingServcie } from './logging.servcie';

@Injectable()
export class AccountService{


          constructor(private loggingService:LoggingServcie)
          {

          }
          accounts = [
                    {
                      name: 'Master Account',
                      status: 'active'
                    },
                    {
                      name: 'Testaccount',
                      status: 'inactive'
                    },
                    {
                      name: 'Hidden Account',
                      status: 'unknown'
                    }
                  ];

                  addAccount(name:string,status:string)
                  {
                            this.accounts.push({name:name,status:status})
                             this.loggingService.logStatuschanged(status);
                  }
                  updateStatus(id:number,status:string)
                  {
                       this.accounts[id].status=status;
                       this.loggingService.logStatuschanged(status);
                  }

                 


}