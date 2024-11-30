import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth"; 
import * as C from "./styles";
import Input from "../../components/Input";

const Ubs = () => {
  const { signout, getUbs, ubsList, userLocation, getUbsWithVacinas } = useAuth(); 
  const [nome, setNome] = useState("");
  const [filteredUbs, setFilteredUbs] = useState([]); 
  const navigate = useNavigate();

  // Cálculo da distância entre duas coordenadas (em km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Limpa o campo de pesquisa
  const clearInput = () => setNome('');

  // Verifica se a localização do usuário está carregada
  const isLocationAvailable = userLocation && userLocation.latitude && userLocation.longitude;

  useEffect(() => {
    getUbs();
    console.log("ubsList:", ubsList);
  }, [getUbs]);

  

  // Filtra a lista de UBSs pelo nome
  const filteredList = ubsList.filter((ubs) => ubs.nome.toLowerCase().includes(nome.toLowerCase()));

  // Ordena a lista de UBSs pela distância mais próxima
  const sortedUbs = filteredList
    .map((ubs) => {
      if (isLocationAvailable) {
        const lat1 = userLocation.latitude;
        const lon1 = userLocation.longitude;
        const lat2 = parseFloat(ubs.latitude.trim());
        const lon2 = parseFloat(ubs.longitude.trim());
        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        return { ...ubs, distance };
      } else {
        return { ...ubs, distance: Infinity }; // Se a localização não estiver disponível, coloca uma distância infinita
      }
    })
    .sort((a, b) => a.distance - b.distance); // Ordena pela distância

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
          <Button Text="Feedback" onClick={() => [signout(), navigate("/feedback")]} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Sair" onClick={() => [signout(), navigate("/")]} />
        </C.ContentMenu>
      </C.Menu>

      <C.MainContainer>
        <C.MainContent>
          <C.TitleUbs>Confira as UBS de Caxias do Sul - RS</C.TitleUbs>
          <C.Div>Pesquise a UBS que deseja ver as informações ou navegue para encontrar:</C.Div>
          <C.BoxFilter>
            <Input
              type="nome"
              placeholder="Ex.: Centenário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {nome && (
              <C.CleaningBotton onClick={clearInput}>x</C.CleaningBotton>
            )}
          </C.BoxFilter>
          <C.UbsList>
            {sortedUbs.map((ubs) => {
              return (
                <C.UbsItem key={ubs.id}>
                  <p><b>UBS {ubs.nome}</b></p>
                  <p><b>Endereço:</b> {ubs.endereco}</p>
                  <p><b>Horário:</b> De segunda à sexta das {ubs.horario_atendimento}.</p>
                  <p><b>Telefone:</b> {ubs.telefone}</p>
                  <p><b>Distância:</b> {ubs.distance !== Infinity ? ubs.distance.toFixed(2) : "Localização não disponível"} km</p>
                </C.UbsItem>
              );
            })}
          </C.UbsList>
        </C.MainContent>
      </C.MainContainer>
    </C.Container>
  );
};

export default Ubs;
