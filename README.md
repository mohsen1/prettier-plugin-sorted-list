# Prettier Plugin Sorted List

This is a plugin for Prettier that sorts **lists of string literals** in your JavaScript or TypeScript code. This tool is designed to make your code cleaner and more readable.

## Installation

Firstly, you'll need to install Prettier:

```
npm install --save-dev prettier
```

Then, install `prettier-plugin-sorted-list`:

```
npm install --save-dev prettier-plugin-sorted-list
```

### Add a Prettier Configuration File

Create a file named `.prettierrc` in the root of your project and add the following:

```json
{
  "plugins": ["prettier-plugin-sorted-list"]
}
```

## Usage

In your source code, use a comment directive to indicate the list that needs to be sorted:

```js
let arr = [
  // prettier-sorted-list
  "b",
  "a",
];
```

Then, when Prettier is run, it will sort the list:

```js
let arr = [
  // prettier-sorted-list
  "a",
  "b",
];
```

## Comment Directives

You can use two types of comment directives, line comments and block comments. You can also add comments after the directive to provide a description of the list.

```
// prettier-sorted-list

// prettier-sorted-list List of items to be sorted

/* prettier-sorted-list */
```

## Limitations and Future Work

This plugin currently only supports sorting of lists of string literals. Lists containing other types of elements are not supported at this time.

### To-do list

- [ ] Support for sorting lists of numbers
- [ ] Support for sorting object keys
- [ ] Support for sorting keys of Map and Set objects

## Development and Testing

### Implementation Details

To keep this plugin fast, it does not construct an abstract syntax tree (AST) of the entire file. Instead, it uses a regular expression to find the comment directive and then sorts the list using a simple string manipulation algorithm. For future work, it may be necessary to use an AST to support more complex sorting operations.

### Testing

A test suite is included with this plugin to ensure proper functioning. To run the tests, execute the following command:

```
npm run test
```

## License

This project is licensed under the MIT license.

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue.

## Authors

- [Mohsen Azimi](https://github.com/mohsen1)
