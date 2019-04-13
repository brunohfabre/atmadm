import React, { useState, useEffect } from "react";

import { PermissionsAndroid } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import createNavigator from "./routes";

async function requestCameraPermission() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: "Cool Photo App Camera Permission",
      message:
        "Cool Photo App needs access to your camera " +
        "so you can take awesome pictures.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
}

export default function App() {
  const [userChecked, setUserChecked] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  console.disableYellowBox = true;

  useEffect(async () => {
    const response = await AsyncStorage.getItem("@AtmAdministrativo2:user");

    requestCameraPermission();

    // AsyncStorage.removeItem("@AtmAdministrativo2:confirmResult");

    console.log(!!response);

    setUserChecked(true);
    setUserLogged(!!response);
  }, []);

  const Routes = createNavigator(userLogged);

  if (!userChecked) return null;

  return <Routes />;
}
