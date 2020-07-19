export const controlledExample = `() => {
    const [ trigger, setTrigger ] = React.useState(false);
    return (
        <Layout>
          <Cell span='8'>
            <Animate triggerAnimation={trigger}>
              <FormField labelPlacement="left" label="Field label">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span='4'><Button onClick={() => setTrigger(!trigger)}>Play</Button></Cell>
    </Layout>
   )
}
`;

export const onExitedExample = `() => {
    const [ trigger, setTrigger ] = React.useState(false);
    const inputRef = React.useRef(null);
    return (
        <Layout>
          <Cell span='8'>
            <Animate
              onExited={() => inputRef.current.focus()}
              triggerAnimation={trigger}
            >
              <FormField labelPlacement="left" label="Field label">
                <Tooltip content="I am here" >
                   <Input ref={inputRef} size="small" placeholder="Placeholder" />
                </Tooltip>
              </FormField>
            </Animate>
          </Cell>
          <Cell span='4'><Button onClick={() => setTrigger(!trigger)}>Play</Button></Cell>
    </Layout>
   )
}
`;

export const loopExample = `() => {
    const [ trigger, setTrigger ] = React.useState(false);
    const [ loop, setLoop ] = React.useState(false);
    const onPlayClick = () => {
        setTrigger(!trigger);
        setLoop(true);
    };
    return (
        <Layout>
          <Cell span='8'>
            <Animate loop={loop} triggerAnimation={trigger}>
              <FormField labelPlacement="left" label="Field label">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span='4'>
             <Button onClick={onPlayClick}>{trigger ? 'Stop' : 'Play'}</Button>
         </Cell>
        </Layout>
   )
}
`;

export const delayExample = `() => {
    const [ trigger1, setTrigger1 ] = React.useState(false);
    const [ trigger2, setTrigger2 ] = React.useState(false);
    return (
    <Layout>
      <Cell>
        <Layout>
          <Cell span='8'>
            <Animate triggerAnimation={trigger1}>
              <FormField label="Without delay" labelPlacement="left">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setTrigger1(!trigger1)}>Play</Button></Cell>
        </Layout>
      </Cell>
      <Cell>
        <Layout>
          <Cell span='8'>
            <Animate delay triggerAnimation={trigger2}>
              <FormField label="With delay" labelPlacement="left">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setTrigger2(!trigger2)}>Play</Button></Cell>
        </Layout>
      </Cell>
    </Layout>
   )
}
`;

export const childSizeExamples = `() => {
    const [ trigger1, setTrigger1 ] = React.useState(false);
    const [ trigger2, setTrigger2 ] = React.useState(false);
    return (
    <Layout>
      <Cell>
        <Layout>
          <Cell span='5'>
            <Animate triggerAnimation={trigger1}>
               <FormField labelPlacement="left" label="Small">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setTrigger1(!trigger1)}>Play</Button></Cell>
        </Layout>
      </Cell>
      <Cell>
        <Layout>
          <Cell span='8'>
            <Animate triggerAnimation={trigger2}>
              <FormField labelPlacement="left" label="Medium">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setTrigger2(!trigger2)}>Play</Button></Cell>
        </Layout>
      </Cell>
    </Layout>
   )
}
`;
