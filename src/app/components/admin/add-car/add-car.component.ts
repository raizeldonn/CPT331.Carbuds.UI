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
      carTransmission: new FormControl('', Validators.required),
      carKilometers: new FormControl('', Validators.required),
      carLocation: new FormControl('', Validators.required),
      carBody: new FormControl('', Validators.required),
      carDoors: new FormControl('', Validators.required),
      carSeats: new FormControl('', Validators.required),
      carPriceHour: new FormControl('', Validators.required),
      carPriceDay: new FormControl('', Validators.required),
      carImage: new FormControl('', Validators.required),
      carStatus: new FormControl('', Validators.required)
		});
  }

  ngOnInit(): void {
  }

  public async onSubmitAddCarForm() {
    
    if(this.addCarForm.valid){
			console.log("form valid. form submitted");
      console.log(this.addCarForm);

      this._carService.createCar(
        this.addCarForm.value['carMake'],
        this.addCarForm.value['carModel'],
        this.addCarForm.value['carYear'],
        this.addCarForm.value['carTransmission'],
        this.addCarForm.value['carKilometers'],
        this.addCarForm.value['carLocation'],
        this.addCarForm.value['carBody'],
        this.addCarForm.value['carDoors'],
        this.addCarForm.value['carSeats'],
        this.addCarForm.value['carPriceHour'],
        this.addCarForm.value['carPriceDay'],
        this.addCarForm.value['carImage'],
        this.addCarForm.value['carStatus']
      )}
      
    else{
      //console log just here as placeholder
      //will add validation
      console.log("invalid form")
    }
  }

}
