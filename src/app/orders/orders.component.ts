import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  isUpdate: boolean;
  itemForm: FormGroup | undefined;
  customerList: any;
  productList: any;

  public displayedColumns = ['id', 'name', 'contact', 'address', 'email'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private appService: AppService) { }

  ngOnInit(): void {
    this.isUpdate = false;
    this.dataSource.data = [];
    this.getOrders();

    this.customerList = [];
    this.getCustomers();

    this.productList = [];
    this.getAllProducts();


    this.dataSource.data = [];

    this.itemForm = this.formBuilder.group({
      date: ['', Validators.required],
      customer: ['', Validators.required],
      itemList: ['', Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTotalOrderAmount() {
    let sum = 0;
    let y = this.itemForm.controls['itemList'].value;
    y.forEach(x => {
      sum = sum + parseFloat(x.price)
    });
    return sum;
  }

  getOrders() {

    this.appService.getAllOrder().subscribe((res: any) => {
      if (res.StatusCode == 200 && res.Status == "Success") {
        this.dataSource.data = res.Data;
      }
      else {
        this.appService.openSnackBar(res.Message, "Close");
      }
    }, err => {
      this.appService.openSnackBar(err.Message, "Close");
    })
  }
  getCustomers() {

    this.appService.getCustomer().subscribe((res: any) => {
      if (res.StatusCode == 200 && res.Status == "Success") {
        this.customerList = res.Data;
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



  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (element: any) => {
    this.isUpdate = true;
    this.itemForm.controls['customerid'].setValue(element.customerid);
    this.itemForm.controls['name'].setValue(element.name);
    this.itemForm.controls['contact'].setValue(element.contact);
    this.itemForm.controls['address'].setValue(element.address);
    this.itemForm.controls['email'].setValue(element.email);
  }
  public redirectToDelete = (id: string) => {

  }
  addNew() {
    this.isUpdate = false;
    this.itemForm.reset();
  }

  public doFilter = (event) => {
    console.log(event);
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  isInvalid(form: FormGroup, field: string, errorValue: string) {
    if (errorValue == 'required') {
      return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
    }
    else if (errorValue == 'pattern') {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors['pattern'];
    }
    else if (errorValue === 'email') {
      return form.get(field).touched && form.get(field).hasError('email');
    }
  }

  createOrder() {
    let data = {
      date: moment(this.itemForm.controls['date'].value).format('MM/DD/YYYY'),
      cstId: this.itemForm.controls['customer'].value.id,
      name: this.itemForm.controls['customer'].value.name,
      email: this.itemForm.controls['customer'].value.email,
      contact: this.itemForm.controls['customer'].value.contact,
      address: this.itemForm.controls['customer'].value.address,
      prdList: []
    }

    let y = this.itemForm.controls['itemList'].value;
    y.forEach(x => {
      let obj = {
        prdId : x.id,
        quantity : 1,
        amount : parseFloat(x.price),
        totalAmmount : parseFloat(x.price)
      }
      data.prdList.push(obj);
    });

    this.appService.createOrder(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.itemForm.reset();
        this.getOrders();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })

  }

}
