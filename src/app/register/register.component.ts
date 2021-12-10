import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string= '';
 registerForm: FormGroup =new FormGroup({
   first_name:new FormControl(null , [Validators.required,Validators.minLength(3),Validators.maxLength(6)]),
   last_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(6)]),
   age:new FormControl(null,[Validators.required,Validators.min(16),Validators.max(80)]),
   email:new FormControl(null,[Validators.required]),
   password:new FormControl(null,[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
 });
 constructor(public  _AuthService:AuthService) { }


  ngOnInit(): void {}

  submitRegistration(registerForm: FormGroup){

 if (registerForm.valid){
   this._AuthService.register(registerForm.value).subscribe((response:any)=>{
     if (response.message=='success'){

     }else{
        this.error = response.error.email.message;
     }
   })
 }
  }


}
