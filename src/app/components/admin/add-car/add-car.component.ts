import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  public addCarForm: FormGroup;

  constructor( private _carService: CarService ) {
    this.addCarForm = new FormGroup({
			carMake: new FormControl('', Validators.required),
			carModel: new FormControl('', Validators.required),
      carYear: new FormControl('', Validators.required),
      carImage: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {
  }

  public async onSubmitAddCarForm() {
    
    if(this.addCarForm.valid){
			console.log("form valid. form submitted");
      console.log(this.addCarForm.value['carMake']);

      this._carService.addCar(
        this.addCarForm.value['carMake'],
        this.addCarForm.value['carModel'],
        this.addCarForm.value['carYear'],
        this.addCarForm.value['carImage']
      )}
      
    else{
      console.log("invalid form")
    }
  }

}
