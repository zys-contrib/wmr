import { setupTest, runWmr, openWmr } from './test-helpers.js';
import { closePage } from 'pentf/browser_utils';
import expect from 'expect';

// This marks the test as a failure, but will ignore it
export const expectedToFail = 'Not supported right now';
export const description = 'should transform TypeScript files';

/**
 * @param {import('pentf/runner').TaskConfig} config
 */
export async function run(config) {
	const env = await setupTest(config, 'ts-simple');

	const instance = await runWmr(config, env.tmp.path);
	const page = await openWmr(config, instance);

	await page.waitForSelector('#result', { timeout: 2000 });

	const text = await page.$eval('#result', el => el.textContent);
	expect(text).toEqual('Result: foo');

	await closePage(page);
}