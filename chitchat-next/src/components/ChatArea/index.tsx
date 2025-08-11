"use client";
import { useState } from "react";
import { Button, Field } from "react-vant";

export interface ChatAreaProps {
  id: string;
  prompt: string;
  placeholder: string;
  backgroundImage: string;
}

interface MessageItem {
  role: "user" | "assistant";
  message: string;
}

export default function ChatArea({ id, prompt, placeholder, backgroundImage }: ChatAreaProps) {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [value, setValue] = useState("");

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    const next = [...messages, { role: "user", message: text }];
    setMessages(next);
    setValue("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", message: "喵~ 我在呢" }]);
    }, 300);
    // 简易：持久化概要到 localStorage，供消息页读取
    try {
      const key = "chatHistory";
      const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      const arr = raw ? JSON.parse(raw) : [];
      const now = Date.now();
      const lastMessage = text;
      const existingIndex = arr.findIndex((it: any) => it.id === id);
      const summary = {
        id,
        prompt,
        placeholder,
        imageUrl: backgroundImage,
        lastMessage,
        lastMessageTime: now,
        messageCount: (existingIndex >= 0 ? arr[existingIndex].messageCount : 0) + 1,
        hasMessages: true,
      };
      if (existingIndex >= 0) arr.splice(existingIndex, 1, summary);
      else arr.unshift(summary);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 100px)",
      padding: "16px",
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(0,0,0,0.2)",
      borderRadius: 12,
      color: "#fff",
    }}>
      <div style={{ fontSize: 16, opacity: 0.85, marginBottom: 12 }}>{prompt}</div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            background: m.role === "user" ? "#4fc3f7" : "#2c2c2e",
            color: m.role === "user" ? "#000" : "#fff",
            padding: "8px 12px",
            borderRadius: 8,
            maxWidth: "80%",
            wordBreak: "break-word",
          }}>
            {m.message}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Field value={value} onChange={setValue} placeholder={placeholder} clearable style={{ flex: 1 }} />
        <Button type="primary" onClick={handleSend}>发送</Button>
      </div>
    </div>
  );
}


