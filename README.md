
# Getting Started with _ShopBridge_ Project

  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

ShopBridge is an e-commerce application that offers basic CRUD functionalities to help manage ítems. It can be tested at https://shopbapi-2cbf8.web.app/

  

## Testing Locally

  

In order to run it, pull this repository and go to main folder. Be sure you're using Node.js version 14 (specific version used for this Project was **14.17.5**  [NVM node manager.](https://github.com/nvm-sh/nvm)) Inside the project directory `shopbridge/`, run the following commands to install dependencies:

  

### `npm install`

  

After installing dependencies, run the app in the development mode with:

  

### `npm start`

  

In the console, you should see:

  

<p  align="center">
<img  src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/1.png">
</p>

  

Ignore the warning, it's a little React trick.

  

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. If changes are made to the app code, the page will reload.

  

## About the Project

  

The main files are as follows:

`src/` folder that contains the main files of the project
`public/` react offers this folder to contain static files. If we look inside this folder, we have the index.html which is the main file and a set of files that are related to it.
`package.json`

  
Inside `src/` we can observe multiple files such as `index.js, App.js and index.css`. The first one is the most important one, it takes the `App.js` file that contains the whole application and renders it into the `index.html`. \
On the other hand, `index.css`, implements global styles.

Other Important folders are:

`api/`: contains necessary instructions to use the firebase api.
`components/`: all the necessary components that make up the app
`images/` images of the items
`pages/` following best practices, every route should have its own file
`store/` files to construct a global state in react
`styles/` contains all styles for each component or page
`test/` all implemented tests.

  

## Dependencies

  

Project was made using `create-react-app`, an easy, simple way to start building a React application, without manually using builder tools like webpack. Of course, webpack, Babel, ESLint, etc. are used on the background.

  

`firebase` is the only extra dependency used, for API connection purposes.

  

## Styles

  

The applied styles are largely hand-made. React comes with a utility to use _css modules_, in order to avoid global styles, so styles are scoped. Only `index.css` contains global styles.

  

## Testing

  

Project uses `Jest` and `React testing Library` for testing, these come together in `create-react-app` \
To run tests just type the follow command:

  

### `npm test`

  

Launches the test runner in the interactive watch mode. \
If a menu of options is showed, then just press key `a` to run all the tests:

  

<p  align="center">
<img  src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/2.png">
</p>

  

At the end, a message like this should be shown:

  

<p  align="center">
<img  src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/3.png">
</p>

  

### Coverage

  

To check current test coverage run:

  

### `npm run test:coverage`

  

This will execute all test and then create a report with the coverage data. A table summarizing all coverage is show in the console. After executing tests, a `coverage/` folder will be created in the root folder, cointaining an `html` file that shows test information in a more detailed manner.

  

Coverage for the current version of the App:

  

<p  align="center">
<img  src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/4.png">
</p>

  

`index.js` and `reportWebVitals.js` are files which don't need to be tested. They are included in the testing process and lower the score, though. This can be avoided by excluding them via `jest.config.js`file

  

## Deploy

  

To deploy React applications we need a Static Site Host. Given that React it's used to create a SPA, its build generates static files which don’t need a resource that offers server side code. First, we need to create a build of our application by using:

  

### `npm run build`

  

This will build the app for production and create a `build` folder as shown in the image. With this, the app is ready to be deployed. Of course, depending on the hosting choice, there'll be a way to add the build folder to it and serve the application.

  

> Note: build folder is included in .gitignore since it can be generated.

  

<p  align="center">
<img  src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/6.png">
</p>

  

### Deploy to Firebase

  

This app is being served on firebase at https://shopbapi-2cbf8.web.app/ you can test its functionality there.
There are some files in root that are used to deploy on Firebase. 
- `firebase.json` and `.firebaserc` are files generated by _firebase-cli_ to access Firebase services. 
- `.github/workflows`: contains the `firebase.yml` to define deployment steps.

  

Firebase hosting, database, and firestore (to serve images) are being used in this project and deployment process to firebase hosting is triggered by GitHub actions.

  

### Dockerfile

  

Another option is to use a Dockerfile, since services as GCP or AZURE used container registry, we can deploy this application wrapping it into an image ready to be served.

- `Dockerfile` file show all the instructions necessary to build an image with the application in production mode.
- `nginx` folder is needed since in it there is a file to configure nginx to allow SPA applications to handle routes.

  

We can test it locally by executing:

### `docker build -t image-name .`

and then:

### `docker run -d -it -p 80:80/tcp --name rimage-name:latest`

  

Local server must be running at localhost.

  

## Time spent

 
The project took 5 days to complete, as it was started on Saturday afternoon, using 8 hours a day on average.
Four aspects are to be taken into account:

- Frontend functionality
- Frontend presentational aspects (styling, DOM, etc)
- Required Validations
- Unit Test Coverage

  

It’s quite complicated to give an exact amount of time spent in the project since things are made on the go, but a likely breakout could be:

  

<p  align="center">
<img  src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/5.png">
</p>

  

### To improve

- While I the current CSS and styling, I have to recognize that It took me quite a while to achieve the styles used in the project. For testing purposes, I think it would have been better to use a library with styled components like [Reactstrap] (https://reactstrap.github.io/) that would have saved quite a bit of time.
- Testing was quite challenging but interesting as well.
