import {isInTest} from './utils';

export const _strings = {
  LOADING: 'Loading',
  FOUR_O_FOUR: 'We could not find what you were looking for.',
  BUILD_ERRORED: 'The build encountered an error.',
  OFFLINE_NO_DATA: 'You are offline and we do not have any local data, please go online to fetch data.',
};

export default function loadString(key) {
  if (isInTest && !_strings.hasOwnProperty(key)) {
    throw new Error('Could not find string for key: ' + key);
  }
  return _strings[key] || '';
}
