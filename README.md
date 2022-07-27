# Autochek App
This is an Angular Web App that consumes specific myautochek API to consume cars & models as well as car media.

Design Template: 
- <https://w3layouts.com/template/electro-store-an-ecommerce-theme-bootstrap-template/>

APIs:
-  Get all popular makes: <https://api.staging.myautochek.com/v1/inventory/make?popular=true>
-  List all cars (paginated): <https://api.staging.myautochek.com/v1/inventory/car/search>
-  List car detail page: <https://api.staging.myautochek.com/v1/inventory/car/{carId>}.
-  Get Car media: <https://api.staging.myautochek.com/v1/inventory/car_media?carId={carId>}

## Dev Dependencies
1. jQuery Types (@types/jquery) -  I also had to add the jquery type to tsconfig file to use jQuery definitions in Angular components
2. NgX Pagination (ngx-pagination) - for listing pagination
3. Angular 13 (only tested on local environment)

## How to run
1. Git clone the repo
```bash
git clone git@github.com:msaisi/cars-test.git
```

2. Go into the root directory and install dependencies
```bash
cd cars-test && npm install
```

3. Start the App
> npm command
```**bash**
npm start
```
> ng command
```bash
ng serve
```

## Running Tests
> Tests are implemented with Jasmine which comes inbuilt with Angular Framework.
**Note:** Close the app  first, if you had been running it before to avoid getting the error _"Port 9876 is already in use"_

> npm command
```bash
npm test
```
> ng command
```bash
ng test
```

## Finished WebApp
_Note:_ Angular App will run on default port _"4200"_ therefore URL will be _"http://localhost:4200"_ ( {app_url} will be used in place of URL value )

Note: The above is only true if agular app is not served under aspecific port  i.e. _"ng serve --port=5200"_ which will force the URL port to change accordingly

### 1. Get all popular makes
Webpage: 
```
URL {app_url}
```
- Popular Makes Section

### 2. List all cars + pagination
Webpage:
```
URL {app_url}/listing
```
- Listing section
- Pagination section

### 3. List car detail page + media
Webpage:
```
URL {app_url}/listing/{carId} 
```
- Listing details section
- Media section
```


### Challenges / Workarounds
1. **Task 1: Get all popular makes:** No link for make details so I could not implement click functionality on make list section on the homepage.
2. **Task 2: List all cars:** For pagination, it was not easy to figure out which attributes to pass for query parmeters. I managed to figure out 'pageSize' for page size but I could not get anything for page number.

Due to the above challenge, I could not 100% implement page navigation functionality.
3. **General**:
Vehicle Listing Page: Color codes on availability indicate how 'hot' the deal is or quality/ rating of the listing based on 'gradeScore' -> actual code functionality has not been implemented since I am not aware of the perfect scope value.

## To Do
1. NgRx state magement to avoid multiple API calls for carlist/ brands on different sections of the WebApp (Footer/ Header/ Sidebar)
2. Implement Search on sidebar + header as well as sidebar filtering

## Autochek Web App
1. Home Page 
URL {app_url}/

2. Listing Page 
URL {app_url}/

3. Listing Page Details 
URL {app_url}/{carId}
