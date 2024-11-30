import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(false);
  const [senhaConf, setSenhaConf] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const passwordVisibility = () => {
    setVisualizarSenha(!visualizarSenha);
  };

  const handleSignup = async () => {
    if (!email | !emailConf | !senha | !senhaConf) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf || senha !== senhaConf) {
      setError("Os campos não são iguais");
      return;
    }

    const res = await signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    toast.success("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <C.Container>
      <C.LabelWelcome>FAÇA SEU CADASTRO</C.LabelWelcome>
      <C.MainContent>
        <C.Content>
          <C.DivMain>
            <Input
              type="email"
              placeholder="Digite seu E-mail"
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError("")]}
            />
          </C.DivMain>
          <C.DivMain>
            <Input
              type="email"
              placeholder="Confirme seu E-mail"
              value={emailConf}
              onChange={(e) => [setEmailConf(e.target.value), setError("")]}
            />
          </C.DivMain>
          <C.DivMain>
            <C.PasswordWrapper>
              <Input
                type={visualizarSenha ? "text" : "password"}
                placeholder="Digite sua Senha"
                value={senha}
                onChange={(e) => [setSenha(e.target.value), setError("")]}
              />
              <C.PasswordButton onClick={passwordVisibility}>
                {visualizarSenha ? <FaEyeSlash /> : <FaEye />}
              </C.PasswordButton>
            </C.PasswordWrapper>
          </C.DivMain>
          <C.DivMain>
            <C.PasswordWrapper>
              <Input
                type={visualizarSenha ? "text" : "password"}
                placeholder="Confirme sua Senha"
                value={senhaConf}
                onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
              />
              <C.PasswordButton onClick={passwordVisibility}>
                {visualizarSenha ? <FaEyeSlash /> : <FaEye />}
              </C.PasswordButton>
            </C.PasswordWrapper>
          </C.DivMain>
          <C.DivMain>
            <C.LabelError>{error}</C.LabelError>
          </C.DivMain>
          <C.DivMain>
            <Button Text="Inscrever-se" onClick={handleSignup} />
          </C.DivMain>
          <C.DivMain>
            <C.LabelSignin>
              Já tem uma conta?
              <C.Strong>
                <Link to="/">&nbsp;Entre</Link>
              </C.Strong>
            </C.LabelSignin>
          </C.DivMain>
        </C.Content>
      </C.MainContent>
    </C.Container>
  );
};

export default Signup;