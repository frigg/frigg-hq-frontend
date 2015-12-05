import connectToStores from '../helpers/connect-to-stores';
import BuildStore from '../stores/build-store';
import UserStore from '../stores/user-store';
import BuildDetails from '../components/builds/build-details';

export default connectToStores(BuildDetails, [BuildStore], function(props) {
  const {owner, name, buildNumber} = props.params;
  return {
    build: BuildStore.getBuild(owner, name, buildNumber),
    user: UserStore.getCurrentUser(),
    loading: BuildStore.isLoading(),
  };
});
