import fs from 'fs';

import isUrl from 'is-url';
import fetch from 'node-fetch';
import * as csv from 'csv-parse/sync';


/**
 * @param {string} urlPath
 * @returns {Promise<Buffer>}
 */
async function bufferFromURL(urlPath) {
	const response = await fetch(urlPath);
	const text = await response.text();
	return Buffer.from(text);
}

/**
 * @param {string} filePath
 * @returns {Promise<Buffer>}
 */
async function getBuffer(filePath) {

	if (isUrl(filePath)) {
		return await bufferFromURL(filePath);
	}

	if (fs.existsSync(filePath)) {
		return fs.readFileSync(filePath);
	}

	throw new Error(`${filePath} does not exists.`);
}

/**
 * @param {Object} options
 * @param {string} options.filePath CSV file path. It can be a URL or file on machine.
 * @param {(row: any) => void} [options.transform] A transformer function that will run for each row of the CSV.
 * @param {() => void} [options.beforeRead] Hook before the file is read.
 * @param {() => void} [options.afterRead] Hook after the file is read.
 * @param {boolean} [options.captureTime] Capture the time it takes for the file to get processed.
 *                                        If true, returns the time value in milliseconds.
 * @returns {Promise<number | void>}
 */
export default async function csvReader(options) {

	const timeStart = options.captureTime ? new Date() : null;

	if (options.beforeRead && typeof options.beforeRead === 'function') {
		options.beforeRead();
	}

	const buffer = await getBuffer(options.filePath);

	csv.parse(buffer, {
		from: 2,
		onRecord: options.transform,
	});


	if (options.afterRead && typeof options.afterRead === 'function') {
		options.afterRead();
	}

	if (timeStart) {
		const timeStop = new Date();

		// Returns duration in milliseconds.
		return timeStop.getTime() - timeStart.getTime();
	}
}
