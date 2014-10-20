# swarm-example – three simple examples of using SwarmJS.

**Swarm** is a reactive data sync middleware for web and mobile applications.

See: https://github.com/gritzko/swarm

## Getting Started

  * Install NodeJS v0.10 from [nodejs.org](http://nodejs.org/)
    (["learnyounode" nodeschool.io project](https://github.com/rvagg/learnyounode]) can be useful for newbies).

  * Download "swarm-example" repo:
    `git clone git@github.com:abalandin/swarm-example.git`

  * Install dependencies:
    `npm install`

  * Start demo app:
    `npm start`

  * Open [http://localhost:8000/demo3/index.html/](http://localhost:8000/demo3/index.html/) in browser.

## Samples

* [demo3/index.html](demo3/index.html) – main page with several iframes.
* [demo3/Demo3App.js](demo3/Demo3App.js) – parent host for Conference App iframes.

### Mice

View:

* [index.html](mice/index.html) – mice sample page (first iframe pair)
* [MiceAppView](mice/view/MiceAppView.js) – application view
* [MiceView](mice/view/MiceView.js) – all users pointer (set of MouseViews)
* [MouseView](mice/view/MouseView.js) – all users pointer (set of MouseViews)

Model:

* [Mouse](mice/model/Mouse.js) – single Mouse model.
* [Mice](mice/model/Mice.js) – Mice is a set of Mouse.

Controller:

* [MiceAppCtrl](mice/ctrl/MiceAppCtrl.js) – listen for mouse movements and modify users mouse instance.


### Editor

View:

* [index.html](editor/index.html) – editor sample page (second iframe pair)

Model:

* [Text](https://github.com/gritzko/swarm/blob/master/lib/Text.js)

Controller:

* [EditorApp](editor/EditorApp.js) – create Text instance, listen for user input and change data-object

### Conference App

View:

* [index.html](conf/index.html) – conference app sample page (third iframe pair)
* [AgendaView](conf/view/AgendaView.js) - shows table with agenda, catch user clicks

Model:

* [Agenda](conf/model/Agenda.js) – tracks and slots selected by user

Controller:

* [ConfApp](conf/ConfApp.js) – create Host, connect to parent window, render view

## License

The MIT License
