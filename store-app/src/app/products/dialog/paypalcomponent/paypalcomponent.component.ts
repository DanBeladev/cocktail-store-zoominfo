import { Component, OnInit, Inject } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { PayPalService } from '../../pay-pal.service';
import { Product } from '../../product.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { PurchaseDialogComponent } from '../purchase-dialog.component';
import { TranscationConfirmationDialogComponent } from '../transcation-confirmation-dialog/transcation-confirmation-dialog.component';

@Component({
  selector: 'app-paypalcomponent',
  templateUrl: './paypalcomponent.component.html',
  styleUrls: ['./paypalcomponent.component.css']
})
export class PaypalcomponentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public product: Product = this.paypalService.product;
  constructor(public paypalService: PayPalService,
              public dialogRef: MatDialogRef<PaypalcomponentComponent>,
              public dialogRefTransactionDetails: MatDialogRef<PurchaseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public transcationDetailsDialog: MatDialog) {}

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    console.log('product data: ', this.data);
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: data =>
        ( {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.product.price,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.product.price
                  }
                }
              },
              items: [
                {
                  name: this.product.title,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: this.product.price
                  }
                }
              ]
            }
          ],
        }) as ICreateOrderRequest,
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'gold',
        size: 'responsive'
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then(details => {
          alert('transcatin approved by: ' + details);
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: data => {
        this.paypalService.transactionCompleted(data);
        alert('transcatin authorizated by: ' + data.payer.name.given_name);
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.dialogRef.close();
        const dialogRefTranscationDetails = this.transcationDetailsDialog.open(TranscationConfirmationDialogComponent, {
          data: 'hello'
        });
        dialogRefTranscationDetails.afterClosed().subscribe(resulet => {
          console.log('The dialog transaction wsa closed');
        });
      },
      onCancel: (data, actions) => {
        this.handleNotCompletedTeansaction();
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this.handleNotCompletedTeansaction();
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

  handleNotCompletedTeansaction(): void {
    this.paypalService.onTransactionCancelled();
    this.dialogRef.close();
    this.transcationDetailsDialog.open(TranscationConfirmationDialogComponent);
  }
}
