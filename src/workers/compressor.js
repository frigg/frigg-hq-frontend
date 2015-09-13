import {compress, decompress} from 'lz-string';

export default function(self) {
  self.addEventListener('event', event => {
    let output;
    if (event.data.type === 'compress') {
      output = compress(JSON.stringify(event.data.data));
      self.postMessage({type: 'compressed', data: output});
    } else if (event.data.type === 'decompress') {
      output = JSON.parse(decompress(event.data.data));
      self.postMessage({type: 'compressed', data: output});
    }
  });
}
