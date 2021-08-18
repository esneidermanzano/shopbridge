
# Getting Started with *ShopBridge* Project

This project was bootstrapped  with [Create React App](https://github.com/facebook/create-react-app).
ShopBridge an e-commerce application that offers basic CRUD functionalities that helps manage different items 

## Local Proving

In order to run it, get repository content and go to main folder. Be sure you're using Node.js version 14, for this project specific version **14.17.5** was used with [NVM node manager.](https://github.com/nvm-sh/nvm) Inside the project directory `shopbridge/`, you can run to install node dependencies:

### `npm install`

Once installing dependencies has finished, runs the app in the development mode with: 
### `npm start`
The  in console we should be able to see a message as follows:


<p align="center">
  <img src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/1.png">
</p>

Ignore the warning, it's a little trick in React that doesn't represent any complication.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. If some changes are made,  then the page will reload.

## About the Project
The main files are as follows: 
`src/` folder that contains all paramount files of the project
`public/` react offers this folder to contain static files.  If we look inside this folder, we have the index.html  which is the paramount file and a set of files that are related to it.
`package.json` 

Inside `src/` we can observe multiple files as `index.js, App.js  and index.css`. The first one is the more important, it takes the `App.js` that contains the whole application and renders it into the `index.html`. \
`index.css` by other hand, implements styles that would be global for the whole application

Also, there are folders explained as follows:
`api/`: contains necessary instruction to use firebase api.
`components/`: all the necessary components that make up the app
`images/` images
`pages/` for better practices, every route should have its own file
`store/` files to construct a global state in react
`styles/` contains all styles for each component or page
`test/` all test needed

### Dependencies
Project was made using `create-react-app` an easy way to construct a React application with necessary elements to start  without using builder tools like webpack, all is handled already. Of course under the hood,  webpack, Babel, ESLint, etc. are used.

Only one extra dependency is used, `firebase` to implement a connection with an API.

### Styles 
All the styles applied are largely hand-made, React comes with and utility to use css modules, to avoid global styles for all the project, so  styles are scoped and achieved with css modules. Only index.css contains global styles.

### Testing
Project uses `Jest` and `React testing Library` for testing, as these come together in `create-react-app`\
To run test just type the follow command:
### `npm test`

Launches the test runner in the interactive watch mode.\
If a menu of options is showed since there is no new changes in tests from commit, then just select the option to run all test with key `a`,

<p align="center">
  <img src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/2.png">
</p>

At the end a message like this should be show:

<p align="center">
  <img src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/3.png">
</p>

#### Coverage 
To check current test coverage run:
### `npm run test:coverage`

This will execute all test and then create and inform with the coverage data. A table summarizing all coverage is show in current console. Also, there is a folder on root, `coverage/` inside it there is a `html` file that shows  information better and detailed.

As for now the coverage achieved is as show:

<p align="center">
  <img src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/4.png">
</p>

`index.js` and `reportWebVitals.js` are files that don't need to be tested, they are included in the count and low the score though. This can be achieved using excluding them with an`jest.config.js`file

### Deploy

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Time spent

The project took 5 days to be ready, as it was started on Saturday afternoon, using 8 hours a day on average.
Four aspects are to be taken into account:

 - Frontend functionality 
 - Frontend presentational aspects (styling, DOM, etc)  
 - Required Validations 
 - Unit Test Coverage 
  
   Is quite complicated  to give an exact amount of time spend in the project since all things with those aspects are made in the go, but a likely comparison is as follows:

<p align="center">
  <img src="https://raw.githubusercontent.com/esneidermanzano/shopbridge/main/screenshots/5.png">
</p>

#### To improve
- I like CSS and styling, but I have to recognize that I took quite the time to achieve the styles used in the project. For the test purpose, it would have been  better to use a library with styled components like [Reactstrap] (https://reactstrap.github.io/) that would have saving quite the time
- Testing was quite challenging but interesting as well.

