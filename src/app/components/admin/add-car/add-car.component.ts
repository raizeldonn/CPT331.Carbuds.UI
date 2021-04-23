import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car.model';
import { v4 as uuidv4 } from 'uuid';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParkingLocationService } from 'src/app/services/parking-location.service';
import { ParkingLocation } from 'src/app/models/parkingLocations/parkingLocation.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  public addCarForm: FormGroup;
  public carRecord?: Car;
  public availableParkingLocations: ParkingLocation[] = [];

  constructor(private _carService: CarService, private _toastr: ToastrService, public _activeModal: NgbActiveModal, private _plService: ParkingLocationService) {
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
      carImage: new FormControl(''),
      carStatus: new FormControl('', Validators.required)
    });

    
  }

  ngOnInit(): void {
    
    this.getAvailableParkingLocations();
    
    if(this.carRecord != undefined){
      const carStatus = this.carRecord.isActive ? 'Active' : 'Inactive';
      
      this.addCarForm.setValue({
        carMake: this.carRecord.make,
        carModel: this.carRecord.model,
        carYear: this.carRecord.year,
        carTransmission: this.carRecord.transmission,
        carKilometers: this.carRecord.kilometers,
        carLocation: this.carRecord.location,
        carBody: this.carRecord.body,
        carDoors: this.carRecord.doors,
        carSeats: this.carRecord.seats,
        carPriceHour: this.carRecord.priceHour,
        carPriceDay: this.carRecord.priceDay,
        carImage: '',
        carStatus: carStatus
      });
      
    }
  }

  public async getAvailableParkingLocations(){
    const queryResponse = await this._plService.listAvailabelParkingLocations();
    if(queryResponse.success){
      this.availableParkingLocations = queryResponse.parkingLocations;
    }
    else{
      this._toastr.error(queryResponse.errorMessage, 'Error getting Locations to Allocate this Car to');
    }
  }

  public async onSubmitAddCarForm() {

    if (this.addCarForm.valid) {
      try {
        
        const carActive: boolean = this.addCarForm.value['carStatus'] == 'Active' ? true : false;
        const carId = this.carRecord != undefined ? this.carRecord.uuid : uuidv4()

        let carToAdd: Car = {
          uuid: carId,
          make: this.addCarForm.value['carMake'],
          model: this.addCarForm.value['carModel'],
          year: this.addCarForm.value['carYear'],
          transmission: this.addCarForm.value['carTransmission'],
          kilometers: this.addCarForm.value['carKilometers'],
          body: this.addCarForm.value['carBody'],
          location: this.addCarForm.value['carLocation'],
          doors: this.addCarForm.value['carDoors'],
          seats: this.addCarForm.value['carSeats'],
          priceHour: this.addCarForm.value['carPriceHour'],
          priceDay: this.addCarForm.value['carPriceDay'],
          imageId: '',
          isActive: carActive
        };

        let addCarResponse = await this._carService.addEditCar(carToAdd);

        if (addCarResponse.success) {
          this._toastr.success('','Car Added');
          this._activeModal.close(carToAdd);
        }
        else {
          this._toastr.error(addCarResponse.errorMessage, 'Unable to add car');
        }
      } catch (e) {
        this._toastr.error(e, 'Unable to add car');
      }
    }
    else {
      console.log('invalid')
    }
  }

  public onCancelClick(){
    this._activeModal.dismiss(null);
  }

}
