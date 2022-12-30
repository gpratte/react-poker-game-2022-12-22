# React poker game

First thing to note is using node version v18.12.1 and npm version 8.19.2.

Running _npx create-react-app --version_ spit out 5.0.1.

_create-react-app_ installed react version 18 (as you can see by the react version in the package.json).

## step 14 error boundry
Use the React provided error boundry (https://reactjs.org/docs/error-boundaries.html) and surround the 
EditPlayer component. Customize the JSX that ErrorBoundry shows.

## step 13 edit player context
Move the EditPlayer state (and the functions that manipulate the state) 
into the useEditPlayer context hook.

Fixed the key for the EditPlayer component in the list so that it 
did not rerender when nothing changed.

Removed the <React.StrictMode> tag because it was causing duplicate logging.

## step 12 edit player
Show an edit player accordion panel. Allow to cancel, delete or update the game player.

The interesting part was resetting the panel to the original values when cancelling so
that the next time is was shown it reflected the correct values for the game player.

## step 11 add player
Can now add a player which will refresh the game.

Using GameContext for the state and functions that are needed by the Game component
and its children.

## step 10 show game players
Now have a gameClient that mock out an api call and return canned game data with eight players.

The Game now shows the GamePlayers in a table. 

Also have a playerClient and seasonClient that mock out an api call and return canned data. Will 
need this when adding a new game player.

## step 09 react context
Introduced a react context ``AddNotificationContext`` in the League that is accessed in 
the Game custom hook to avoid prop drilling (passing props to descendants).

## step 08 game details
Load the game when navigating to the game from the home page. Show the details of the game.

Added the moment timezone dependency
* _npm install --save moment-timezone_

Shows a spinner while waiting for the game data.

If there is an error it is shown in notification framework.

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


