import angular from 'angular';
import { createStore, addInterceptor } from 'spawn-x';
import {
  isArray,
  isString,
  isFunc,
  isUndefined,
  error
} from './helpers';


export default angular
  .module('ngSpawnModule', [])
  .provider('ngSpawn', ngSpawn).name;

function ngSpawn() {
  let store;

  this.createStore = (...args) => {
    store = createStore(...args);
  };
  this.addInterceptor = (...args) => addInterceptor(...args);

  this.$get = () => {
    const connect = selection => component => {
      component['@@SPAWN'] = {
        selection,
        callbacks: []
      };
  
      Object.keys(selection).forEach(key => {
        let zone, selector;
  
        if (isString(selection[key])) {
          zone = selection[key];
          selector = selection[key];
        }

        if (isArray(selection[key])) {
          if (selection[key].length === 1 && isString(selection[key][0])) {
            zone = selection[key][0];
            selector = selection[key][0];
          }

          if (selection[key].length > 1 && isString(selection[key][0]) && isFunc(selection[key][1])) {
            zone = selection[key][0];
            selector = selection[key][1];
          }
        }

        if (isUndefined(zone) || isUndefined(selector)) {
          return error(`angularjs-spawn-x: incorrect arguments for selection`);
        }

        detect({zone, component, key, selector});
      });

      function detect({
        zone,
        component,
        key,
        selector
      }) {
        component['@@SPAWN']['callbacks'].push(updateWithState);
        return store.detect(
          zone,
          updateWithState,
          component,
          key,
          selector
        );
      }

      function updateWithState(component, key, selector) {
        component[key] = store.select(selector);
      }
    }

    const disconnect = component => {
      Object.keys(component['@@SPAWN']['selection']).forEach(key => {
        component['@@SPAWN']['callbacks'].forEach(cb => {
          store.reject(key, cb);
        });
      });
    }

    const select = (...args) => store.select(...args);
    const detect = (...args) => store.detect(...args);
    const reject = (...args) => store.reject(...args);
    const update = (...args) => store.update(...args);

    return {
      connect,
      disconnect,
      select,
      detect,
      reject,
      update
    }
  }
}
