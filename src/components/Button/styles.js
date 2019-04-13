import styled from "styled-components/native";

export const Background = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  height: 56px;
  background: "#2287de";
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  min-width: 200px;
`;

export const Text = styled.Text`
  color: "white";
`;
