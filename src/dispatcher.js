import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
  dispatch(payload) {
    super.dispatch(payload);
  }

  handleViewAction(action) {
    setTimeout(() => {
      try {
        this.dispatch({
          action: action,
        });
      } catch (e) {
        console.log('dispatcher threw an error', action);
        console.log(e.stack);
      }
    });
  }
}

export default new AppDispatcher();
