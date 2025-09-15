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
    <div className="flex flex-col h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] max-h-[600px] sm:max-h-[700px] p-3 sm:p-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl transition-all duration-300">      
      {/* 聊天头部 */}
      <div className="mb-4 text-center">        <h3 className="text-lg font-semibold text-white drop-shadow-lg">{prompt}</h3>        <p className="text-sm text-white/70 mt-1">{placeholder}</p>      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scroll-smooth" id={`chat-area-${id}`}>        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">            <div className="text-center">              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>              <p className="text-white/60">{placeholder}</p>            </div>          </div>        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-md transition-all duration-300 ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-lg"
                    : "bg-white/20 dark:bg-gray-800/50 text-white backdrop-blur-sm rounded-bl-lg"
                }`}
              >                <p className="text-sm leading-relaxed">{m.message}</p>                <div className="text-xs opacity-70 mt-1">                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>              </div>            </div>          ))
        )}
      </div>

      {/* 输入区域 */}
      <div className="mt-4 flex gap-2 items-end">        <div className="flex-1">          <Field 
            value={value} 
            onChange={setValue} 
            placeholder={placeholder} 
            clearable 
            className="bg-white/20 dark:bg-gray-800/50 border border-white/30 dark:border-gray-600 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            style={{
              '--rv-field-input-height': '48px',
              '--rv-field-input-background': 'transparent',
              '--rv-field-input-placeholder-color': 'rgba(255, 255, 255, 0.6)',
            } as React.CSSProperties}
          />        </div>        <Button 
          type="primary" 
          onClick={handleSend}
          disabled={!value.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            '--rv-button-height': '48px',
            '--rv-button-border-radius': '12px',
          } as React.CSSProperties}
        >          <div className="flex items-center gap-2">            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>            发送
          </div>        </Button>      </div>
    </div>
  );
}


