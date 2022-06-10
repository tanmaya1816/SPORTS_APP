import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private appService: AppService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }


  login(){
    let data = {
      email : this.loginForm.controls['email'].value,
      password : this.loginForm.controls['password'].value
    }
    this.appService.login(data).subscribe((res: any)=>{
      if(res.StatusCode == 200 && res.Status == "Success"){
        this.appService.openSnackBar(res.Message, "Close")
         localStorage.setItem('isLoggedIn', "true");
        this.router.navigate(['dashboard']);
      }
      else{
        this.appService.openSnackBar(res.Message, "Close");
      }
    }, err=>{
      this.appService.openSnackBar(err.Message, "Close");
    })
    
  }

}
