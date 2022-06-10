import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  isUpdate:boolean;
  itemForm: FormGroup | undefined;
  public displayedColumns = [ 'id', 'name','price', 'color', 'size', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.isUpdate = false;
    
    this.dataSource.data = [];
    this.getAllProducts();

    this.itemForm = this.formBuilder.group({
        name : ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
        code : ['', ],
        price : ['', Validators.required],
        color : ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
        size : ['', Validators.required],
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
    this.itemForm.controls['name'].setValue(element.name);
    this.itemForm.controls['code'].setValue(element.id);
    this.itemForm.controls['price'].setValue(element.price);
    this.itemForm.controls['color'].setValue(element.color);
    this.itemForm.controls['size'].setValue(element.size);
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

    getAllProducts(){
    this.appService.getAllProduct().subscribe((res: any)=>{
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

  addProduct(){
    let data = {
      // "code": this.itemForm.controls['code'].value,
      "name": this.itemForm.controls['name'].value,
      "price": this.itemForm.controls['price'].value,
      "color": this.itemForm.controls['color'].value,
      "size": this.itemForm.controls['size'].value
    }
    this.appService.addProduct(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.itemForm.reset();
        this.getAllProducts();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  updateProduct(){
    let data = {
      "id": this.itemForm.controls['code'].value,
      "name": this.itemForm.controls['name'].value,
      "price": this.itemForm.controls['price'].value,
      "color": this.itemForm.controls['color'].value,
      "size": this.itemForm.controls['size'].value
    }
    this.appService.updateProduct(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.itemForm.reset();
        this.getAllProducts();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

  deleteProduct(id){
    let data = {
      "id": id,
    }
    this.appService.deleteProduct(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
        this.getAllProducts();
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    },err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
  }

}
