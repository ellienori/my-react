import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouterParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
`;

interface RouteState {
  name: string;
}

function Coin() {
  const {coinId} = useParams<RouterParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading? <Loader>Loading....</Loader> : null}
    </Container>
  );
}

export default Coin;