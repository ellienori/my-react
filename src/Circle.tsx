import { useState } from "react";
import styled from "styled-components";

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
  border: 5px solid ${props => props.borderColor}; // CSS에서는 borderColor가 required
`;

function Circle({bgColor, borderColor}: CircleProps) {
  const [value, setValue] = useState<number|string>(0);
  setValue(2);
  setValue("hi");
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor } />;
}

interface CircleProps { // interface explains "object"
  bgColor: string; // required
  borderColor?: string; // optional
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

export default Circle;