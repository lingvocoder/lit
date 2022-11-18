/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {Readable} from 'stream';
import {test} from 'uvu';
// eslint-disable-next-line import/extensions
import * as assert from 'uvu/assert';
import {RenderResultReadable} from '../../lib/render-result-readable.js';

test('RenderResultReadable collects strings', async () => {
  const s = await collectReadable(new RenderResultReadable(['a', 'b', 'c']));
  console.log('s', s);
  assert.equal(s, 'abc');
});

test('RenderResultReadable collects strings and iterables', async () => {
  const s = await collectReadable(
    new RenderResultReadable(['a', ['b', 'c'], 'd'])
  );
  assert.equal(s, 'abcd');
});

test('RenderResultReadable collects strings and Promises', async () => {
  const s = await collectReadable(
    new RenderResultReadable(['a', Promise.resolve('b'), 'c'])
  );
  assert.equal(s, 'abc');
});

test('RenderResultReadable collects strings and iterables of Promises', async () => {
  const s = await collectReadable(
    new RenderResultReadable(['a', [Promise.resolve('b')], 'c'])
  );
  assert.equal(s, 'abc');
});

test.run();

const collectReadable = async (r: Readable) => {
  let s = '';
  for await (const v of r) {
    s += v;
  }
  return s;
};
