import { db, ubs_db } from "../db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export const validateLogin = (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (data.length > 0) {
            return res.status(200).json({ message: "Login bem-sucedido" });
        } else {
            return res.status(404).json({ error: "Usuário ou senha incorretos" });
        }
    });
};


export const createLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const checkQuery = "SELECT * FROM usuarios WHERE email = ?";
    db.query(checkQuery,[email], (err, data) => {
        if (err) return res.status(500).json();
        if (data && data.length>0) {
            return res.status(400)
        };
    })

    const insertQuery = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
    db.query(insertQuery, [email, password], (err, result) => {
        if (err) return res.status(500).json();
        return res.status(201).json();
    });
}

export const getUbs = (req, res) => {
    const query = "SELECT * FROM ubs";
    ubs_db.query(query, (err, result) => {
        if (err) {
            console.error("Erro na consulta:", err);
            return res.status(500).json({ error: "Erro ao consultar o banco de dados" });
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.status(200).json(result);
    });
};

export const getUbsWithVacinas = (req, res) => {
    const query = `
        SELECT
            v.nome AS vacina,
            u.nome AS ubs
        FROM
            vacinas v
        JOIN
            ubs_vacinas uv ON v.id = uv.vacina_id
        JOIN
            ubs u ON uv.ubs_id = u.id
        ORDER BY
            v.nome, u.nome;
    `;

    ubs_db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res.status(200).json(result);
    });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Agora você pode usar __dirname normalmente
const feedbackFilePath = path.join(__dirname, "../feedbacks.json");

const readFeedbackFile = () => {
  if (!fs.existsSync(feedbackFilePath)) {
    return [];
  }
  const data = fs.readFileSync(feedbackFilePath, "utf8");
  return JSON.parse(data || "[]");
};

const writeFeedbackFile = (feedbacks) => {
  fs.writeFileSync(feedbackFilePath, JSON.stringify(feedbacks, null, 2), "utf8");
};

export const createFeedback = (req, res) => {
  const { comment } = req.body;

  if (!comment || typeof comment !== "string") {
    return res.status(400).json({ error: "Comentário inválido." });
  }

  const feedbacks = readFeedbackFile();
  const newFeedback = { id: Date.now(), comment, timestamp: new Date().toISOString() };

  feedbacks.push(newFeedback);
  writeFeedbackFile(feedbacks);

  return res.status(201).json(newFeedback);
};

export const getFeedbacks = (req, res) => {
  const feedbacks = readFeedbackFile();
  return res.status(200).json(feedbacks);
};