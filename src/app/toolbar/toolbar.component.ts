import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public isLoggedIn: any;

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  ngOnChanges(){
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  logout(){
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
    this.isLoggedIn = '';
  }

}
