import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customerList: any;
  productList: any;
  orderList: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.customerList = [];
    this.orderList = [];
    this.productList = [];
    this.getAllProducts();
    this.getCustomers();
    this.getOrders();
  }

  getCustomers(){
    
    this.appService.getCustomer().subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
       this.customerList = res.Data;
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  getOrders() {

    this.appService.getAllOrder().subscribe((res: any) => {
      if (res.StatusCode == 200 && res.Status == "Success") {
        this.orderList = res.Data;
      }
      else {
        this.appService.openSnackBar(res.Message, "Close");
      }
    }, err => {
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  getAllProducts() {
    this.appService.getAllProduct().subscribe((res: any) => {
      if (res.StatusCode == 200 && res.Status == "Success") {
        this.productList = res.Data;
      }
      else {
        this.appService.openSnackBar(res.Message, "Close");
      }
    }, err => {
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

}
