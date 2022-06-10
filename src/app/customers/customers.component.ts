import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  
  isUpdate:boolean;
  itemForm: FormGroup | undefined;
  public displayedColumns = ['id', 'name', 'contact', 'address', 'email', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private formBuilder: FormBuilder, private readonly appService : AppService) { }

  ngOnInit(): void {
    this.isUpdate = false;
    
    this.dataSource.data = [];
    this.getCustomers();

    
    this.itemForm = this.formBuilder.group({
        id : [''],
        name : ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
        contact : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        address : ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
        email : ['', Validators.required]
    })
  }

  getCustomers(){
    this.dataSource.data = [];
    this.appService.getCustomer().subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
       this.dataSource.data = res.Data;
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  addCustomer(){
    let data = {
      "name": this.itemForm.controls['name'].value,
      "contact": this.itemForm.controls['contact'].value,
      "address": this.itemForm.controls['address'].value,
      "email": this.itemForm.controls['email'].value
    }
    this.appService.addCustomer(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.itemForm.reset();
        this.getCustomers();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  updateCustomer(){
    let data = {
      "id": this.itemForm.controls['id'].value,
      "name": this.itemForm.controls['name'].value,
      "contact": this.itemForm.controls['contact'].value,
      "address": this.itemForm.controls['address'].value,
      "email": this.itemForm.controls['email'].value
    }
    this.appService.updateCustomer(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.itemForm.reset();
        this.getCustomers();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  deleteCustomer(id){
    let data = {
      "id": id,
    }
    this.appService.deleteCustomer(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.getCustomers();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (element: any) => {
    this.isUpdate = true;
    this.itemForm.controls['id'].setValue(element.id);
    this.itemForm.controls['name'].setValue(element.name);
    this.itemForm.controls['contact'].setValue(element.contact);
    this.itemForm.controls['address'].setValue(element.address);
    this.itemForm.controls['email'].setValue(element.email);
  }
  public redirectToDelete = (id: string) => {
    
  }
  addNew(){
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

}
