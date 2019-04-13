import styled from "styled-components/native";

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  height: 56px;
  background: #2287de;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  align-self: stretch;
  margin: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
