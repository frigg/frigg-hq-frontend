import connectToStores from '../helpers/connect-to-stores';
import BuildStore from '../stores/build-store';
import BuildList from '../components/builds/build-list';


export default connectToStores(BuildList, [BuildStore], function() {
  return {
    builds: BuildStore.getAll(),
    loading: BuildStore.isLoading(),
  };
});
