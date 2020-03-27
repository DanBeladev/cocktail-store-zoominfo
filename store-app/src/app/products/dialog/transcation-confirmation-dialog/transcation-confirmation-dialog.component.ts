import { Component, OnInit } from '@angular/core';
import { PayPalService } from '../../pay-pal.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transcation-confirmation-dialog',
  templateUrl: './transcation-confirmation-dialog.component.html',
  styleUrls: ['./transcation-confirmation-dialog.component.css']
})
export class TranscationConfirmationDialogComponent implements OnInit {
  public isCompleted = this.paypalService.isTransactionCompleted;
  constructor(public paypalService: PayPalService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }



}
