import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ClientsService } from 'src/app/services/clients.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-billing-design',
  templateUrl: './billing-design.component.html',
  styleUrls: ['./billing-design.component.css']
})
export class BillingDesignComponent implements OnInit {

  constructor(private fb: FormBuilder, private cart: CartService, private route: Router, 
    private toastr: ToastrService, private sales: SalesService, private client: ClientsService, 
    private auth: AuthService) { }

  public form: FormGroup;
  totalList: any[] = [];
  totalAmount: number = 0;

  totalLenght: number = 0;
  currentUser: Client = new Client;
  data: any = new Object;

  ngOnInit(): void {
    this.auth._userStatus$.subscribe(res => {
      this.client.getClientByUsername(res.username).subscribe(async (val: any) => {
        this.currentUser = await val[0];
      });
    });

    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      surname: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
      phone: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]),
      cardNumber: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
      cardMonth: this.fb.control('', [Validators.required, Validators.pattern('^([1-9]|1[012])$')]),
      cardYear: this.fb.control('', [Validators.required, Validators.pattern('^(2[0-5]|1[0-9]|[1-9])$')]),
      cardCode: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{3}$')])
    }, { updateOn: 'submit' });

    this.cart.totalPrice$.subscribe(res => {
      this.totalList = res;
      this.totalLenght = this.totalList.length;
      let suma = 0;

      this.totalList.forEach((el: any) => {
        suma += el.total;
        this.totalAmount = suma;
      });
    });
  }

  async onSubmit(): Promise<void> {
    this.data = {
      "client_id": this.currentUser.client_id,
      "amount": this.totalLenght,
      "total": this.totalAmount,
    }

    await this.sales.postSale(this.data).subscribe(ret => console.log(ret));
    await this.cart.cleanCart();
    this.route.navigate(['']).then(() => this.toastr.success('Tu compra fue añadida a tu historial', 'Compra realizada con éxito'));
  }

}
