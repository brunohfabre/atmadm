import styled from "styled-components/native";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Icon from "react-native-vector-icons/Ionicons";

export const Container = styled.View`
  height: ${(Platform.OS === "ios" ? getStatusBarHeight() : 0) + 54}px;
  padding-top: ${Platform.OS === "ios" ? getStatusBarHeight() : 0};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eaeaea;
`;

export const Left = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
  hitSlop: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
})`
  margin-left: 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const Right = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
  hitSlop: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
})`
  margin-right: 20px;
`;

export const HeaderIcon = styled(Icon).attrs({
  size: 24,
  color: "#333"
})``;
