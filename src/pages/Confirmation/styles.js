import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;

export const CodeInput = styled.TextInput`
  margin: 60px 4px;
  height: 44px;
  background: #f0f0f0;
  width: 100px;
  border-radius: 8px;
  padding-left: 16px;
  font-size: 18px;
`;

export const ContinueButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  height: 56px;
  ${props => (props.disabled ? "background: #D9D9D9" : "background: #2287de")};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 200px;
`;

export const ContinueButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
