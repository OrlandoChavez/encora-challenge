# How to run the project?

Make sure you have [Node.js](https://nodejs.org/) version 18.9.0 or higher installed:
```shell
$ node -v
# v18.9.0
```


Install npm dependecies:
```shell
$ npm i
```

Run the Example:
```shell
$ npm run example
```

## Usage:
```js
import csvReader from "./src/csv-reader.mjs";

const options = {
	filePath: 'path/to/csv/file',
	transform: (row) => console.log(row)
};

await csvReader(options);
```

## Options:
| Property | Type | Description |
| --- | --- | --- |
| **filePath** | string | CSV file path. It can be a URL or file on machine. |
| **transform** *(optional)* | (row: any) => void | A transformer function that will run for each row of the CSV. |
| **beforeRead** *(optional)* | () => void | Hook before the file is read. |
| **afterRead** *(optional)* | () => void | Hook after the file is read. |
| **captureTime** *(optional)* | boolean | Capture the time it takes for the file to get processed. If true, returns the time value in milliseconds. |


# Pros and Cons:
| Pros | Cons |
| --- | --- |
| Use the last ES standards. | Requires Node.js version 16 or higher. |
| Supports async out of the box. | Returns a Promise. |
| Use community tested libraries. | Has dependencies. |


# Libraries:
The mayor reason to use these libraries is the time it would be needed to create my own. The time limit to create this program is 1.5 hours.

| Library | Reasoning |
| --- | --- |
| [csv-parse](https://www.npmjs.com/package/csv-parse) | It implements the Node.js stream.Transform API. It also provides a simple callback-based API for convenience. |
| [is-url](https://www.npmjs.com/package/is-url) | Easy to check whether a string is a URL. |
| [node-fetch](https://www.npmjs.com/package/node-fetch) | The built-in Fetch API of Node.js [is still experimental](https://nodejs.org/en/blog/announcements/v18-release-announce/#fetch-experimental). |
