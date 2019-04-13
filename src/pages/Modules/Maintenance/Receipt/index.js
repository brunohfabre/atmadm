import React, { useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Picker,
  Switch,
  ScrollView,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  InputTitle,
  Input,
  CompanyName,
  Devices,
  AddDevice,
  AddDeviceText,
  BottomButtons,
  FormItem,
  ChecklistItem,
  SignatureButtonsView
} from "./styles";

import RNPickerSelect from "react-native-picker-select";

import Icon from "react-native-vector-icons/Ionicons";

import Header from "../../../../components/Header";

import { RNCamera } from "react-native-camera";
import SignatureCapture from "react-native-signature-capture";
import PDFLib, { PDFDocument, PDFPage } from "react-native-pdf-lib";
import RNFS from "react-native-fs";

import moment from "moment";

import logoJson from "./logo.json";

export default function Receipt({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [empresas] = useState([
    { id: 1, name: "Empresa 1" },
    { id: 2, name: "Empresa 2" },
    { id: 3, name: "Empresa 3" },
    { id: 4, name: "Empresa 4" },
    { id: 5, name: "Empresa 5" },
    { id: 6, name: "Empresa 6" },
    { id: 7, name: "Empresa 7" },
    { id: 8, name: "Empresa 8" },
    { id: 9, name: "Empresa 9" },
    { id: 10, name: "Empresa 10" },
    { id: 11, name: "Empresa 11" },
    { id: 12, name: "Empresa 12" }
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [devices, setDevices] = useState({
    devices: [],
    personName: ""
  });
  const [disabledButton, setDisabledButton] = useState(true);
  const [pickerSelectItems] = useState([
    { label: "Moto G6", value: "Moto G6" },
    { label: "R5 Plus", value: "R5 Plus" }
  ]);
  const [pickerSelectValue, setPickerSelectValue] = useState(null);
  const [newDevice, setNewDevice] = useState({ model: "", imei: "" });

  const [signatureRef, setSignatureRef] = useState(null);

  async function gerarPdf(response) {
    await setLoading(true);

    const docsDir = await PDFLib.getDocumentsDirectory();

    const logoBase64 = logoJson.atmLogoBase64;

    const logo = `${docsDir}/logo.jpg`;
    const signature = `${docsDir}/signature.jpg`;

    await RNFS.writeFile(logo, logoBase64, "base64");
    await RNFS.writeFile(signature, response.encoded, "base64");

    const page1 = PDFPage.create()
      .setMediaBox(595, 842)
      .drawImage(logo, "jpg", {
        x: 70,
        y: 722,
        width: 160,
        height: 80
      })
      .drawText(
        `Declaro que no dia ${moment(Date.now()).format(
          "DD/MM/YYYY"
        )}, foi dada a entrada de ${
          devices.devices.length
        } equipamentos para manutenção/devolução.`,
        {
          x: 70,
          y: 612,
          color: "#000000"
        }
      )
      .drawText(
        `Representante ${devices.personName}, cadastrado na empresa: ${
          selectedCompany.name
        }.`,
        {
          x: 70,
          y: 582,
          color: "#000000"
        }
      )
      .drawText("Assinatura representante: ", {
        x: 70,
        y: 440,
        color: "#000000"
      })
      .drawImage(signature, "jpg", {
        x: 210,
        y: 360,
        width: 160,
        height: 160
      });

    PDFDocument.create(`/storage/emulated/0/DCIM/camera/${Date.now()}.pdf`)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log("PDF created at: " + path);
        // Do stuff with your shiny new PDF!
        setLoadingStep(2);
        setDevices({
          devices: [],
          personName: ""
        });
      });
  }

  function saveSignature() {
    signatureRef.saveImage();
  }

  function closeCamera(response) {
    setCameraOpen(false);
    setNewDevice({ ...newDevice, imei: response.data });
    navigation.setParams({ cameraOpen: false });
  }

  function RenderListItem(empresa) {
    return (
      <View
        style={{
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedCompany(empresa);
            setStep(2);
          }}
          activeOpacity={0.6}
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 8,
            backgroundColor: "#eaeaea"
          }}
        >
          <Text>{empresa.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      {!cameraOpen && (
        <>
          {loading && (
            <>
              {loadingStep === 1 && (
                <>
                  <Header
                    backFunction={() => setStep(3)}
                    back
                    title="Recebimento"
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>Gerando declaração</Text>
                    <ActivityIndicator
                      color="#666"
                      size={30}
                      style={{ marginTop: 20 }}
                    />
                  </View>
                </>
              )}
              {loadingStep === 2 && (
                <>
                  <Header
                    backFunction={() => setStep(3)}
                    back
                    title="Recebimento"
                  />
                  <Content
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: 56 }} />
                    <Text style={{ fontSize: 18 }}>
                      Declaração gerada com sucesso!
                    </Text>
                    <AddDevice
                      style={{ width: "100%" }}
                      onPress={() => {
                        setStep(1);
                        setLoading(false);
                        setLoadingStep(1);
                      }}
                    >
                      <AddDeviceText>Fazer outro recebimento</AddDeviceText>
                    </AddDevice>
                  </Content>
                </>
              )}
            </>
          )}
          {!loading && (
            <>
              {step === 1 && (
                <>
                  <Header navigation={navigation} back title="Recebimento" />
                  <Content>
                    <View>
                      <Text style={{ marginBottom: 10 }}>Nome da empresa</Text>
                      <Input placeholder="Nome da empresa" />
                    </View>
                    <FlatList
                      data={empresas}
                      keyExtractor={empresa => String(empresa.id)}
                      renderItem={({ item }) => RenderListItem(item)}
                    />
                  </Content>
                </>
              )}
              {step === 2 && (
                <>
                  <Header
                    backFunction={() => setStep(1)}
                    back
                    title="Recebimento"
                  />
                  <Content>
                    <CompanyName>Empresa: {selectedCompany.name}</CompanyName>
                    <View style={{ marginTop: 20 }}>
                      <InputTitle style={{ marginBottom: 10 }}>
                        Nome da pessoa que entregou
                      </InputTitle>
                      <Input
                        placeholder="Nome da pessoa que entregou"
                        onChangeText={value =>
                          setDevices({
                            personName: value,
                            devices: [...devices.devices]
                          })
                        }
                        value={devices.personName}
                      />
                    </View>
                    <Text style={{ marginBottom: 10 }}>Aparelhos</Text>
                    <FlatList
                      style={{ marginBottom: 20 }}
                      data={devices.devices}
                      keyExtractor={device => String(device.id)}
                      renderItem={({ item: device }) => (
                        <View
                          style={{
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#eaeaea",
                            marginBottom: 10
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.6}
                            style={{ padding: 10 }}
                          >
                            <Text>
                              Modelo: {device.model} / IMEI: {device.imei}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                    <BottomButtons>
                      <AddDevice
                        onPress={() => {
                          setStep(3);
                        }}
                      >
                        <AddDeviceText>Adicionar aparelho</AddDeviceText>
                      </AddDevice>
                      <AddDevice
                        disabled={
                          !devices.devices.length || !devices.personName.length
                        }
                        onPress={() => setStep(4)}
                      >
                        <AddDeviceText>Gerar</AddDeviceText>
                      </AddDevice>
                    </BottomButtons>
                  </Content>
                </>
              )}
              {step === 3 && (
                <>
                  <Header
                    backFunction={() => setStep(2)}
                    back
                    title="Recebimento"
                  />
                  <ScrollView
                    contentContainerStyle={{ paddingBottom: 50 }}
                    style={{ padding: 20 }}
                  >
                    <View style={{ height: 50, alignItems: "center" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Adicionar aparelho
                      </Text>
                    </View>

                    <FormItem>
                      <RNPickerSelect
                        placeholder={{
                          label: "Clique para selecionar o modelo do aparelho",
                          value: null
                        }}
                        items={pickerSelectItems}
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, model: value })
                        }
                        value={newDevice.model}
                      />
                    </FormItem>
                    <ChecklistItem>
                      <Text>IMEI: {newDevice.imei}</Text>
                      <AddDevice
                        disabled={!newDevice.model.length}
                        style={{ width: 60 }}
                        onPress={() => {
                          setCameraOpen(true);
                          navigation.setParams({ cameraOpen: true });
                          // setDevices({
                          //   devices: [...devices.devices, newDevice],
                          //   personName: devices.personName
                          // });
                          // setStep(2);
                        }}
                      >
                        <Icon color="#fff" size={32} name="ios-barcode" />
                      </AddDevice>
                    </ChecklistItem>
                    {/* <FormItem>
            <InputTitle>Quantidade de aparelhos</InputTitle>
            <Input
              keyboardType="numeric"
              onChangeText={quantity =>
                setNewDevice({ ...newDevice, quantity: quantity })
              }
              value={newDevice.quantity}
            />
          </FormItem> */}
                    <ChecklistItem style={{ flexDirection: "row" }}>
                      <Text>Capa TPU</Text>
                      <Switch
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, tpuCase: value })
                        }
                        value={newDevice.tpuCase}
                      />
                    </ChecklistItem>
                    <ChecklistItem style={{ flexDirection: "row" }}>
                      <Text>Capa Couro</Text>
                      <Switch
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, leatherCase: value })
                        }
                        value={newDevice.leatherCase}
                      />
                    </ChecklistItem>
                    <ChecklistItem style={{ flexDirection: "row" }}>
                      <Text>Bateria</Text>
                      <Switch
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, battery: value })
                        }
                        value={newDevice.battery}
                      />
                    </ChecklistItem>
                    <ChecklistItem style={{ flexDirection: "row" }}>
                      <Text>Carregador</Text>
                      <Switch
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, charger: value })
                        }
                        value={newDevice.charger}
                      />
                    </ChecklistItem>
                    <ChecklistItem style={{ flexDirection: "row" }}>
                      <Text>Cabo USB</Text>
                      <Switch
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, usbCable: value })
                        }
                        value={newDevice.usbCable}
                      />
                    </ChecklistItem>
                    <ChecklistItem style={{ flexDirection: "row" }}>
                      <Text>Chip 3g</Text>
                      <Switch
                        onValueChange={value =>
                          setNewDevice({ ...newDevice, chip: value })
                        }
                        value={newDevice.chip}
                      />
                    </ChecklistItem>

                    <AddDevice
                      disabled={
                        !newDevice.model.length || !newDevice.imei.length
                      }
                      onPress={() => {
                        setDevices({
                          devices: [...devices.devices, newDevice],
                          personName: devices.personName
                        });
                        setNewDevice({ model: "", imei: "" });
                        setStep(2);
                      }}
                      style={{ width: "100%" }}
                    >
                      <AddDeviceText>Adicionar</AddDeviceText>
                    </AddDevice>
                  </ScrollView>
                </>
              )}
              {step === 4 && (
                <>
                  <Header
                    backFunction={() => setStep(2)}
                    back
                    title="Recebimento"
                  />
                  {/* <View>
                <Text>{devices.personName}</Text>
                {devices.devices.map(device => (
                  <View>
                    <Text>{device.imei}</Text>
                    <Text>{device.model}</Text>
                    {alert(device.battery)}
                  </View>
                ))}

              </View> */}
                  <Content style={{ flex: 1, flexDirection: "column" }}>
                    <SignatureCapture
                      style={{ flex: 1, borderWidth: 1, borderColor: "#000" }}
                      ref={ref => setSignatureRef(ref)}
                      viewMode={"portrait"}
                      showBorder={true}
                      showTitleLabel={true}
                      onSaveEvent={response => gerarPdf(response)}
                      showNativeButtons={false}
                      saveImageFileInExtStorage={false}
                    />
                    <BottomButtons>
                      <AddDevice onPress={() => signatureRef.resetImage()}>
                        <AddDeviceText>Resetar</AddDeviceText>
                      </AddDevice>
                      <AddDevice onPress={() => signatureRef.saveImage()}>
                        <AddDeviceText>Salvar</AddDeviceText>
                      </AddDevice>
                    </BottomButtons>
                  </Content>
                </>
              )}
            </>
          )}
        </>
      )}

      {cameraOpen && (
        <View style={{ flex: 1 }}>
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
        </View>
      )}
    </Container>
  );
}

Receipt.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-archive" color={tintColor} size={20} />
    ),
    tabBarVisible: navigation.getParam("cameraOpen") ? false : true
  };
};
