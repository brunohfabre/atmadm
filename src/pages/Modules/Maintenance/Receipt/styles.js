import styled from "styled-components/native";

import { Dimensions } from "react-native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
`;

export const InputTitle = styled.Text`
  margin-bottom: 10px;
`;

export const Input = styled.TextInput`
  height: 44px;
  background: #f0f0f0;
  align-self: stretch;
  padding: 0 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const CompanyName = styled.Text``;

export const Devices = styled.View``;

export const AddDevice = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  width: ${(Dimensions.get("window").width - 60) / 2};
  height: 56px;
  ${props => (props.disabled ? "background: #D9D9D9" : "background: #2287de")};
  justify-content: center;
  align-items: center;
  border-radius: 8;
`;

export const AddDeviceText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const BottomButtons = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
`;

export const FormItem = styled.View`
  margin-bottom: 20px;
`;

export const ChecklistItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
