import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';


export default function  UseCamera(){
  const [scannedImage, setScannedImage] = useState<string | undefined>();

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument()
  
    // get back an array with scanned image file paths
    if (scannedImages && scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0])
    }
  }

  useEffect(() => {
    // call scanDocument on load
    scanDocument()
  }, []);

  return (
    <Image
      resizeMode="contain"
      style={{ width: '100%', height: '100%' }}
      source={{ uri: scannedImage }}
    />
  )
}
// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import {
//   useCameraDevice,
//   useCameraPermission,
// } from "react-native-vision-camera";
// import { Camera } from "react-native-vision-camera-text-recognition";
// export default function UseCamera() {
//   const [data, setData] = useState<string | Text[] >("");
//   const device = useCameraDevice("back");
//   console.log(data);

//   const { hasPermission } = useCameraPermission();

//   if (!hasPermission)
//     return (
//       <>
//         <View>no permission</View>
//       </>
//     );
//   if (device == null)
//     return (
//       <>
//         <View>no camera</View>
//       </>
//     );

//   return (
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive
//       options={{
//         language: "latin",
//       }}
//       mode={"recognize"}
//       callback={(d) => setData(d.toString())}
//     />
//   );
// }
