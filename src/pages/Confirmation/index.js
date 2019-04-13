import React, { useState, useEffect } from "react";

import {
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import {
  Container,
  Title,
  CodeInput,
  ContinueButton,
  ContinueButtonText
} from "./styles";

export default function Confirmation({ navigation }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [confirmResult, setConfirmResult] = useState();

  console.log(navigation.getParam("confirmResult"));

  async function handleConfirm() {
    setButtonDisabled(true);
    setLoadingButton(true);
    await navigation
      .getParam("confirmResult")
      .confirm(codeInput)
      .then(async user => {
        await AsyncStorage.setItem(
          "@AtmAdministrativo2:user",
          JSON.stringify(user)
        );
        navigation.navigate("Modules");
      })
      .catch(err => {
        alert(err);
        setButtonDisabled(false);
        setLoadingButton(false);
      });
  }

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ width: "100%", alignItems: "center" }}
      >
        <Title>Insira o número de verificação</Title>

        <CodeInput
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder="123456"
          autoFocus
          keyboardType="numeric"
          maxLength={6}
          value={codeInput}
          onChangeText={code => setCodeInput(code)}
        />

        <ContinueButton
          onPress={() => handleConfirm()}
          disabled={!(codeInput.length >= 6) || buttonDisabled}
        >
          {!loadingButton && <ContinueButtonText>Confirmar</ContinueButtonText>}
          {loadingButton && <ActivityIndicator size="small" color="#fff" />}
        </ContinueButton>
      </KeyboardAvoidingView>
    </Container>
  );
}
