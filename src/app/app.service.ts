import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ADD_CUSTOMER, ADD_PRODUCT, CREATE_ORDER, DELETE_CUSTOMER, DELETE_PRODUCT, GET_CUSTOMER, GET_ORDER, GET_PRODUCT, LOGIN, UPDATE_CUSTOMER, UPDATE_PRODUCT } from "./app.constants";

@Injectable({
    providedIn : 'root'
})

export class AppService{
    constructor(private http: HttpClient, private snackBar: MatSnackBar){

    }

    getHeaders(){
        return new HttpHeaders().set("Content-Type" , "Application/json" ).set('Server', '1');
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration : 3000,
            horizontalPosition : 'center',
            verticalPosition : 'top'
        });
      }

    login(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${LOGIN}`, data, {headers : myHeaders});
    }

    addProduct(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${ADD_PRODUCT}`, data, {headers : myHeaders});
    }

    createOrder(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${CREATE_ORDER}`, data, {headers : myHeaders});
    }

    addCustomer(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${ADD_CUSTOMER}`, data, {headers : myHeaders});
    }

    updateProduct(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${UPDATE_PRODUCT}`, data, {headers : myHeaders});
    }

    updateCustomer(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${UPDATE_CUSTOMER}`, data, {headers : myHeaders});
    }

    deleteProduct(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${DELETE_PRODUCT}`, data, {headers : myHeaders});
    }

    deleteCustomer(data){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.post(`${DELETE_CUSTOMER}`, data, {headers : myHeaders});
    }

    getAllProduct(){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.get(`${GET_PRODUCT}`, {headers : myHeaders});
    }
    getAllOrder(){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.get(`${GET_ORDER}`, {headers : myHeaders});
    }

    getSingleProduct(id){
        let myHeaders: HttpHeaders = this.getHeaders();
        let myParams: HttpParams = new HttpParams().set("id", id)
        return this.http.get(`${GET_PRODUCT}`, {headers : myHeaders, params : myParams});
    }


    getCustomer(){
        let myHeaders: HttpHeaders = this.getHeaders();
        return this.http.get(`${GET_CUSTOMER}`, {headers : myHeaders});
    }

    getCustomerById(id){
        let myHeaders: HttpHeaders = this.getHeaders();
        let myParams: HttpParams = new HttpParams().set("id", id)
        return this.http.get(`${GET_CUSTOMER}`, {headers : myHeaders, params : myParams});
    }


}