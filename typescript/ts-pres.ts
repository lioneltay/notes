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

  // By the time
  input;
}

// =================================================
// Predicte Functions / Typeguard Functions
// =================================================
function isStringTypeGuard(input: any): input is string {
  return typeof input === "string";
}

function isStringPlain(input: any): boolean {
  return typeof input === "string";
}

function predicateCGA(input: string | number | boolean) {
  // string | number | boolean
  input;

  if (isStringTypeGuard(input)) {
    // string
    input;
  } else {
    // Not a string so must be (number | boolean)
    input;
  }

  if (isStringPlain(input)) {
    // (string | number | boolean) No type information is conveyed by isStringPlain()
    input;
  } else {
    // (string | number | boolean) No type information is conveyed by isStringPlain()
    input;
  }

  // By the time
  input;
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

interface Array<T> {
  filter<S extends T>(predicate: (value: T) => value is S): S[];
  filter(predicate: (value: T) => unknown): T[];
}

// =================================================
// Discriminated Union Types
// =================================================
type StringNumberUnion = string | number;

// Discriminated Union Type: A union of objects which share a common key with a literal value
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

  if (input.kind === "circle") {
    // Circle
    input;
  } else {
    // Square
    input;
  }

  // Shape
  input;
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

function assertNever(input: never) {
  return undefined;
}

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

