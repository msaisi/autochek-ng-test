import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle } from 'src/app/services/_models/vehicle';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit, AfterViewInit {

  _vehicleId: any = null;
  _vehicle: any = new Vehicle();
  _carMedia: any[] = [];

  loan_calculator_results: any | null = {
    instalment: 0
  }

  loan_calculator_settings: {
    interest: {
      min: number,
      max: number,
      default: number
    },
    downpayment: {
      min: number,
      max: number,
      default: number
    },
    term: 0,
    loan_amount: number
  } = {
      interest: {
        min: 0,
        max: 0.5,
        default: 0.2
      },
      downpayment: {
        min: 0,
        max: 0.5,
        default: 0.2
      },
      term: 0,
      loan_amount: 0
    };

  queryParams: QueryParamsModel = new QueryParamsModel();
  _video_holder_img: string = "";
  loanCalculatorForm: FormGroup;

  constructor(
    private vehicleService: VehiclesService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this._video_holder_img = "assets/images/vid-holder.jpg";

    this.loanCalculatorForm = this.fb.group({
      loanTerm: ['', [Validators.required, Validators.min(0), Validators.max(0)]],
      intRate: ['', [Validators.required, Validators.min(0), Validators.max(0)]],
      tradeValue: ['', [Validators.min(0), Validators.required]],
      downPayment: ['', [Validators.required, Validators.min(0), Validators.max(0)]],
      vehiclePrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //get car id value
    this._vehicleId = this._route.snapshot.paramMap.get('id');
    this.getListingDetails();
  }

  ngAfterViewInit() {

  }

  /**
   * Populate _vehicle data based on the vehicle id
   */
  getListingDetails() {
    let lookup = {
      url: "car"
    };

    this.vehicleService.setLookupParams(lookup);
    this.vehicleService.getRecordById(this._vehicleId).subscribe(vehicle_record => {
      this._vehicle = vehicle_record;

      this.getCarMedia(this._vehicle.id);

      if (this._vehicle?.financingSettings?.loanCalculator) {


        this.loan_calculator_settings = {
          downpayment: {
            min: (this._vehicle.loanValue * this._vehicle.financingSettings.loanCalculator.ranges.minDownPayment),
            max: (this._vehicle.loanValue * this._vehicle.financingSettings.loanCalculator.ranges.maxDownPayment),
            default: (this._vehicle.loanValue * this._vehicle.financingSettings.loanCalculator.defaultValues.downPayment)
          },
          interest: {
            min: this._vehicle.financingSettings.loanCalculator.ranges.minInterestRate,
            max: this._vehicle.financingSettings.loanCalculator.ranges.maxInterestRate,
            default: this._vehicle.financingSettings.loanCalculator.defaultValues.interestRate
          },
          term: this._vehicle.financingSettings.loanCalculator.defaultValues.tenure,
          loan_amount: this._vehicle.loanValue,

        };

        let form_data = {
          loanTerm: this._vehicle.financingSettings.loanCalculator.defaultValues.tenure,
          intRate: this._vehicle.financingSettings.loanCalculator.defaultValues.interestRate,
          tradeValue: 0,
          downPayment: this.loan_calculator_settings.downpayment.default,
          vehiclePrice: this._vehicle.loanValue
        }

        //clear validations on form controls
        this.loanCalculatorForm.get('downPayment')?.clearValidators();
        this.loanCalculatorForm.get('intRate')?.clearValidators();
        this.loanCalculatorForm.get('loanTerm')?.clearValidators();

        //set validations on form controls
        this.loanCalculatorForm.get('downPayment')?.setValidators([Validators.required, Validators.min(this.loan_calculator_settings.downpayment.min), Validators.max(this.loan_calculator_settings.downpayment.max)]);
        this.loanCalculatorForm.get('intRate')?.setValidators([Validators.required, Validators.min(this.loan_calculator_settings.interest.min), Validators.max(this.loan_calculator_settings.interest.max)]);
        this.loanCalculatorForm.get('loanTerm')?.setValidators([Validators.required, Validators.min(1), Validators.max(this.loan_calculator_settings.term)]);

        //update validations instances
        this.loanCalculatorForm.get('downPayment')?.updateValueAndValidity();
        this.loanCalculatorForm.get('intRate')?.updateValueAndValidity();
        this.loanCalculatorForm.get('loanTerm')?.updateValueAndValidity();

        //clear form
        this.loanCalculatorForm.reset();

        //set form values
        this.loanCalculatorForm.patchValue(form_data);

      }

    });

  }

  resourceURL(value: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  getCarMedia(car_id: string) {

    let lookup = {
      url: "car_media"
    };

    let filters = { filters: { carId: car_id } };

    this.vehicleService.setLookupParams(lookup);
    this.vehicleService.getRecordSearch(filters).subscribe(media => {
      let media_items: any[] = [];

      //add default image as first media resource to avoid having empty image section
      media_items.push(
        {
          name: "default-image",
          type: "image",
          url: this._vehicle.imageUrl
        }
      );

      //add media images based on image type
      media.carMediaList.forEach((el: any, index: number) => {
        //set default container
        let media_type = "image";
        if (el.type.includes("video")) {
          media_type = "video";
        }
        /*if (el.type.includes("image")) {
          media_type = "image";
        }*/
        media_items.push(
          {
            name: el.name ? el.name : "default-" + media_type + "-" + index,
            type: media_type,
            url: el.url
          }
        );
      });

      // sim video data
      /*media_items.push(
        {
          name: "video-placeholder-1",
          type: "video",
          url: "http://player.vimeo.com/video/732628223?api=1"
        },
        {
          name: "video-placeholder-2",
          type: "video",
          url: "http://player.vimeo.com/video/732610911?api=1"
        }
      );*/

      this._carMedia = media_items;
      this.load_slider_settings();
    });
  }


  /**
   * Dynamically add flex slider slides + reinitialization after everything has been loaded
   */
  load_slider_settings() {

    let this_slider = $('.flexslider ul.slides');
    this._carMedia.forEach((el: any, index: number) => {

      let display_container = "";

      switch (el.type) {
        case 'video':
          display_container = '<iframe src="' + el.url + '" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen class="thumb-image" > </iframe>';
          break;

        default:
          display_container = '<div class="thumb-image"><img src="' + el.url + '" data-imagezoom="true" class="img-fluid" alt="" > </div>';
          break;
      }

      let slide = `<li data-thumb="${el.type === 'image' ? el.url : this._video_holder_img}" data-type="${el.type}" > ${display_container} </li>`;
      this_slider.append(slide);

    });


    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: "thumbnails",
      easing: "swing",
      video: true,
      /*before: function (slider: any) {
        console.log(slider);
        var active_id = $(slider).attr('type');
        console.log("slider started", active_id);
      },*/
      //slideshow: true,
      /* after: function () {
      alert("slider initialized...");
    },*/
    });

  }

  vehicleInquire() {
    alert("to complete code section...");
  }

  calculatePayments() {
    if (this.loanCalculatorForm.valid) {
      let form_values = this.loanCalculatorForm.value;

      let vehiclePrice = form_values.vehiclePrice,
        loanTerm = form_values.loanTerm,
        intRate = form_values.intRate,
        downPayment = form_values.downPayment,
        tradeValue = form_values.tradeValue,
        amount = parseInt(vehiclePrice),
        months = parseInt(loanTerm),
        down = parseInt(downPayment),
        trade = parseInt(tradeValue),
        totalDown = down + trade,
        annInterest = parseFloat(intRate),
        monInt = annInterest / 1200;

      if (!amount) {
        alert('Please add a loan amount');
        return;
      }

      this.loan_calculator_results.instalment = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (totalDown || 0))).toFixed(2);
    } else {
      // validate all form fields
      this.validateAllFormFields(this.loanCalculatorForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.updateValueAndValidity();
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  hasValidationError(error: any, scope: string) {
    return error[scope] ? true : false;
  }
  getValidationError(error: any, scope: string) {

    console.log(error[scope][scope]);

    return error[scope][scope];
  }


}
