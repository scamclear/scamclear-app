import React, { useState } from "react";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon, InfoIcon } from "@/components/ui/icon";
// import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Image, SafeAreaView, ScrollView } from "react-native";
// import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import UploadInvoice from "@/components/UploadInvoice";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

// import { Image } from "expo-image";
// import * as ImagePicker from "expo-image-picker";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import OcrModule from "@/modules/ocr-module";
import Tesseract from "tesseract.js";

// import { detectText } from 'react-native-vision-camera-text-detector';

export default function Dashboard() {
  const [snapToStart, setSnapToStart] = useState(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [textOcr, setText] = useState<string | null>(null);

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleClose = () => setShowActionsheet(false);

  const pickInvoice = async () => {
    try {
      setUploading(true);
      console.log("Picking invoice...");
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      console.log(docRes);
      if (docRes.assets && docRes.assets.length > 0) {
        console.log("Selected file:", docRes.assets[0].uri);
        extractText(docRes.assets[0].uri);
      } else {
        console.log("No assets found in document picker response.");
      }
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      // aspect: [2, 1],
      quality: 1,
    });

    console.log(result);

    if (result.assets && result.assets.length > 0) {
      setText("  ");
      setUploading(true);
      setImage(result.assets[0].uri);
      console.log("Selected image:", image);
      //   const kkresult = await PhotoRecognizer({
      //     uri: result.assets[0].uri,
      //     orientation: "portrait",
      //   });
      //   console.log(kkresult);
      // const ffff = extractText(result.assets[0].uri);
      recognizeTextFromImage(result.assets[0].uri);
      // console.log("Extracted text:", ffff);
      //   if (!result.canceled) {
      //     setImage(result.assets[0].uri);
      //   }
      // } else {
      //   console.log("No assets found in image picker result.");
    }
  };

  const extractText = async (uri: string) => {
    console.log("Extracting text from:", uri);
    setUploading(true);
    // convert the file to a blob
    const response = await fetch(uri);
    const blob = await response.blob();
    // console.log("Blob created from file:", blob);

    // Use Tesseract.js to recognize text from the image
    const result = await Tesseract.recognize(blob, "eng");
    // setExtractedText(result.data.text);
    console.log(`Extracted text: ${result.data.text}, jobid: ${result.jobId} `);
    setUploading(false);
    setShowActionsheet(false);
    // Handle the extracted text as needed
  };

  const recognizeTextFromImage = async (path: string) => {
    setLoading(true);

    try {
      const recognizedText = await OcrModule.recognizeTextAsync(path);
      setText(recognizedText);
      setSnapToStart(true);
    } catch (err) {
      console.error(err);
      setText("");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView scrollsToTop={snapToStart} className="mb-16 ">
        {/* {image && ( */}

        <VStack className="mb-4">
          <Heading size="md" className=" mb-2">
            Selected Image
          </Heading>
          <Image
          //  size="xl"
            // className="h-64 w-full object-contain "
            style={{ width: "100%", height: 250, objectFit: "contain" }}
            source={{
              uri:
                image ||
                "https://m.media-amazon.com/images/I/31jdzACQNkL._SY300_.jpg",
            }}
          />
        </VStack>
        <VStack className="mb-4">
          <Heading size="md" className=" mb-2">
            Extracted
          </Heading>

          {textOcr ? (
            <Text className="text-sm text-gray-300 mt-2">{textOcr}</Text>
          ) : (
            <Alert action="error" variant="solid">
              <AlertIcon as={InfoIcon} />
              <AlertText>No text recognised.</AlertText>
            </Alert>
          )}
        </VStack>
        {/* )} */}
        <VStack className="w-full  p-4">
          <Heading size="3xl" className="mb-6">
            Dashboard
          </Heading>
          <Text className="mb-6">
            Please provide your business details. This information is required
            to verify your business identity.
          </Text>

          <HStack className="justify-between items-center w-full flex-1 mt-8">
            <Button onPress={pickImage} size="lg" className="w-full">
              <ButtonText>Image picker test</ButtonText>
            </Button>
          </HStack>

          <HStack className="justify-between items-center w-full flex-1 mt-16">
            <Button
              onPress={() => setShowActionsheet(true)}
              size="lg"
              className="w-full"
            >
              <ButtonText>Upload invoice test</ButtonText>
            </Button>
          </HStack>

          {/* <HStack className="justify-between items-center w-full flex-1 mt-16">
          <Button
            onPress={() => toggleCameraFacing}
            size="lg"
            className="w-full"
          >
            <ButtonText>Camera test</ButtonText>
          </Button>
        </HStack> */}
        </VStack>
      </ScrollView>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="px-5">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <HStack className="justify-between w-full mt-3">
            <VStack>
              <Heading size="md" className="font-semibold">
                Upload your invoice for verification
              </Heading>
              <Text size="sm">JPG, PDF, PNG supported</Text>
            </VStack>
            <Pressable onPress={handleClose}>
              <Icon
                as={CloseIcon}
                size="lg"
                className="stroke-background-500"
              />
            </Pressable>
          </HStack>
          {/* <Box className="my-[18px] items-center justify-center rounded-xl bg-background-50 border border-dashed border-outline-300 h-[130px] w-full">
                  <Icon
                    as={UploadCloud}
                    className="h-[62px] w-[62px] stroke-background-200"
                  />
                  <Text size="sm">No files uploaded yet</Text>
                </Box> */}
          <ButtonGroup className="w-full">
            <UploadInvoice
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                //   updateProfile({ username, website, avatar_url: url })
              }}
            />
            {/* <Button
                    className="w-full"
                    variant="solid"
                    // isDisabled
                    action="primary"
                    onPress={pickInvoice}
                  >
                    <ButtonText>Uploadaaa</ButtonText>
                  </Button>  */}
            {/* <Button className="w-full" onPress={pickInvoice}>
                    <ButtonText>Browse files</ButtonText>
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    isDisabled
                    action="secondary"
                  >
                    <ButtonText>Upload</ButtonText>
                  </Button> */}
          </ButtonGroup>
        </ActionsheetContent>
      </Actionsheet>

      {/* <CameraView facing={facing} className="flex-1">
        <VStack className="flex-1 justify-center items-center">
          <TouchableOpacity onPress={toggleCameraFacing}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </VStack>
      </CameraView> */}
    </SafeAreaView>
  );
}
function PhotoRecognizer(arg0: { uri: any; orientation: string }) {
  throw new Error("Function not implemented.");
}
