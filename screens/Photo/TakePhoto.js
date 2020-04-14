import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import constants from "../../constants";
import Loader from "../../components/Loader";

const View = styled.View`
  flex: 1;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      hasPermission(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          style={{ width: constants.width, height: constants.height / 2 }}
        />
      ) : null}
    </View>
  );
};
