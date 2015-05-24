import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
  handleViewAction(action) {
    try {
      this.dispatch({
        action: action
      });
    } catch (e) {
      console.log('dispatcher threw an error');
      console.error(e);
      console.error(e.stack);
    }
  }
}

export default new AppDispatcher();
