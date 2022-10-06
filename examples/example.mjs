import path from 'path';
import url from 'url';

import csvReader from "../src/csv-reader.mjs";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let duration;
const testFile = path.join(__dirname, 'input.csv');
const testURL = 'https://pastebin.com/raw/QJ4ggAEW';

/**
 * Transform function
 * @param {number} number
 */
function square(number) {
	console.log(Math.pow(number, 2));
}
/**
 * Hook before the file is read.
 */
function beforeReadHook() {
	console.log('Hook: Before Read');
}
/**
 * Hook after the file is read.
 */
function afterReadHook() {
	console.log('Hook: After Read');
}


console.log('----------------------------------------');
console.log('Example from file (minimun params)');
console.log(`Input: ${testFile}`);
await csvReader({
	filePath: testFile,
	transform: square
});


console.log('----------------------------------------');
console.log('Example from file (full params)');
console.log(`Input: ${testFile}`);
duration = await csvReader({
	filePath: testFile,
	transform: square,
	beforeRead: beforeReadHook,
	afterRead: afterReadHook,
	captureTime: true,
});
console.log(`Duration: ${duration} ms`);


console.log('----------------------------------------');
console.log('Example from URL (minimun params)');
console.log(`Input: ${testURL}`);
await csvReader({
	filePath: testURL,
	transform: square
});

console.log('----------------------------------------');
console.log('Example from URL');
console.log(`Input: ${testURL}`);
duration = await csvReader({
	filePath: testURL,
	transform: square,
	beforeRead: beforeReadHook,
	afterRead: afterReadHook,
	captureTime: true,
});
console.log(`Duration: ${duration} ms`);
