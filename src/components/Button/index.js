import React from "react";

import { Background, Text } from "./styles";

export default function Button({ title, onPress }) {
  return (
    <Background onPress={onPress}>
      <Text>{title}</Text>
    </Background>
  );
}
