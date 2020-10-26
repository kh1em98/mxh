# Social App - MEAN stack 👋 (Updating...)

## Demo : https://sleepy-caverns-33833.herokuapp.com/ 🎧 
Use free database and free hosting so it is very slow

## Features 🔭 
- 🔭 Create post with image
- 🌱 Like, comment, share post
- 👯 Show user profile
- 🥅 Edit profile
- ⚡ Change avatar
- .....

## 🔭 How I implement 

### Operation with post 📕 
- 🌱 Create *subject* ```update```, which emit a function that change the posts[]
- 🌱 Use ```scan``` method to create a stream, contain ```posts[]``` after updated by this function

### Limit amount of posts each time loaded.📕 
- 🌱 Create an ```observable1$``` emit a value when scroll to bottom of page
- 🌱 Create an ```observable2$``` to load post
- 🌱 Use ```exhaustMap``` from ```RxJS```, so that when I scroll to bottom, it emits a value. After that, it will subscribe observable that load posts. If user keep scrolling to bottom, the value emit from ```observable1$``` will be skipped, don't create a lot request to server.




=======
# Mxh

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
>>>>>>> prod
