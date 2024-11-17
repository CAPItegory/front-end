import { Injectable } from "@angular/core";
import { NgToastService } from "ng-angular-popup";

@Injectable({
    providedIn: "root"
})
export class PopupService {
    constructor(private toast: NgToastService){}

    public openWarning(message: string) {
    this.toast.warning('Warning Message', message, 5000)
    }

    public openSuccess(message: string) {
    this.toast.success('Success', message, 5000)
    }

    public openError(message: string) {
    this.toast.danger('Error Message', message, 5000)
    }
}