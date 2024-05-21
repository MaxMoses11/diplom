import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RequestType} from "../../../../types/request.type";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestParamType} from "../../../../types/request-param.type";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @ViewChild('popup') popup!: TemplateRef<ElementRef>;
    dialogRef: MatDialogRef<any> | null = null;
    requestStatus: boolean = false;

    modalForm = this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required]
    });

    constructor(private dialog: MatDialog,
                private fb: FormBuilder,
                private router: Router,
                private _snackBar: MatSnackBar,
                private requestService: RequestService) {
    }

    ngOnInit(): void {
    }

    callMe() {
        this.dialogRef = this.dialog.open(this.popup);
        this.dialogRef.backdropClick()
            .subscribe(() => {
                this.requestStatus = false;
                this.router.navigate(['/']).then();
            });
    }

    closePopup() {
        this.dialogRef?.close();
        this.requestStatus = false;
        this.modalForm.markAsUntouched();
        this.router.navigate(['/']).then();
    }

    makeRequest() {
        if (this.modalForm.valid && this.modalForm.value.name && this.modalForm.value.phone) {
            const reqParam: RequestParamType = {
                name: this.modalForm.value.name,
                phone: this.modalForm.value.phone,
                type: RequestType.consultation
            };

            this.requestService.newRequest(reqParam)
                .subscribe({
                    next: (data: DefaultResponseType) => {
                        if (data.error) {
                            this._snackBar.open(data.message);
                            throw new Error(data.message);
                        }

                        this.requestStatus = true;
                        this.modalForm.get('name')?.setValue('');
                        this.modalForm.get('phone')?.setValue('');
                        this.modalForm.markAsPristine();
                        this.modalForm.markAsUntouched();
                    },
                    error: errorResponse => {
                        if (errorResponse.error && errorResponse.error.message) {
                            this._snackBar.open(errorResponse.error.message);
                        } else {
                            this._snackBar.open('Ошибка сохранения');
                        }
                    }
                });
        }
    }
}
