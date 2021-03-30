import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  public addCarForm: FormGroup;

  constructor() {
    this.addCarForm = new FormGroup({
			carMake: new FormControl('', Validators.required),
			carModel: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {
  }

  public async onSubmitAddCarForm() {
    
    if(this.addCarForm.valid){
			console.log("form valid. form submitted");
		}
    else{
      console.log("invalid form")
    }
  }

}
