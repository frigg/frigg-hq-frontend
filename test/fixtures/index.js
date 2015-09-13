/* eslint-env node, mocha */
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

Promise.promisifyAll(fs);

export function build() {
  return fs.readFileAsync(path.resolve(__dirname, 'build.json'))
    .then(content => {
      return JSON.parse(content.toString());
    })
}

export function buildSync() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'build.json')));
}
