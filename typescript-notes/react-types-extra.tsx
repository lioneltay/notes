// ######################################################################
// React.ElementType
// ######################################################################
/**
 * Things that are a valid JSX tag (Function Component / Class Component / Native Element).
 */
type ElementExampleProps = {
  as: React.ElementType;
};

function ElementExample({ as: As, ...rest }: ElementExampleProps) {
  return <As {...rest} />;
}

const FunctionComp = () => null;

class ClassComp extends React.Component {
  render() {
    return null;
  }
}

<ElementExample as="h1" />;
<ElementExample as={ClassComp} />;
<ElementExample as={FunctionComp} />;
