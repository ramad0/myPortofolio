import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services_/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _router:Router,private _auth:AuthService){}

  loginForm:FormGroup = new FormGroup({
    userName: new FormControl(''),
    passWord: new FormControl('')
  })

msg=''

  login(){
    const {userName,passWord} = this.loginForm.value;
this._auth.postLogin(userName,passWord).subscribe(
  {
    next: ()=> this._router.navigate(['/home']),
    error:(err)=> {
      this.msg= err.error.message;
      console.log(this.msg);

    }
  }
);

  }

}
