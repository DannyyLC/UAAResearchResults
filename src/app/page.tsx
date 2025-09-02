"use client"
import React, { useState, useRef } from 'react';
import { MessageCircle, BarChart3, Send, Paperclip, Plus, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatApp() {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('GPT-4');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #ffffff40;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #ffffff60;
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #ffffff40 transparent;
    }
  `;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 500) {
      setSidebarWidth(newWidth);
    }
  };
  const handleMouseUp = () => {
    setIsResizing(false);
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // max height before scroll
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };
  const handlePlaygroundClick = () => {
    router.push('/playground');
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="flex h-screen bg-black">
        {/* Sidebar - Conversaciones */}
        <div 
          className="bg-black border-r border-white flex flex-col md:flex"
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Header del Sidebar */}
          <div className="p-4 border-b border-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-white">UUA RAG System</h1>
            </div>
            <button 
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/20"
            >
              <Plus className="w-4 h-4" />
              Iniciar Chat
            </button>
          </div>

          {/* Lista de Conversaciones */}
          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
            <div className="text-center text-gray-400 mt-8">
              
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 border-t border-white">
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-900 rounded-lg transition-colors"
              onClick={handlePlaygroundClick}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Playground</span>
            </button>
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className="w-0.5 bg-white hover:bg-gray-200 cursor-col-resize transition-colors hidden md:block"
          onMouseDown={handleMouseDown}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-black border-b border-white px-4 md:px-6 py-4">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
              <div className="text-center sm:text-left flex items-center gap-3">
                <button 
                  className="md:hidden p-2 hover:bg-zinc-900 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-white">¡Hola!</h2>
                  <p className="text-sm text-gray-400">Chatea con {selectedModel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="px-3 py-1.5 border border-white rounded-md text-sm bg-black text-white focus:border-gray-300 focus:outline-none"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="" disabled>Selecciona Modelo</option>
                  <option value="GPT-4">GPT-4</option>
                  <option value="Claude">Claude</option>
                  <option value="Gemini">Gemini</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="md:hidden mt-4 pt-4 border-t border-white">
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-zinc-900 rounded-lg transition-colors"
                  onClick={() => {
                    handlePlaygroundClick();
                    setShowMobileMenu(false);
                  }}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Playground</span>
                </button>
              </div>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black custom-scrollbar">
            <div className="max-w-3xl mx-auto">
              {/* Welcome Message */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-zinc-900 border border-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  ¡Bienvenido a ChatApp!
                </h3>
                <p className="text-gray-400 px-4">
                  Comienza una conversación escribiendo tu mensaje abajo
                </p>
              </div>

              {/* Ejemplo de mensajes para visualizar el diseño */}
              <div className="space-y-6">
                {/* User Message Example */}
                <div className="flex justify-end">
                  <div className="bg-zinc-900 border border-white text-white p-4 rounded-2xl rounded-br-md max-w-xs lg:max-w-md shadow-sm">
                    <p>Hola, ¿cómo puedes ayudarme hoy?</p>
                    <span className="text-xs opacity-75 mt-2 block">10:30 AM</span>
                  </div>
                </div>

                {/* AI Message Example */}
                <div className="flex justify-start">
                  <div className="bg-black border border-white p-4 rounded-2xl rounded-bl-md max-w-xs lg:max-w-md shadow-sm">
                    <p className="text-gray-200">¡Hola! Soy tu asistente IA. Puedo ayudarte con una amplia variedad de tareas como responder preguntas, escribir contenido, analizar información y much más. ¿En qué te gustaría que te ayude?</p>
                    <span className="text-xs text-gray-400 mt-2 block">10:31 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-black border-t border-white p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-2 md:gap-3">
                <button className="p-2.5 text-gray-400 hover:text-gray-200 hover:bg-zinc-900 rounded-lg transition-colors flex-shrink-0">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleTextareaChange}
                    placeholder="Escribe tu mensaje..."
                    className="w-full resize-none border border-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white bg-black text-white placeholder-gray-400 min-h-[50px] max-h-[200px] custom-scrollbar text-sm md:text-base"
                    style={{ height: '50px' }}
                  />
                  <button className="absolute right-3 bottom-3 p-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors border border-white/20">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 text-center px-2">
                Presiona Enter para enviar, Shift + Enter para nueva línea
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}