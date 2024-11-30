import { createContext, useState, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [ubsList, setUbsList] = useState([]);
    const [vacinasList, setVacinasList] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

    const updateUserLocation = (latitude, longitude) => {
        setUserLocation({ latitude, longitude });
    };

    const signin = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8800/login", {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                setUser({ email });
                return;
            }

            return 'Usuário ou senha incorretos'
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return "E-mail ou senha incorretos";
            } else {
                return "Ocorreu um erro inesperado";
            }
        }
    };

    const signup = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8800/register", {
                email: email,
                password: password,
            });

            if (response.status === 201) {
                setUser({ email });
                return;
            }

            return 'Erro ao criar conta, tente mais tarde'
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return "Conta já existente";
            } else {
                return "Ocorreu um erro inesperado";
            }
        }
    };

    const signout = async () => {
        setUser(null);
    }

    const getUbs = useCallback(async () => {
        try {
            console.log("Buscando dados das UBS...");
            const response = await axios.get("http://localhost:8800/ubs");
            
            console.log("Resposta recebida:", response);
            
            // Assumindo que response.data já seja um array de UBS
            const parsedData = response.data;
            console.log("Dados das UBS recebidos:", parsedData);    
            setUbsList(parsedData);
        } catch (error) {
            if (error.response) {
                console.error("Erro na resposta da API:", error.response);
                return "Erro ao buscar lista de UBSs";
            } else {
                console.error("Erro na requisição:", error);
            }
        }
    }, []);
    

    const getUbsWithVacinas = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8800/ubsWithVacinas");
            setVacinasList(response.data);
        } catch (error) {
            if (error.response) {
                return "Erro ao buscar lista de UBSs com vacinas"
            }
        }
    }, []);

    const getFeedbacks = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8800/feedback");
            console.log("Feedbacks recebidos:", response.data);  // Verifique os dados retornados pela API
            
            setFeedbackList(response.data);  // Atualize o estado feedbackList com os dados da API
            
            // Verifique a atualização do estado logo após a chamada de setFeedbackList
            console.log("Feedback list após atualização:", feedbackList);  // Log para verificar se o estado foi atualizado corretamente
            
        } catch (error) {
            console.error("Erro ao buscar feedbacks:", error);
            return "Erro ao buscar feedbacks";
        }
    }, []);

    const createFeedback = async (comment) => {
        try {
            const response = await axios.post("http://localhost:8800/feedback", { comment });
            if (response.status === 201) {
                await getFeedbacks(); 
                return "Feedback enviado com sucesso";
            }
            return "Erro ao enviar feedback";
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
            return "Erro ao enviar feedback";
        }
    };

    return (
        <AuthContext.Provider
        value={{ user, signed: !!user, signin, signup, signout, getUbs, getUbsWithVacinas,getFeedbacks,
            createFeedback, ubsList, vacinasList,feedbackList,  userLocation, setUserLocation: updateUserLocation   }}
        >
            {children}
        </AuthContext.Provider>
    );
};