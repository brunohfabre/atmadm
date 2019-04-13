import React from "react";

import { Text } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import {
  Container,
  ModulesHeader,
  HeaderButton,
  Content,
  Card,
  CardIcon,
  ModulesBottomTabBar
} from "./styles";

import Icon from "react-native-vector-icons/Ionicons";

export default function Modules({ navigation }) {
  async function handleLogout() {
    await AsyncStorage.removeItem("@AtmAdministrativo2:user");

    navigation.navigate("Login");
  }

  return (
    <Container>
      <ModulesHeader>
        <HeaderButton onPress={() => handleLogout()}>
          <Icon size={32} color="#333" name="ios-exit" />
        </HeaderButton>
      </ModulesHeader>
      <Content>
        <Card disabled>
          <Text>1</Text>
        </Card>
        <Card
          onPress={() =>
            navigation.navigate("Maintenance", { cameraOpen: false })
          }
        >
          <CardIcon name="ios-build" />
          <Text>Manutenção</Text>
        </Card>
        <Card disabled>
          <Text>3</Text>
        </Card>
        <Card disabled>
          <Text>4</Text>
        </Card>
      </Content>
      <ModulesBottomTabBar />
    </Container>
  );
}
