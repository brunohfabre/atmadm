import styled from "styled-components";

import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const Container = styled.View`
  height: 100%;
  justify-content: space-between;
  /* background: #f7f7f7; */
`;

export const ModulesHeader = styled.View`
  flex-direction: row;
  height: 56px;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }
})`
  margin-right: 20px;
`;

export const Content = styled.View`
  padding: 20px 20px 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  width: ${(Dimensions.get("window").width - 60) / 2};
  height: ${(Dimensions.get("window").width - 60) / 2};
`;

export const CardIcon = styled(Icon).attrs({
  color: "#333",
  size: 32
})`
  margin-bottom: 10px;
`;

export const ModulesBottomTabBar = styled.View`
  height: 56px;
`;
