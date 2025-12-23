import React, { useState, useEffect } from 'react';
import {
  LiveKitRoom,
  useVoiceAssistant,
  useDisconnectButton,
  useLocalParticipant,
  useChat,
  RoomAudioRenderer,
  useTrackTranscription,
  useRoomContext,
} from '@livekit/components-react';
import { Track, RoomEvent } from 'livekit-client';
import { useNavigate } from 'react-router-dom';
import '@livekit/components-styles';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

// --- CONFIGURATION ---
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || "wss://ai-project-h29d9vce.livekit.cloud";

// --- HOOKS ---
const useToken = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchToken = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock room & user for now
      const fetchedToken = await api.getLiveKitToken("gudang-alpha", "user-test");
      setToken(fetchedToken);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { token, loading, error, fetchToken, setToken };
};

// --- COMPONENTS ---

const VoiceInterface = () => {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const { disconnect } = useDisconnectButton();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    source: Track.Source.Microphone,
    participant: localParticipant,
  });
  const { send, chatMessages } = useChat();
  const room = useRoomContext();
  const [manualTranscriptions, setManualTranscriptions] = useState([]);

  useEffect(() => {
    if (!room) return;

    const handleData = (payload, participant, kind, topic) => {
      if (topic === "USER_TRANSCRIPTION") {
        try {
          const text = new TextDecoder().decode(payload);
          const data = JSON.parse(text);
          setManualTranscriptions(prev => [...prev, {
            message: data.text,
            timestamp: Date.now(),
            isUser: true,
            id: `manual-${Date.now()}`
          }]);
        } catch (e) {
          console.error("Failed to parse transcription data", e);
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState("");

  const messages = [
    ...chatMessages.map(m => ({
      message: m.message,
      timestamp: m.timestamp,
      isUser: m.from?.identity === localParticipant?.identity,
      id: m.timestamp + (m.from?.identity || '')
    })),
    ...(agentTranscriptions || []).map(t => ({
      message: t.text,
      timestamp: t.firstReceivedTime,
      isUser: false,
      id: t.id
    })),
    ...(userTranscriptions || []).map(t => ({
      message: t.text,
      timestamp: t.firstReceivedTime,
      isUser: true,
      id: t.id
    })),
    ...manualTranscriptions
  ].sort((a, b) => a.timestamp - b.timestamp);

  const handleDisconnect = () => {
    disconnect?.();
    navigate('/dashboard');
  };

  const toggleMute = async () => {
    if (localParticipant) {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    try {
      if (send) {
        await send(inputValue);
        setInputValue("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col font-display overflow-hidden relative">

      {/* CSS Animations (Injected locally for scoping) */}
      <style>{`
        .chat-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.3);
            border-radius: 20px;
        }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-surface-dark-highlight px-6 lg:px-10 py-4 bg-white dark:bg-background-dark z-20 shrink-0">
        <div className="flex items-center gap-6">
          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
            <span className="text-sm font-bold tracking-wide uppercase hidden sm:block">Back to Dashboard</span>
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-surface-dark-highlight hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">Voice Assistant</h2>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Online</span>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-surface-dark-highlight">
            <div className="flex flex-col items-end text-right">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.name || 'User Admin'}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{user?.role || 'Staff'}</span>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-slate-200 dark:ring-surface-dark-highlight bg-slate-200 flex items-center justify-center text-slate-400"
            >
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-background-light dark:bg-background-dark">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-background-light dark:bg-background-dark z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full h-full max-w-5xl mx-auto flex flex-col px-4 pt-6 pb-4 gap-6">

          {/* Visualizer Header */}
          <div className="flex justify-center shrink-0">
            <div className="relative group">
              <div className="w-64 h-36 bg-surface-dark rounded-xl overflow-hidden shadow-2xl border border-surface-dark-highlight flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <div className="flex items-center gap-1 opacity-80">
                  {/* Simple simulated wave animation */}
                  <div className="w-1.5 bg-primary h-8 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 bg-primary h-12 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 bg-primary h-6 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 bg-primary h-10 rounded-full animate-[pulse_1.1s_ease-in-out_infinite]"></div>
                </div>
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                  <div className={`size-1.5 rounded-full ${state === 'talking' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></div>
                  <span className="text-[10px] font-medium text-white/90 uppercase tracking-wider">
                    {state === 'talking' ? 'Live Agent' : 'Agent Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto chat-scroll flex flex-col items-center gap-6 px-4">
            <div className="w-full max-w-2xl flex flex-col gap-6 py-4">
              {/* Agent Greeting (Static for now in this design) */}
              <div className="flex flex-col items-center text-center animate-fade-in-up">
                <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                  Good evening, {user?.name?.split(' ')[0] || 'User'}! I see you're in Zone B. How can I assist you with the inventory today?
                </p>
              </div>

              {/* Transcript Placeholder / Recent Message */}
              {/* Chat History */}
              {/* Chat History */}
              {messages.length === 0 && (
                <div className="flex justify-start w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="max-w-[85%] text-left">
                    <p className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {state === 'listening' ? '(Listening...)' : 'Start speaking to interact...'}
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full animate-fade-in-up ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl backdrop-blur-sm border ${msg.isUser
                    ? 'bg-surface-dark-highlight/50 text-white rounded-tr-sm border-white/5'
                    : 'bg-slate-200/50 dark:bg-surface-dark/50 text-slate-800 dark:text-slate-100 rounded-tl-sm border-slate-300 dark:border-surface-dark-highlight'
                    }`}>
                    <p className="text-lg leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="shrink-0 w-full flex justify-center pb-2">
            <div className="w-full max-w-3xl relative group">
              <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-dark-highlight rounded-2xl shadow-lg dark:shadow-2xl overflow-hidden transition-colors focus-within:border-primary/50 dark:focus-within:border-primary/50 flex flex-col">
                <div className="flex items-center p-2 pl-4">
                  <input
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base py-3"
                    placeholder="Type a message or speak..."
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 mr-1 text-slate-400 hover:text-white bg-slate-100 dark:bg-surface-dark-highlight hover:bg-primary dark:hover:bg-primary rounded-xl transition-all duration-200">
                    <span className="material-symbols-outlined text-[20px] font-bold">arrow_upward</span>
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-slate-100 dark:border-surface-dark-highlight/50">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className={`group/mic flex items-center justify-center size-9 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark-highlight transition-colors ${!isMicrophoneEnabled ? 'bg-red-500/20' : ''}`}
                      title="Toggle Mute">
                      <span className={`material-symbols-outlined text-slate-400 group-hover/mic:text-white text-[20px] ${!isMicrophoneEnabled ? 'text-red-500' : ''}`}>
                        {isMicrophoneEnabled ? 'mic' : 'mic_off'}
                      </span>
                    </button>
                    <button className="group/chat flex items-center justify-center size-9 rounded-lg bg-primary/10 transition-colors" title="Chat">
                      <span className="material-symbols-outlined text-primary text-[20px]">chat_bubble</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    {state === 'listening' && (
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-surface-dark-highlight rounded-md">
                        <div className="flex gap-0.5 items-end h-3">
                          <div className="w-0.5 bg-primary h-2 animate-[pulse_0.8s_ease-in-out_infinite]"></div>
                          <div className="w-0.5 bg-primary h-3 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
                          <div className="w-0.5 bg-primary h-1.5 animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Listening</span>
                      </div>
                    )}
                    <button
                      onClick={handleDisconnect}
                      className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 rounded-lg transition-all duration-200 text-xs font-bold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[18px]">call_end</span>
                      <span className="hidden sm:inline">End Session</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function VoiceAssistant() {
  const { token, fetchToken, setToken } = useToken();

  // Auto connect on mount
  useEffect(() => {
    if (!token) {
      fetchToken();
    }
  }, []);

  // If no token yet, show loading
  if (!token) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={LIVEKIT_URL}
      connect={true}
      audio={true}
      video={false}
      onDisconnected={() => setToken("")}
      data-lk-theme="default"
    >
      <VoiceInterface />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}