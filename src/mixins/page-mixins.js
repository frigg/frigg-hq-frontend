import _ from 'lodash';

export const StoreMixin = {
  componentWillMount: function() {
    _.each(this.stores, store => {
      store.addChangeListener(this.onChange);
    })
  },

  componentWillUnmount: function() {
    _.each(this.stores, store => {
      store.removeChangeListener(this.onChange);
    })
  },
}
