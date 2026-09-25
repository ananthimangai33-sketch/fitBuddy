import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Dumbbell,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import { ChatMessage } from '../types/fitness';
import { askFitnessAssistant } from '../services/geminiService';
import { StorageService } from '../services/storageService';

export const AssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    StorageService.getChatHistory()
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'What exercises can I do at home?',
    'How can I improve my endurance?',
    'What should I do on a rest day?',
    'How long should my workout be?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    StorageService.saveChatHistory(newHistory);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiReplyText = await askFitnessAssistant(trimmed, newHistory);
      const assistantMessage: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedWithAI = [...newHistory, assistantMessage];
      setMessages(updatedWithAI);
      StorageService.saveChatHistory(updatedWithAI);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'assistant',
        text: "I'm having a momentary connection glitch. Remember to stay hydrated and listen to your body!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    const welcome = StorageService.getChatHistory().slice(0, 1);
    setMessages(welcome);
    StorageService.saveChatHistory(welcome);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)] min-h-[550px] animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              FitBuddy AI Assistant
            </h1>
            <p className="text-xs text-slate-500">
              Personalized workout insights & form guidance powered by Gemini
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Clear conversation history"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              } animate-in fade-in`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-lg ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/90 shadow-sm whitespace-pre-line'
                  }`}
                >
                  {message.text}
                </div>

                <div
                  className={`text-[10px] text-slate-400 mt-1 px-1 font-mono ${
                    isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3 animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none text-slate-500 text-xs flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-medium">FitBuddy AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Chips */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 hidden sm:block" />
        {quickSuggestions.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(suggestion)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded-xl transition-all shrink-0 shadow-xs"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="mt-2 shrink-0 space-y-2"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask FitBuddy anything about your workout..."
            className="w-full pl-4 pr-12 py-3.5 text-sm rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 shadow-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white transition-all shadow-sm"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Small Medical Disclaimer */}
        <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            FitBuddy provides general fitness information and is not a substitute for professional medical advice.
          </span>
        </p>
      </form>
    </div>
  );
};
