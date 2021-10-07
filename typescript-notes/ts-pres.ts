// =================================================
// Control Flow Analysis
// =================================================

/**
 * Typescript is able to understand the flow of your program to narrow down types
 */
function simpleCFA(input: string | number | boolean) {
  // string | number | boolean
  input;

  if (typeof input === "string") {
    // string
    input;
  } else {
    // Not a string so must be (number | boolean)
    input;
  }

  input;
}

// =================================================
// Control Flow Analysis of Aliased Conditions
// =================================================
// Available in Typescript 4.4 https://devblogs.microsoft.com/typescript/announcing-typescript-4-4-beta/

function aliasedCFA(input: string | number | boolean) {
  // string | number | boolean
  input;

  const isString = typeof input === "string";

  if (isString) {
    // string
    input;
  } else {
    // Not a string so must be (number | boolean)
    input;
  }

  input;
}

// =================================================
// Predicate Functions / Typeguard Functions
// =================================================
function isStringPlain(input: any): boolean {
  return typeof input === "string";
}

function isStringTypeGuard(input: any): input is string {
  return typeof input === "string";
}

function predicateCGA(input: string | number | boolean) {
  // string | number | boolean
  input;

  if (isStringPlain(input)) {
    // (string | number | boolean) No type information is conveyed by isStringPlain()
    input;
  } else {
    // (string | number | boolean) No type information is conveyed by isStringPlain()
    input;
  }

  if (isStringTypeGuard(input)) {
    // string
    input;
  } else {
    // Not a string so must be (number | boolean)
    input;
  }
}

// Array.filter supports predicate functions
function arrayFilterPredicate(input: (string | number)[]) {
  // Still (string | number)[] as the filter function is not a Predicate function
  const stringsOnlyPlain = input.filter((val) => typeof val === "string");

  // string[] as we have used a predicate function
  const stringsOnlyPredicate = input.filter(isStringTypeGuard);

  // Still (string | number)[] as the filter function itself is not a Predicate function even though it uses one.
  const stringsOnlyFail = input.filter((val) => isStringTypeGuard(val));

  // string[] - You can also inline predicate functions
  const stringsOnlyInline = input.filter(
    (val): val is string => typeof val === "string"
  );
}

type Array3<T> = {
  filter<S extends T>(predicate: (value: T) => value is S): S[];
  filter(predicate: (value: T) => unknown): T[];
};

// =================================================
// Control Flow Analysis with more complex types
// =================================================
type Cat = {
  name: string;
  lives: number;
  meow: () => void;
};

type Dog = {
  name: string;
  chewsCarpet: boolean;
  bark: () => void;
};

function cfac(animal: Cat | Dog) {
  animal.name;
  animal.lives;
  animal.meow;
  animal.chewsCarpet;
  animal.bark;

  // Regular JS
  if (animal.meow) {
    // it's a cat
    animal;
  } else {
    // it's a dog
    animal;
  }

  if ((animal as Cat).meow) {
    animal;
  } else {
    animal;
  }

  if (isCat(animal)) {
    animal;
  } else {
    animal;
  }
}

function isCat(animal: Cat | Dog): animal is Cat {
  return typeof (animal as Cat).meow === "function";
}

// =================================================
// Discriminated Union Types
// =================================================
type StringNumberUnion = string | number;

// Discriminated Union Type: A union of objects which share a common key with a unique literal value
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

function discriminatedUnions(input: Shape) {
  // Shape
  input;
  input.radius;
  input.sideLength;

  if (input.kind === "circle") {
    // Circle
    input.radius;
    input.sideLength;
  } else {
    // Square
    input.radius;
    input.sideLength;
  }
}

// Discriminated unions can be use as a type predicate although it may not be very useful
function isSquare(shape: Shape): shape is Square {
  return shape.kind === "square";
}

function filterDU(arr: Shape[]) {
  // Square[]
  const squares = arr.filter(isSquare);
  // Square[]
  const squaresInline = arr.filter(
    (shape): shape is Square => shape.kind === "square"
  );
}

// This is a very common pattern used in redux
type CreateTodo = {
  type: "CREATE_TODO";
  payload: { task: string };
};

type RemoveTodo = {
  type: "REMOVE_TODO";
  payload: { taskId: string };
};

type Action = CreateTodo | RemoveTodo;

const reducer = (state, action: Action) => {
  switch (action.type) {
    case "CREATE_TODO": {
      const { task } = action.payload;
      return state;
    }
    case "REMOVE_TODO": {
      const { taskId } = action.payload;
      return state;
    }
  }
};

// =================================================
// "never" type
// =================================================
/**
 * The never type is a "bottom" type that represents something "impossible" or that "never" happens
 */

// This function never returns
function justFail(): never {
  throw Error();
}

const impossible = justFail();

function neverSwitch(shape: Shape) {
  switch (shape.kind) {
    case "circle": {
      return shape;
    }
    case "square": {
      return shape;
    }
    default: {
      return shape;
    }
  }
}

function assertNever(input: never) {}

function assertNeverSwitch(shape: Shape) {
  switch (shape.kind) {
    case "circle": {
      return shape;
    }
    // case "square": {
    //   return shape;
    // }
    default: {
      return assertNever(shape);
    }
  }
}

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

// =================================================
// Generic Types (Type "Parameters")
// =================================================
type List<T> = T[];
type Pair<T> = [T, T];
type Repository<T> = {
  get: (id: string) => T;
  set: (resource: T) => void;
  update: (data: Partial<T>) => void;
};

// =================================================
// Generic Type Inference
// =================================================
const identityFunc = (x) => x;

type IdentityFn2 = <Something>(something: Something) => Something;
type IdentityFn = <T>(val: T) => T;

const identityFnConst: IdentityFn = (x) => x;

const identityFnConstInline = <T>(x: T): T => x;

function identityFunction<T>(val: T): T {
  return val;
}

type Array2<T> = {
  map<U>(callbackfn: (value: T) => U): U[];
};

const numArr = [1, 2, 3, 4] as const;
const stringArr = numArr.map((num) => `${num}`);

// =================================================
// Mapped Types
// =================================================
type Person = {
  name: string;
  age: number;
};

// keyof operator allows you to get the keys of an object
type PersonKey = keyof Person;
const x: PersonKey = "age";

type Arrayify<T> = {
  [K in keyof T]: T[K][];
};

type ArrayifiedPerson = Arrayify<Person>;

// =================================================
// Conditional Types
// =================================================
