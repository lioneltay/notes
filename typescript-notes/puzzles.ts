// ====================
// Examples and Puzzles (https://github.com/type-challenges/type-challenges)
// ====================

// If
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

// Concat
type Result = Concat<[1, 2], [3, 4]>; // expected to be [1, 2, 3, 4]

// Get a property
const getResult = get({ name: "bob", age: 47 }, "age"); // number

// Get first item of array
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>;
type head2 = First<arr2>;

// Awaited
type awaited = Awaited<Promise<Promise<number>>>; // number

// Promise.all
type allResolvedValues = PromiseAll<[Promise<1>, Promise<Promise<2>>, 3]>; // [1,2,3]

// Flatten an array
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

const items = [1, 2, [3, 4], [[[5]]]];

// Length of a tuple

type tuple2 = [1, 2];
type tuple3 = [1, 2, 3];

type tuple2Length = Length<tuple2>; // expected 2
type tuple3Length = Length<tuple3>; // expected 3

type array4 = string[];
type array4Length = Length<array4>; // number

// Chainable
declare const config: Chainable<{}>;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
type ChainableResult = {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
};

// STRINGS

// Capitalize a word
type capitalized = MyCapitalize<"hello">; // expected to be 'Hello'

// Trim a string
type trimed = Trim<"  Hello World  ">; // expected to be 'Hello World'

// Snake case to camel case keys
type camelCase1 = CamelCase<"hello_world_with_types">;
type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES">;

// GETTING WEIRD

// Prepend to array union
type PrependedArray = Prepend<"a", [1]>; // ['a', 1]
type PrependedArrayUnion = Prepend<"a", [1] | [2] | [3, 4]>; // ['a', 1] | ['a', 2] | ['a', 3, 4]

// is never
type AA = IsNever<never>; // true
type BB = IsNever<undefined>; // false
type CC = IsNever<null>; // false
type DD = IsNever<[]>; // false
type EE = IsNever<number>; // false
type FF = IsNever<string | number>; // false

// Permutation
type perm = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type x = string | number extends never ? "yes" : "no";
type g = Exclude<string, string>;
// Is a type a union type?

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false
