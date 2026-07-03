import dayjs from "dayjs";
import React, { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingSpinnerImage from "../assets/loading-spinner.gif";
import "./ChatInput.css";

type ChatMessage = {
  message: string | React.ReactNode;
  sender: string;
  id: string;
  time?: number;
};

type ChatInputProps = {
  chatMessages: ChatMessage[];
  setChatMessages: (chatMessages: ChatMessage[]) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    setInputText("");
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            className="loading-spinner"
            src={LoadingSpinnerImage}
            alt="loading-spinner"
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setIsLoading(false);
  }

  function sendMessageKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
    }
    if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={sendMessageKeyDown}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
