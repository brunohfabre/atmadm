import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import firebase from "react-native-firebase";

import {
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ActivityIndicator
} from "react-native";

import {
  Container,
  Title,
  PhoneNumber,
  ContinueButton,
  ContinueButtonText
} from "./styles";

export default function Login({ navigation }) {
  const [inputRef, setInputRef] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [testeConfirmResult, setTesteConfirmResult] = useState();

  const phoneNumberMultipart = new FormData();

  async function handleLogin() {
    await phoneNumberMultipart.append("celular", inputRef.getRawValue());

    setButtonDisabled(true);
    setLoadingButton(true);

    const response = await api.post(
      "atmadmverificausuario.php",
      phoneNumberMultipart
    );

    if (response.status === 200) {
      console.log("foi");
      firebase
        .auth()
        .signInWithPhoneNumber(`+55${inputRef.getRawValue()}`)
        .then(confirmResult => {
          navigation.navigate("Confirmation", {
            confirmResult
          });
        })
        .catch(error => {
          alert(error);
          setButtonDisabled(false);
          setLoadingButton(false);
        });
    } else {
      alert(response.data);
      setButtonDisabled(false);
      setLoadingButton(false);
    }

    console.log(response);
  }

  function handleContinue() {
    Alert.alert("Este número está correto?", phoneNumber, [
      { text: "Cancel" },
      { text: "OK", onPress: () => handleLogin() }
    ]);
  }

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ width: "100%", alignItems: "center" }}
      >
        <Title>Digite o número de telefone</Title>
        <PhoneNumber
          type="cel-phone"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder="(19) 98326-2172"
          keyboardType="numeric"
          ref={ref => setInputRef(ref)}
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <ContinueButton
          // onPress={() => alert(inputRef.getRawValue())}
          onPress={() => handleContinue()}
          disabled={!(phoneNumber.length >= 15) || buttonDisabled}
        >
          {!loadingButton && <ContinueButtonText>Continuar</ContinueButtonText>}
          {loadingButton && <ActivityIndicator size="small" color="#fff" />}
        </ContinueButton>
      </KeyboardAvoidingView>
    </Container>
  );
}
