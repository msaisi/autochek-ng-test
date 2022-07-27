import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle } from 'src/app/services/_models/vehicle';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit, AfterViewInit {

  _vehicleId: any = null;
  _vehicle: any = new Vehicle();
  _carMedia: any[] = [];
  loan_calculator_vals: any | null = {
    downpayment: 0,
    interest_rate: 0,
    //percentage: 0,

    user_check: {
      vehicle_price: 0,
      downpayment: 0,
      vehicle_tradein_price: 0,
      interest_rate: 0,
      term: 0,
      results: {
        instalment: 0
      }
    }
  };

  loan_calculator_settings: {
    interest: {
      min: number,
      max: number,
      default: number,
      //set: number,
      //step: number,
    },
    downpayment: {
      min: number,
      max: number,
      default: number,
      //set: number,
      //step: number,
    },
    term: 0,
    loan_amount: number
  } = {
      interest: {
        min: 0,
        max: 0.5,
        default: 0.2,
        //set: 0.2,
        //step: 0.1,
      },
      downpayment: {
        min: 0,
        max: 0.5,
        default: 0.2,
        //set: 0.2,
        //step: 0.1,
      },
      term: 0,
      loan_amount: 0
    };

  //loanPercentage

  /*
    downPayment: 0.20000000298023224
    interestRate: 0.23999999463558197
    tenure: 48


    maxDownPayment: 0.5
    maxInterestRate: 0.23999999463558197
    minDownPayment: 0.20000000298023224
    minInterestRate: 0.18000000715255737
    tenure: 48

  */


  queryParams: QueryParamsModel = new QueryParamsModel();
  _video_holder_img: string = "";

  constructor(
    private vehicleService: VehiclesService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this._video_holder_img = "assets/images/vid-holder.jpg";
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

        this.loan_calculator_vals.user_check.vehicle_price = this._vehicle.loanValue;
        this.loan_calculator_vals.user_check.downpayment = this.loan_calculator_settings.downpayment.default;
        this.loan_calculator_vals.user_check.interest_rate = this._vehicle.financingSettings.loanCalculator.defaultValues.interestRate;
        this.loan_calculator_vals.user_check.term = this._vehicle.financingSettings.loanCalculator.defaultValues.tenure;

      }

      console.log(this.loan_calculator_settings);
      console.log(this.loan_calculator_vals);

    });

  }

  /*rangeChange(event: any, scope: string) {

    console.log(scope, event.target.value);

    switch (scope) {
      case "downpayment":

        this.loan_calculator_settings.downpayment.set = event.target.value;

        break;
      case "interest_rate":

        this.loan_calculator_settings.interest.set = event.target.value;

        break;
    }

  }*/

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
    //console.log("calc payment");

    let vehiclePrice = this.loan_calculator_vals.user_check.vehicle_price,
      loanTerm = this.loan_calculator_vals.user_check.term,
      intRate = this.loan_calculator_vals.user_check.interest_rate,
      downPayment = this.loan_calculator_vals.user_check.downpayment,
      tradeValue = this.loan_calculator_vals.user_check.vehicle_tradein_price,
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

    if (!months) {
      months = 60;
      this.loan_calculator_vals.user_check.vehicle_price = 60;
    }

    if (!downPayment) {
      down = 0;
      this.loan_calculator_vals.user_check.downpayment = 0;
    }

    /*if (!trade) {
      this.loan_calculator_vals.user_check.vehicle_tradein_price = 0;
    }*/

    if (!annInterest) {
      annInterest = 3.25;
      this.loan_calculator_vals.user_check.interest_rate = 3.25;
    }

    this.loan_calculator_vals.user_check.results.instalment = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (totalDown || 0))).toFixed(2);
  }


}
