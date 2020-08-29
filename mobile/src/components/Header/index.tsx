import React from "react";
import { Container, Top, Logo, Title } from "./styles";

import logo from "../../assets/Nubank_Logo.png";

import { MaterialIcons as Icon } from "@expo/vector-icons";

const Header = () => {
  return (
    <Container>
      <Top>
        <Logo source={logo} />
        <Title>Simon</Title>
      </Top>
      <Icon name="keyboard-arrow-down" size={15} color="#fff" />
    </Container>
  );
};

export default Header;
