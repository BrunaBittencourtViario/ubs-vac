import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Home = () => {
  const { signout, getUbs, getUbsWithVacinas, ubsList, setUserLocation, userLocation } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState(""); 
  const [filteredUbs, setFilteredUbs] = useState([]); 

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Localização obtida:", latitude, longitude);
          setUserLocation({ latitude, longitude }); 
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          alert("Para usar esta funcionalidade, precisamos da sua permissão para acessar a localização.");
        }
      );
    } else {
      console.error("A geolocalização não é suportada por este navegador.");
      alert("A geolocalização não é suportada por este navegador.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <C.Container>
      <C.Menu>
        <C.ContentMenu>
          Ubs Vac
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Home" onClick={() => [getUbs(), navigate("/home")]} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Encontrar UBS" onClick={() => [getUbs(), navigate("/ubs")]} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Vacinas" onClick={() => [getUbsWithVacinas(), navigate("/vacinas")]} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Feedback" onClick={() => [ navigate("/feedback")]} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Sair" onClick={() => [signout(), navigate("/")]} />
        </C.ContentMenu>
      </C.Menu>

      <C.MainContainer>
        <C.MainContent>

          <C.ContainerDiv>
            <C.ContentDiv>Documentação Necessária para Atendimento</C.ContentDiv>
            <C.ContentDiv>
              Para garantir um atendimento mais ágil e eficiente, é fundamental que o paciente apresente um documento oficial com foto, como RG, CPF, ou CNH. Esse documento ajuda na identificação rápida e no registro correto das informações. Para atendimentos pediátricos, os responsáveis devem trazer a certidão de nascimento da criança, além de seus próprios documentos. Também é recomendado ter o Cartão SUS, pois ele facilita o acompanhamento médico e permite que o paciente tenha acesso integral ao seu histórico de saúde em toda a rede pública. Em caso de atendimento de emergência, a apresentação dos documentos pode ser feita posteriormente.
            </C.ContentDiv>
          </C.ContainerDiv>

          <C.ContainerDiv>
            <C.ContentDiv>Etapas de Atendimento e Fluxo de Triagem</C.ContentDiv>
            <C.ContentDiv>
              O primeiro passo do atendimento em uma UBS é a triagem. Na chegada, o paciente é acolhido por um profissional de saúde que realiza uma avaliação inicial para entender a queixa principal e o nível de urgência. Essa triagem é essencial para organizar o atendimento conforme as prioridades médicas e garantir que casos graves sejam atendidos com rapidez. Após a triagem, o paciente pode ser direcionado para um atendimento imediato ou agendado para uma consulta futura, dependendo da demanda e da disponibilidade de profissionais. Esse processo ajuda a otimizar os recursos e proporcionar um atendimento mais humano e eficiente.
            </C.ContentDiv>
          </C.ContainerDiv>

          <C.ContainerDiv>
            <C.ContentDiv>Prazo Estimado para Conclusão do Atendimento</C.ContentDiv>
            <C.ContentDiv>
              O tempo de espera para o atendimento pode variar conforme o volume de pacientes no momento. Em geral, casos mais simples são atendidos no mesmo dia, sem necessidade de agendamento, especialmente em situações de menor demanda. Para consultas com especialistas, como ginecologia, pediatria, e odontologia, o prazo para o agendamento pode ser maior, dependendo da especialidade e da quantidade de pessoas aguardando. A equipe da UBS trabalha continuamente para reduzir o tempo de espera e oferecer um atendimento rápido, sempre considerando as necessidades individuais de cada paciente.
            </C.ContentDiv>
          </C.ContainerDiv>

          <C.ContainerDiv>
            <C.ContentDiv>Serviços Disponíveis na UBS</C.ContentDiv>
            <C.ContentDiv>
              As Unidades Básicas de Saúde (UBSs) oferecem uma ampla gama de serviços voltados ao cuidado e promoção da saúde da população. Entre os atendimentos mais comuns, encontram-se consultas nas áreas de clínica geral, pediatria, ginecologia, e odontologia, além de serviços de enfermagem e assistência social. A UBS também disponibiliza atendimento com nutricionistas para orientações alimentares, e com psicólogos e assistentes sociais para acompanhamento de saúde mental e suporte social. Essas unidades são um ponto central na prevenção de doenças, promovendo qualidade de vida e acesso facilitado à saúde para todos.
            </C.ContentDiv>
          </C.ContainerDiv>

        </C.MainContent>
      </C.MainContainer>

    </C.Container>
  );
};

export default Home;
