// ====================
// Examples and Puzzles (https://github.com/type-challenges/type-challenges)
// ====================

// If
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

type If<Cond, A, B> = Cond extends true ? A : B;

// Concat
type Result = Concat<[1, 2], [3, 4]>; // expected to be [1, 2, 3, 4]

type Concat<A extends any[], B extends any[]> = [...A, ...B];

// Get a property
const getResult = get({ name: "bob", age: 47 }, "age"); // number

function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Get first item of array
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>;
type head2 = First<arr2>;

type First<T extends any[]> = T[0];

// Awaited
type awaited = Awaited<Promise<Promise<number>>>; // number

type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T;

// Promise.all
type allResolvedValues = PromiseAll<[Promise<1>, Promise<Promise<2>>, 3]>; // [1,2,3]

type PromiseAll<T> = T extends [infer A, ...infer B]
  ? [Awaited<A>, ...PromiseAll<B>]
  : T;

// Flatten an array
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

type Flatten<T> = T extends [infer A, ...infer B]
  ? A extends any[]
    ? Flatten<[...A, ...B]>
    : [A, ...Flatten<B>]
  : T;

const items = [1, 2, [3, 4], [[[5]]]];

// Length of a tuple

type tuple2 = [1, 2];
type tuple3 = [1, 2, 3];

type tuple2Length = Length<tuple2>; // expected 2
type tuple3Length = Length<tuple3>; // expected 3

type array4 = string[];
type array4Length = Length<array4>; // number

type Length<T extends any[]> = T["length"];

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

type Chainable<T> = {
  option: <K extends string, V>(
    key: K,
    value: V
  ) => Chainable<T & { [key in K]: V }>;
  get(): T;
};

// STRINGS

// Capitalize a word
type capitalized = MyCapitalize<"hello">; // expected to be 'Hello'

type MyCapitalize<T extends string> = T extends `${infer A}${infer B}`
  ? `${Uppercase<A>}${B}`
  : never;

// Trim a string
type trimed = Trim<"  Hello World  ">; // expected to be 'Hello World'

type Trim<T> = T extends ` ${infer R}`
  ? Trim<R>
  : T extends `${infer R} `
  ? Trim<R>
  : T;

// Snake case to camel case keys
type camelCase1 = CamelCase<"hello_world_with_types">;
type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES">;

type CamelCase<S extends string> = S extends `${infer L}_${infer R}${infer I}`
  ? `${Lowercase<L>}${Uppercase<R>}${CamelCase<I>}`
  : Lowercase<S>;

// GETTING WEIRD

// Prepend to array union
type PrependedArray = Prepend<"a", [1]>; // ['a', 1]
type PrependedArrayUnion = Prepend<"a", [1] | [2] | [3, 4]>; // ['a', 1] | ['a', 2] | ['a', 3, 4]

type Prepend<U, T extends any[]> = [U, ...T];

// is never
type AA = IsNever<never>; // true
type BB = IsNever<undefined>; // false
type CC = IsNever<null>; // false
type DD = IsNever<[]>; // false
type EE = IsNever<number>; // false
type FF = IsNever<string | number>; // false

type IsNever<T> = [T] extends [never] ? true : false;

// Permutation
type perm = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends any
  ? Prepend<T, Permutation<Exclude<U, T>>>
  : never;

type x = string | number extends never ? "yes" : "no";
type g = Exclude<string, string>;
// Is a type a union type?

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false

type IsUnion<Part, Whole = Part> = Part extends Whole
  ? [Whole] extends [Part]
    ? false
    : true
  : never;
