import {Dispatcher} from 'flux';

export class AppDispatcher extends Dispatcher {
  dispatch(payload) {
    setTimeout(() => {
      try {
        super.dispatch(payload);
      } catch (error) {
        /* eslint-disable no-console */
        console.log('Dispatcher threw an error', payload);
        console.log(error.stack);
        /* eslint-enable no-console */
      }
    });
  }
}

export default new AppDispatcher();
