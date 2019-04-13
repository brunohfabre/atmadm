import React from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { Container, Left, Title, Right, HeaderIcon } from "./styles";

export default function Header({ navigation, title, back, backFunction }) {
  async function handleLogout() {
    await AsyncStorage.removeItem("@AtmAdministrativo2:user");

    navigation.navigate("Login");
  }

  return (
    <Container>
      {back && (
        <>
          {navigation && (
            <Left onPress={() => navigation.pop()}>
              <HeaderIcon name="ios-arrow-back" />
            </Left>
          )}
          {!navigation && (
            <Left onPress={() => backFunction()}>
              <HeaderIcon name="ios-arrow-back" />
            </Left>
          )}
        </>
      )}
      {!back && (
        <Left>
          <HeaderIcon name={back} />
        </Left>
      )}
      <Title>{title}</Title>
      <Right onPress={() => handleLogout()}>
        <HeaderIcon name="ios-exit" />
      </Right>
    </Container>
  );
}
