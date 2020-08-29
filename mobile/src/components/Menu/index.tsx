import React, { ReactHTML } from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Animated } from "react-native";
import {
  Container,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText,
} from "./styles";

import QRCode from "react-native-qrcode-svg";

interface Params {
  translateY: Animated.Value;
}

const Menu: React.FC<Params> = ({ translateY }) => {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 150],
          outputRange: [0, 1],
        }),
      }}
    >
      <Code>
        <QRCode
          value="https:\\www.google.com.br"
          size={80}
          backgroundColor="#fff"
          color="#8B10AE"
        />
      </Code>
      <Nav>
        <NavItem>
          <Icon name="help-outline" size={20} color="#fff" />
          <NavText>Me ajuda</NavText>
        </NavItem>
        <NavItem>
          <Icon name="person-outline" size={20} color="#fff" />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="credit-card" size={20} color="#fff" />
          <NavText>Configurar cartão</NavText>
        </NavItem>
        <NavItem>
          <Icon name="smartphone" size={20} color="#fff" />
          <NavText>Configurações do app</NavText>
        </NavItem>
      </Nav>
      <SignOutButton>
        <SignOutButtonText>SAIR DO APP</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
};

export default Menu;
