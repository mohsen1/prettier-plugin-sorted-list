const prettier = require("prettier");
const dedent = require("dedent");
const { test, describe } = require("node:test");
const assert = require("node:assert");

const sortedListPlugin = require("../index");

describe("// prettier-sorted-list inside of the array", () => {
  test("Leaves empty lists empty", async () => {
    const unsortedCode = dedent`
        let arr = [
          // prettier-sorted-list
        ];`;

    const sortedCode = await prettier.format(unsortedCode, {
      parser: "babel",
      plugins: [sortedListPlugin],
    });

    assert.strictEqual(sortedCode.trim(), unsortedCode.trim());
  });

  test("sorts list correctly", async () => {
    const unsortedCode = dedent`
    let arr = [
      // prettier-sorted-list
      "b",
      "a",
    ];`;

    const expectedSortedCode = dedent`
    let arr = [
      // prettier-sorted-list
      "a",
      "b",
    ];`;

    const sortedCode = await prettier.format(unsortedCode, {
      parser: "babel",
      plugins: [sortedListPlugin],
    });

    assert.strictEqual(sortedCode.trim(), expectedSortedCode.trim());
  });
});

describe("// prettier-sorted-list on top of array", () => {
  test("Leaves empty lists empty", async () => {
    const unsortedCode = dedent`
          // prettier-sorted-list
          let arr = [];`;

    const sortedCode = await prettier.format(unsortedCode, {
      parser: "babel",
      plugins: [sortedListPlugin],
    });

    assert.strictEqual(sortedCode.trim(), unsortedCode.trim());
  });

  test("sorts list correctly", async () => {
    const unsortedCode = dedent`
    // prettier-sorted-list
    let arr = [
      "bbbbbbbbbb",
      "aaaaaaaaaa",
      "cccccccccc",
      "dddddddddd",
      "eeeeeeeeee",
      "ffffffffff",
    ];`;

    const expectedSortedCode = dedent`
    // prettier-sorted-list
    let arr = [
      "aaaaaaaaaa",
      "bbbbbbbbbb",
      "cccccccccc",
      "dddddddddd",
      "eeeeeeeeee",
      "ffffffffff",
    ];`;

    const sortedCode = await prettier.format(unsortedCode, {
      parser: "babel",
      plugins: [sortedListPlugin],
    });

    assert.strictEqual(sortedCode.trim(), expectedSortedCode.trim());
  });
});

describe("Comments", () => {
  test("Leaves comments before and after the directive", async () => {
    const unsortedCode = dedent`
    // comment before
    // prettier-sorted-list
    // comment after
    let arr = ["test"];`;

    const sortedCode = await prettier.format(unsortedCode, {
      parser: "babel",
      plugins: [sortedListPlugin],
    });

    assert.strictEqual(sortedCode.trim(), unsortedCode.trim());
  });

  test("Leaves comments inside the list", async () => {
    const unsortedCode = dedent`
    // prettier-sorted-list
    let arr = [
      // comment before
      "b",
      "a",
      "test", // comment on line
      // comment after
    ];`;
    const expectedSortedCode = dedent`
    // prettier-sorted-list
    let arr = [
      // comment before
      "a",
      "b",
      "test", // comment on line
      // comment after
    ];`;

    const sortedCode = await prettier.format(unsortedCode, {
      parser: "babel",
      plugins: [sortedListPlugin],
    });

    assert.strictEqual(sortedCode.trim(), expectedSortedCode.trim());
  });
});
