import React, { useState } from "react";
import {
  Container,
  Content,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Title,
  Cash,
  Annotation,
} from "./styles";
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import Menu from "../../components/Menu";
import { Animated } from "react-native";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { MaterialIcons as Icon } from "@expo/vector-icons";

const Main = () => {
  let offset = 0;
  const translateY = new Animated.Value(0);

  const [visibility, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility((visibility) => !visibility);
  }

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  function onHandlerStateChanged(event: PanGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-200, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <TouchableOpacity onPress={toggleVisibility}>
                <Icon
                  name={visibility ? "visibility" : "visibility-off"}
                  size={28}
                  color="#666"
                />
              </TouchableOpacity>
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Cash>{visibility ? "R$ 750.000,00" : "R$ ---.---,--"} </Cash>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência recebida de Gustavo Simon hoje às 06:00h
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
};

export default Main;
