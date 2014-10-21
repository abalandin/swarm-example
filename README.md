# swarm-example – three simple examples of using SwarmJS.

**Swarm** is a reactive data sync middleware for web and mobile applications.

See: https://github.com/gritzko/swarm

## Getting Started

  * Install [node.js](http://nodejs.org/)
    (["learnyounode" nodeschool.io project](https://github.com/rvagg/learnyounode]) can be useful for newbies).

  * Clone "swarm-example" repo:
    `git clone git@github.com:swarmjs/swarm-example.git`

  * Install dependencies:
    `npm install`

  * Start the demo app:
    `npm start`

  * Open [http://localhost:8000/demo3/index.html](http://localhost:8000/demo3/index.html) in the browser.

## Examples

See all 3 examples on a [single page](demo3/index.html).

### (1) Mice

View:

* [index.html](mice/index.html) – mice example (syncs two iframes
  using WebSocket conn to the server; hover your mouse over iframes)
* [MiceAppView](mice/view/MiceAppView.js) – application view
* [MiceView](mice/view/MiceView.js) – React view for the scene
* [MouseView](mice/view/MouseView.js) – React view for a single
  mouse pointer

Model:

* [Mouse](mice/model/Mouse.js) – Mouse model (LWW object).
* [Mice](mice/model/Mice.js) – Mouse pointer collection (Set).

Controller:

* [MiceAppCtrl](mice/ctrl/MiceAppCtrl.js) – tracks user input, writes to the model.


### (2) Editor

View:

* [index.html](editor/index.html) – plain text editor

Model:

* [Text](https://github.com/gritzko/swarm/blob/master/lib/Text.js)

Controller:

* [EditorApp](editor/EditorApp.js) – track input & write to the model

### (3) Conference App


View:

* [index.html](conf/index.html) – conference app (select talks out of 2 tracks)
* [AgendaView](conf/view/AgendaView.js) - shows table with agenda, catch user clicks

Model:

* [Agenda](conf/model/Agenda.js) – the model is a custom CRDT type (given as an example; may easily do without).

Controller:

* [ConfApp](conf/ConfApp.js) – create Host, connect to parent window, render view

## License

The MIT License
