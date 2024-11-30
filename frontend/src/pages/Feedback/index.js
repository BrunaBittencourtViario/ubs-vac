import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";

const Feedback = () => {
  const navigate = useNavigate();
  const { createFeedback, getFeedbacks, feedbackList = [] } = useAuth(); // Certifique-se de pegar o feedbackList do context
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


    useEffect(() => {
        console.log("Carregando feedbacks...");
        getFeedbacks();
    }, [getFeedbacks]);

    useEffect(() => {
        console.log("Lista de feedbacks no front:", feedbackList); // Verifique aqui a lista
    }, [feedbackList]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError("Por favor, preencha o campo de feedback.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const message = await createFeedback(feedback); 
      console.log("Resposta do servidor:", message);

      if (message === "Feedback enviado com sucesso") {
        setSubmitted(true);
        setFeedback("");
      } else {
        setError(message); 
      }
    } catch (err) {
      console.error("Erro ao enviar feedback:", err);
      setError("Ocorreu um erro ao enviar seu feedback. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <C.Container>
      <C.Menu>
        <C.ContentMenu>Ubs Vac</C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Home" onClick={() => navigate("/home")} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Encontrar UBS" onClick={() => navigate("/ubs")} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Vacinas" onClick={() => navigate("/vacinas")} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Feedback" onClick={() => navigate("/feedback")} />
        </C.ContentMenu>
        <C.ContentMenu>
          <Button Text="Sair" onClick={() => navigate("/")} />
        </C.ContentMenu>
      </C.Menu>

      <C.MainContainer>
            <C.MainContent>
                <C.TitleFeedback>Deixe seu Feedback</C.TitleFeedback>

                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <C.TextArea
                            placeholder="Digite seu feedback aqui..."
                            value={feedback}
                            onChange={handleFeedbackChange}
                            disabled={loading}
                        />
                        {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
                        <C.ButtonContainer>
                            <Button Text={loading ? "Enviando..." : "Enviar"} disabled={loading} Type="submit" />
                        </C.ButtonContainer>
                    </form>
                ) : (
                    <C.SubmissionMessage>
                        Obrigado pelo seu feedback!
                    </C.SubmissionMessage>
                )}

                <C.FeedbackList>
                    <C.FeedbackTitle>Feedbacks Recebidos:</C.FeedbackTitle>
                    {feedbackList.length > 0 ? (
                        feedbackList.map((feedbackItem) => (
                            <C.FeedbackItem key={feedbackItem.id}>
                                <C.FeedbackComment>{feedbackItem.comment}</C.FeedbackComment>
                                <C.FeedbackDate>
                                    {new Date(feedbackItem.timestamp).toLocaleString('pt-BR')}
                                </C.FeedbackDate>
                            </C.FeedbackItem>
                        ))
                    ) : (
                        <C.NoFeedbackMessage>Ainda não há feedbacks.</C.NoFeedbackMessage>
                    )}
                </C.FeedbackList>
            </C.MainContent>
        </C.MainContainer>
    </C.Container>
  );
};

export default Feedback;
