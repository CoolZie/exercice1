import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from '../../interfaces/user';
// import * as $ from "jquery";
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any=[];
  userForm: FormGroup= new FormGroup({
    id: new FormControl(""),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    userName: new FormControl("", [Validators.required]),
    createdDate: new FormControl("", [Validators.required]),
    registrationNumber: new FormControl("", [Validators.required]),
  });;
  user:User= this.userForm.value
  constructor(public userService : UserService) { }
  ngOnInit(): void {
    this.users = this.userService.listUser();
  }
  openModal(){
    $('#add-user').modal('show')
    // $( "#foo" ).trigger( "click" );
  }
  delete(i: number){
    this.users = this.userService.delete(i);
    console.log(i);
  }
  onSubmit() {
    if(this.userForm.valid){
      this.user= this.userForm.value
      this.user.id = (this.getRandomInt(100000000,999999999)).toString()
      this.users = this.userService.add(this.user);
      $('#add-user').modal('hide')
      this.userForm.reset();
    }else {
      console.log(this.userForm.controls);
      this.validateAllFormFields(this.userForm); //
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field); 
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control); 
      }
    });
  }
  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
