# IMPORTANT #

We are still in active develop stage so the <b>code is not optimized yet</b> and it will probably change over the time. Bottom line: it's not final, not even close.


# README #

These are the files we are working on. We have clone our existing Bitbucket repo and merge it on this one. We'll keep working on this one from now on.

We are developing the front end using <b>React + Redux + React-Router </b>. As pointed out on Telegram,  we are also using a proxy in order to be able to make the calls to the API.

Our proxy-server is pointing locahost:3001. The installation is located on the folder "API_server" and it has his own package.json.

We have modified npm start to launch both, the react server and the proxy, at the same time following this [procedure](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/).

We are using ES6 as much as possible.

Installation should be straight forward, since I think all depencencies has been included in the package, so just:
```
npm install
```
Should be enough to install the projectl. To run it:
```
npm start
```

### How is it organized? ###

Glad you asked. We are doing our best (and that means that we can still decide to reorganize the files in a different way). Right now we have separated actions, reducers, pages, modals and components

* Actions:
> We are grouping all redux actions under this file instead of doing it page to page. It's easier for us this way.

* Reducers:
> We are grouping all reducers under this file instead of doing it page to page. It's easier for us this way.

* Pages & Layout -> Account, Exercise, Workout, Home, ... : 
> Main level directories, each being one page called by the router. Probably we end up placing all this folders under a new folder called "Pages"

* Modals:
> Probably we should consider Modals just components, but since they are somewhat more complex than simplier components like input or icon, and we have so many of them, we have decided to group them all here.

* Components:
> All reusable components that we use all over the site are located here along its css files. Some of them still have online declarations until we do more clean-up.

* Data:
> This is probably the file is going to change more often over time. Here we create and mantain Data structures.


### Design Notes ###

We are trying to keep the design as faithfull as possible to the original sketch files. But he have made some trade-offs. The most important one is the typography.

Original typography is Gotham, but Gotham hasn't have a free to use web version. Just in case there are no plans to license it, we have replaced it with 2 different fonts from google fonts that work really well:

* [Monserrat](https://fonts.google.com/specimen/Montserrat)  for anything bigger than 15 pixels or lower but in UpperCase
* [Open Sans](https://fonts.google.com/specimen/Open+Sans) for anything below 15 pixels and non UpperCase.

If Gotham is finally licensed, just tell us and we will incorporate it.
