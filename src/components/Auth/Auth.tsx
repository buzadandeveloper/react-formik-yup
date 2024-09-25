import { useState } from "react";
import styled from "styled-components";
import { SignUp } from "./SignUp/SignUp";
import { SignIn } from "./SignIn/SignIn";

const ContainerAuth = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const Auth: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(true);

  const changeAuthType: () => void = () => {
    setAuth(!auth);
  };

  return (
    <ContainerAuth>
      {auth ? (
        <SignUp changeAuthType={changeAuthType} />
      ) : (
        <SignIn changeAuthType={changeAuthType} />
      )}
    </ContainerAuth>
  );
};
