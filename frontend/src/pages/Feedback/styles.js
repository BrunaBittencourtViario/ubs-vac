import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;    
  background-color: #FFF;
  height: 100%;
`;

export const Menu = styled.div`
  display: grid;
  align-items: center;
  background-color: #657997;
  grid-template-columns: repeat(6, 1fr);
  height: 50px;
`;

export const ContentMenu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #FFF;
  background: #657997;
  font-size: 16px;
  border-right: 1px solid #FFF;
  text-transform: uppercase;

  &:last-child {
    border-right: none;
  }

  button {
    padding: 0;
    border-radius: unset;
    font-size: unset;
    max-width: unset;
    font-weight: unset;
    height: 100%;
  }
`;

export const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 14px;
  margin-top: 5px;
`;

export const MainContainer = styled.div`  
  padding: 10px;
  background: #eceff4;
  height: 100%;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;  
  background: #FFF;
  border-radius: 4px;
  padding: 20px;
`;

export const TitleFeedback = styled.label`
  font-size: 26px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const SubmissionMessage = styled.p`
  color: #5cb85c;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const FeedbackList = styled.div`
  margin-top: 20px;
`;

export const FeedbackTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const FeedbackItem = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const FeedbackComment = styled.p`
  font-size: 1rem;
  color: #333;
`;

export const FeedbackDate = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #888;
  margin-top: 5px;
`;

export const NoFeedbackMessage = styled.p`
  font-size: 1rem;
  color: #888;
  font-style: italic;
`;
