import React, { useState } from "react";

import { View, Text } from "react-native";

import { Button, ButtonText } from "./styles";

import Icon from "react-native-vector-icons/Ionicons";

import Header from "../../../../components/Header";

import { RNCamera } from "react-native-camera";

export default function Report({ navigation }) {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraType, setCameraType] = useState(1);
  const [barcode, setBarcode] = useState(null);

  function closeCamera(response) {
    const responseFake = 2;
    if (responseFake === 2) {
      setCameraType(2);
      setCameraOpen(false);
      setBarcode(response.data);
      navigation.setParams({ cameraOpen: false });
    } else {
      setCameraOpen(false);
      navigation.setParams({ cameraOpen: false });
      alert("Este IMEI não pussui nenhum chamado de manutenção aberto!");
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {!cameraOpen ? (
        <>
          {cameraType === 1 && (
            <>
              <Header title="Laudo" back="teste" navigation={navigation} />
              <Button
                onPress={() => {
                  setCameraOpen(true);
                  navigation.setParams({ cameraOpen: true });
                }}
              >
                <ButtonText>Abrir leitor de codigo de barras</ButtonText>
              </Button>
            </>
          )}
          {cameraType === 2 && (
            <>
              <Header title="Laudo" back="teste" navigation={navigation} />
              <Text>Camera tipo 2</Text>
              {barcode && <Text>{barcode}</Text>}
            </>
          )}
        </>
      ) : (
        <View style={{ flex: 1 }}>
          {cameraType === 1 && (
            <RNCamera
              ref={camera => {
                this.camera = camera;
              }}
              onBarCodeRead={response => closeCamera(response)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.off}
              permissionDialogTitle={"Permission to use camera"}
              permissionDialogMessage={
                "We need your permission to use your camera phone"
              }
            >
              <View
                style={{
                  height: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              />
            </RNCamera>
          )}
          {cameraType === 2 && <Text>teste</Text>}
        </View>
      )}

      {/* {!cameraOpen && cameraType === 1 && (
        <>
          <Header title="Laudo" back="teste" navigation={navigation} />
          <Button
            onPress={() => {
              setCameraOpen(true);
              navigation.setParams({ cameraOpen: true });
            }}
          >
            <ButtonText>Abrir leitor de codigo de barras</ButtonText>
          </Button>
        </>
      )}

      {!cameraOpen && cameraType === 2 && (
        <>
          <Header title="Laudo" back="teste" navigation={navigation} />
          <Text>Camera tipo 2</Text>
        </>
      )} */}

      {/* {cameraOpen && cameraType === 1 && (
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          onBarCodeRead={response => closeCamera(response)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        >
          <View
            style={{
              height: 1,
              alignSelf: "stretch",
              backgroundColor: "white"
            }}
          />
        </RNCamera>
      )} */}
    </View>
  );
}

Report.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-copy" color={tintColor} size={20} />
    ),
    tabBarVisible: navigation.getParam("cameraOpen") ? false : true
  };
};
