import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
			emailAddress: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {
    
  }

  public async onSubmitLoginForm() {
    
  }

}
