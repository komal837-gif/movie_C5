import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snack:MatSnackBar) { }

  ShowSuccessMsg(msg:string){
    this.snack.open(msg,'Close',{
      horizontalPosition:'center',
      verticalPosition:"bottom",
      duration:1500,
      panelClass:['success-snackBar']
    })
  }

  ShowError(err:any){
    this.snack.open(err,'Close',{
      horizontalPosition:'center',
      verticalPosition:"bottom",
      duration:1500,
      panelClass:['error-snackBar']
    })
  }
}
