/**
 * React is written in Javascript so the Typescript types you get are from @types/react
 * which part of an open source project called DefinitelyTyped that creates
 * Typescript definitions for libraries that are not written in Typescript
 *
 * DefinitelyTyped: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

import React, {
  ReactElement,
  ReactFragment,
  ReactPortal,
  ValidationMap,
  WeakValidationMap,
} from "react";
import ReactDOM from "react-dom";

// ######################################################################
// React.ReactElement: The result of rendering JSX
// ######################################################################

const FunctionComponent = () => null;

class ClassComponent extends React.Component {
  render() {
    return null;
  }
}

const aa: React.ReactElement = <FunctionComponent />;
const bb: React.ReactElement = <ClassComponent />;
const cc: React.ReactElement = <h1></h1>;
const dd: React.ReactElement = <></>;

const ee: React.ReactElement = React.createElement(FunctionComponent);
const ff: React.ReactElement = React.createElement(ClassComponent);
const gg: React.ReactElement = React.createElement("h1");
const hh: React.ReactElement = React.createElement(React.Fragment);

import { jsx as _jsx } from "react/jsx-runtime";
const ii: React.ReactElement = _jsx(FunctionComponent);
const jj: React.ReactElement = _jsx(ClassComponent);
const kk: React.ReactElement = _jsx("h1");
const ll: React.ReactElement = _jsx(React.Fragment);

// The return type of a React component (JSX or null)
type ReturnTypeForComponents = React.ReactElement | null;

// ######################################################################
// React.ReactNode: Anything that can be rendered within JSX, including ReactElement.
// ######################################################################

// Definition of React node in @types/react
type ReactNode =
  | ReactElement
  | string
  | number
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

// Anything that can be rendered in JSX
<>
  {"string"}
  {5}
  <></>
  {ReactDOM.createPortal(<h1>jsx</h1>, document.body)}
  {true}
  {null}
  {undefined}

  {/* Including ReactElements */}
  <FunctionComponent />
  <ClassComponent />
  <h1></h1>
  <></>
</>;

// ######################################################################
// React.ElementType - Things that are a valid JSX tag (Function Component / Class Component / Native Element).
// ######################################################################
const FunctionComp = () => null;

class ClassComp extends React.Component {
  render() {
    return null;
  }
}

const xx: React.ElementType = "h1";
<h1 />;
const yy: React.ElementType = FunctionComp;
<FunctionComp />;
const zz: React.ElementType = ClassComp;
<ClassComp />;

type ElementExampleProps = {
  as: React.ElementType;
};

function ElementExample({ as: As, ...rest }: ElementExampleProps) {
  return <As {...rest} />;
}

<ElementExample as="h1" />;
<ElementExample as={ClassComp} />;
<ElementExample as={FunctionComp} />;

// ######################################################################
// JSX.IntrinsicElements
// ######################################################################
type CustomH1 = JSX.IntrinsicElements["h1"];

const CustomH1 = (props: CustomH1) => {
  return <h1 {...props} style={{ color: "orange", ...props.style }} />;
};

<h1 />;
<CustomH1 />;

// ######################################################################
// React.ComponentProps Utility type to extract the props of a component
// ######################################################################
type SomethingProps = {
  variant: "outlined" | "contained";
  size: "sm" | "md" | "lg";
};

const Something = (props: SomethingProps) => <h1>Something</h1>;

// New file
type WrappedSomethingProps = React.ComponentProps<typeof Something>;

const WrappedSomething = (props: WrappedSomethingProps) => (
  <Something {...props} />
);

<Something variant="outlined" size="sm" />;
<WrappedSomething variant="outlined" size="sm" />;

// ######################################################################
// React.VFC / React.FC
// ######################################################################

// React FC is the type of a FunctionalComponent with the children prop already set
// This is being deprecated in React 18 because it is not explicit and is easy to make
// components accept a children prop unintentionally

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = (props) => null;

<Modal open onClose={() => {}}>
  <h1>child</h1>
</Modal>;

// React VFC is the type of a Functional Component without children set
// This will be renamed to FC in React 18 and VFC will be removed

type Modal2Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal2: React.VFC<Modal2Props> = (props) => null;

<Modal2 open onClose={() => {}}>
  <h1>child</h1>
</Modal2>;

// No utilities

type Modal3Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal3 = (props: Modal3Props) => null;

<Modal3 open onClose={() => {}}>
  <h1>child</h1>
</Modal3>;

/**
 * Generally you should just be using the "no utilities" approach. It is
 * - Less verbose
 * - Does everything VFC can do (see below)
 * - Can do things VFC can't do such as handle generic props
 */

// This is the definition of VFC
interface VoidFunctionComponent<P = {}> {
  // This is exactly the "no utilities" approach, but it does setup the return type
  (props: P, context?: any): ReactElement<any, any> | null;
  // This is redundant if you are using typescript
  propTypes?: WeakValidationMap<P> | undefined;
  // This is for the old context API which has been deprecated in favor of (useContext hook)
  contextTypes?: ValidationMap<any> | undefined;
  // You can use default arguments instead, or if you want to, you can use this without VFC anyway
  defaultProps?: Partial<P> | undefined;
  // This is inferred from the function name and does not need to be explicitly set in most cases. But you are still free to set it without VFC
  displayName?: string | undefined;
}

type MyCompProps = {
  someProp: string;
};

const MyComp = ({ someProp = "default argument" }: MyCompProps) => {
  return <h1>{someProp}</h1>;
};

MyComp.displayName = "NewName";

// defaultProps is supported if you don't want to use default arguments
MyComp.defaultProps = {
  someProp: "there",
} as MyCompProps;

// Typescript is able to infer that these properties exist from their definition
MyComp.defaultProps;
MyComp.displayName;

// One advantage VFC has is that it explicitly sets the return type.
// This is a slight benefit, but in practice this is not a very meaningful as any the
// return type is validated when you use the component regardless.
const InvalidReturnType = () => "THIS IS INVALID";

<h1>
  <InvalidReturnType />
</h1>;

// ######################################################################
// Generic React Component Props
// ######################################################################

type DropdownProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const Dropdown = <T extends unknown>({
  items,
  renderItem,
}: DropdownProps<T>) => {
  return <div>{items.map((item) => renderItem(item))}</div>;
};

<Dropdown
  items={[
    { firstName: "Elon", lastName: "Musk" },
    { firstName: "Jeff", lastName: "Bezos" },
  ]}
  renderItem={({ firstName, lastName }) =>
    `${firstName.toLowerCase()} ${lastName.toUpperCase()}`
  }
/>;

<Dropdown items={[1, 2, 3, 4, 5]} renderItem={(value) => value * 2} />;

// This doesn't work with VFC, there is no way to specify the generic type without hardcoding it
const VFCDropdown: React.VFC<DropdownProps> = () => null;

// Works but is hardcoded to only handle "string" items now
const VFCDropdown2: React.VFC<DropdownProps<string>> = () => null;
