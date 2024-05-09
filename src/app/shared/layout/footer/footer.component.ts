import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  constructor(private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  callMe() {
    this.dialogRef = this.dialog.open(this.popup);
    this.dialogRef.backdropClick()
      .subscribe(() => {
        this.router.navigate(['/']).then();
      });
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']).then();
  }
}
