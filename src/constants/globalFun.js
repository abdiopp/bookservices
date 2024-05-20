import { useState } from "react";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function globalFun() {
    const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [imageType, setImageType] = useState('');
  const [imageSize, setImageSize] = useState();
  
const handleCamra = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type);
      let itemSize = result.assets[0].fileSize;
      let size = itemSize / 1024;
      size = (size.toFixed(2));
      setImageSize(size);
      setModalVisible(false);
    }
  };

  const handleGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type);
      let itemSize = result.assets[0].fileSize;
      let size = itemSize / 1024;
      size = (size.toFixed(2));
      setImageSize(size);
      setModalVisible(false);
    }
  };

  
  return {
    isModalVisible,
    setModalVisible,
    image,
    setImage,
    imageType,
    setImageType,
    imageSize,
    setImageSize,
    handleCamra,
    handleGallery,
  };
}
