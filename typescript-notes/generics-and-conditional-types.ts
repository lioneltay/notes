// ====================
// Generics
// ====================

// Static Types
type Person = {
  name: string;
  age: number;
};

// Generic types
type List<T> = T[];
type StringList = List<string>;

type Tuple<A, B> = [A, B];
type Vector2D = Tuple<number, number>;

type Repository<T> = {
  getById(id: string): T;
  update(id: string, data: Partial<T>): T;
  delete(id: string): void;
};
type PersonRepository = Repository<Person>;

// Generic Functions
function identity(input: any): any {
  return input;
}

const identityResult = identity(5);

function genericIdentity<T>(input: T): T {
  return input;
}

const genericIdentityResult = genericIdentity(5);

// Fixing the function generic type
const stringResult = genericIdentity<string>("hello");

// Arrow function syntax
const genericArrowFn = <T>(input: T): T => input;

// Generic Constraints
function genericConstraint<T extends { length: number }>(input: T) {
  input.length;
}

// ====================
// Conditional Types
// ====================

/**
 * Conditional types allow us to make decisions based on types taking the form
 * SomeType extends OtherType ? TrueType : FalseType;
 */

// Conditional types are only really useful with generics
type Useless = "hello" extends string ? "yes!" : "no!";
type Useless2 = 5 extends string ? "yes!" : "no!";

type isString<T> = T extends string ? "yes!" : "no...";
type isStringTrue = isString<"i am a string">;
type isStringFalse = isString<5>;

// Inference with conditional types
type ExtractArrayType2<T> = T extends string[] ? string : never;

type ExtractArrayType<T> = T extends (infer R)[] ? R : never;

type StringItem = ExtractArrayType<string[]>;
type NumberItem = ExtractArrayType<number[]>;
type NotAnArray = ExtractArrayType<boolean>;

// Get the return type of a function
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type GetArguments<T> = T extends (...args: infer R) => any ? R : never;

type SomeFunction = (input: string, second: number) => number;
type SomeFunctionReturnType = GetReturnType<SomeFunction>;
type SomeFunctionArguments = GetArguments<SomeFunction>;

// Conditional types are distributive on unions
type SomeUnion = string | number;

type Arrayify<T> = T extends any ? T[] : never;
type ArrayifiedUnion = Arrayify<SomeUnion>;
type ArrayifiedUnion2 = Arrayify<string> | Arrayify<number>;

type Arrayify2<T> = T[];
type ArrayifiedUnion3 = Arrayify2<SomeUnion>;

// Exclude types from a union T which are assignable to a type U
type UnionOfStuff = "hello" | 5 | "there" | false;
type NotStrings = MyExclude<UnionOfStuff, string>;

type MyExclude<T, U> = T extends U ? never : T; // never | 5 | never | false