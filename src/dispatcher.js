import {Dispatcher} from 'flux';

export class AppDispatcher extends Dispatcher {
  dispatch(payload) {
    setTimeout(() => {
      try {
        super.dispatch(payload);
      } catch (e) {
        console.log('Dispatcher threw an error', payload);
        console.log(e.stack);
      }
    });
  }
}

export default new AppDispatcher();
