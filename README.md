# angularjs-spawn-x
### AngularJS connector for [spawn-x](https://github.com/atellmer/spawn-x).


## install
With npm:
```
npm install spawn-x angularjs-spawn-x --save
```
With yarn:
```
yarn add spawn-x angularjs-spawn-x
```
With bower:
```
bower install spawn-x angularjs-spawn-x --save
```
```html
<script src="path/to/spawn-x/lib/spawn-x.umd.min.js"></script>
<script src="path/to/angularjs-spawn-x/lib/angularjs-spawn-x.umd.min.js"></script>
```


## Usage

#### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App</title>
</head>
<body>
  <app-root></app-root>

  <script src="/dist/app.bundle.js"></script>
</body>
</html>
```

### Add the ngSpawnModule in dependencies
#### app/index.js
```javascript
import '../index.html';
import angular from 'angular';
import ngSpawnModule from 'angularjs-spawn-x';

import configureStore from './store';

import AppComponent from './containers/app.component';
import PresenterComponent from './components/presenter.component';
import userActionsModule from './actions/user';


angular.module('appModule', [
    ngSpawnModule,
    AppComponent,
    PresenterComponent,
    userActionsModule
  ])
  .config(configureStore)
  .name;

angular.element(() => {
  angular.bootstrap(document, ['appModule']);
});
```
### Configure store with ngSpawnProvider wich has standarts functions createStore and addInterceptor
#### app/store/index.js
```javascript
configureStore.$inject = ['ngSpawnProvider'];

export default function configureStore(ngSpawnProvider) {
  const initialState = {
    users: [],
    some: {
      text: 'Hello World'
    },
    parent: {
      child: 'I am child'
    }
  };

  ngSpawnProvider.createStore(
    initialState,
    ngSpawnProvider.addInterceptor(logger)
  );

  function logger(store) {
    return next => action => {
      next(action);
      console.log('action: ', action.type + ' -> ', action.data);
    }
  }
}
```

### Inject ngSpawn into your app, and use select, detect, reject and update methods
#### app/actions/user.js
```javascript
import angular from 'angular';


export default angular
  .module('userActionsModule', [])
  .factory('userActions', factory)
  .name;

factory.$inject = ['ngSpawn'];

function factory(ngSpawn) {
  const addUser = user => {
    ngSpawn.update('users', {
      data: ngSpawn.select('users').concat(user),
      type: 'ADD_NEW_USER'
    });
  };

  return {
    addUser
  }
}
```
### For subscribe or unsubscribe on data use connect and disconnect methods like below
#### app/containers/app.component.js
```javascript
import angular from 'angular';


export default angular
  .module('AppComponent', [])
  .component('appRoot', {
    controller: ['ngSpawn', 'userActions', AppComponent],
    template: `
      <app-presenter
        users="$ctrl.users"
        text="$ctrl.text"
        data="$ctrl.data"
        add-user="$ctrl.addUser">
      </app-presenter>
    `,
  })
  .name;

function AppComponent(ngSpawn, userActions) {

  //selection from store
  const selection = {
    users: 'users',
    text: 'some.text',
    data: ['parent.child', state => state.parent.child]
  };

  this.$onInit = () => {
    //connect to store
    ngSpawn.connect(selection)(this);
  }

  this.$onDestroy = () => {
    //disconnect from store
    ngSpawn.disconnect(this);
  }

  this.addUser = user => {
    userActions.addUser(user);
  }
}
```

#### app/components/presenter.component.js
```javascript
import angular from 'angular';


export default angular
  .module('PresenterComponent', [])
  .component('appPresenter', {
    bindings: {
      users: '<',
      text: '<',
      data: '<',
      addUser: '&',
    },
    controller: [PresenterComponent],
    template: `
      <div>
        <h1>User List</h1>
        <ul>
          <li ng-repeat="user in $ctrl.users">{{ ::user.name }} | {{ ::user.age }}</li>
        </ul>
        <form ng-submit="$ctrl.handleSubmit($event)">
          <input type="text" name="name"/>
          <input type="number" name="age"/>
          <button type="submit">Add New User</button>
        </form>
      </div>
    `,
  })
  .name;

function PresenterComponent() {
  this.handleSubmit = ev => {

    console.log('some text from state: ', this.text);
    console.log('some data from state: ', this.data);

    this.addUser()({
      name: ev.target.name.value,
      age: ev.target.age.value
    });

    ev.target.name.value = '';
    ev.target.age.value = '';
  }
}
```

## LICENSE

MIT © [Alex Plex](https://github.com/atellmer)