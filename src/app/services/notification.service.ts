import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar) {}
    
    notifyUser(msg: string): void {
        this.snackBar.open(msg, 'close', {
            duration: 3000,
        })
    }
}