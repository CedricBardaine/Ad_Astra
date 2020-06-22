# AdAstraApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Angular infos

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Documentation

The front app of Ad Astra uses the [TypeDoc](https://typedoc.org) library to generate the documentation. TypeDoc is installed in the project. 

### Generate the doc

Run `npx typedoc --options .\typedoc.json` in the app directory.

## Deploy

The deployment is made to Netlify.  
 [![Netlify Status](https://api.netlify.com/api/v1/badges/2806f8b0-474f-4601-b26b-9aaa708ef60f/deploy-status)](https://app.netlify.com/sites/ad-astra/deploys)

The command `ng add @netlify-builder/deploy` allows to **install** AND/OR configure Netlify, asking after the set up the **ID of the site** & the **personal access token**.  
⚠️ Doing that will store the token in \angular.json. DO NOT EVER PUSH this token, or you will have to delete it on Netlify asap. ⚠️

Once configured, the command `ng run ad-astra-app:deploy` builds the front app to the default directory and deploys it to Netlify. 