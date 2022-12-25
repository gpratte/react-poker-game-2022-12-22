# React poker game

First thing to note is using node version v18.12.1 and npm version 8.19.2.

Running _npx create-react-app --version_ spit out 5.0.1.

_create-react-app_ installed react version 18 (as you can see by the react version in the package.json).

## step 07 routing
Added the react routing dependency.
* _npm i --save react-router-dom@5.1.2_

The League component has all the common components (top nav bar, footer, ...) and 
the routing will swap different components into the main part of the page.

## step 06 league component
Created the top level league component (in reality just moved everything that was developed for Game 
up to a League component and made the inner components their own files).

## step 05 custom hook use notifications
Moved all the state management out of Game.jsx and into a custom hook in useNotifications.js

## step 04 notifications offcanvas
Bring up a list of all notifications by clicking on the bell in the nav bar.

Delete all notifications or one at a time.

## step 03 error notification toast
Use a bootstrap Toast for error notifications. Also show notification bell and count in nav bar.

## step 02 game header bar
Added bootstrap, lodash and fontawesome dependencies
* _npm install --save react-bootstrap bootstrap_
* _npm install --save lodash_
* _npm install --save @fortawesome/fontawesome-free_

Downloaded the free the Font Awesome 6.2.1 css and webfonts
* https://use.fontawesome.com/releases/v6.2.1/fontawesome-free-6.2.1-web.zip

Copied the file from fontawesome-free-6.2.1-web/css to public/fontawesome/css 
and from fontawesome-free-6.2.1-web/webfonts to public/fontawesome/webfonts.

Added links to the header in index.html

    <head>
      <link href="/fontawesome/css/fontawesome.css" rel="stylesheet">
      <link href="/fontawesome/css/brands.css" rel="stylesheet">
      <link href="/fontawesome/css/solid.css" rel="stylesheet">
    </head>

Also imported the bootstrap css

    import 'bootstrap/dist/css/bootstrap.min.css';

Removed unwanted files and coded the beginning of the Game component with a navigation header.

## step 01 create development environment
To get started did the following.

From https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
* _npx create-react-app react-poker-game-2022-12-22_
* _cd react-poker-game-2022-12-22_

Removed the .git directory
* _rm -rf .git_

Created github repository react-poker-game-2022-12-22

Hook up the react-poker-game-2022-12-22 with the github repository
* _git init_
* _git add ._
* _git commit -m "initial commit"_
* _git remote add origin git@github.com:gpratte/react-poker-game-2022-12-22.git_
* _git push origin master_

Make sure the initial react application works. Should see the default react page in the web browser at http://localhost:3000/
* _npm start_


Edit the README.md with these notes and push changes to master.
* _git add ._
* _git commit -m "update readme"_
* _git push origin master_


Create the first branch
* _git checkout -b step-01-create-development-environment_
* _git push origin step-01-create-development-environment_


