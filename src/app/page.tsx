"use client"
import React, { useState, useRef } from 'react';
import { MessageCircle, Send, Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ChatApp() {
  const [message, setMessage] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(true);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [professionalAnswer, setProfessionalAnswer] = useState('');
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [responses, setResponses] = useState({
    'gemma3:4b': '',
    'mistral:7b': '',
    'llama3.1:8b': ''
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const answerTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estilos del scrollbar
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
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

  // Manejar cambio en textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  // Manejar cambio en textarea de respuesta profesional
  const handleAnswerTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfessionalAnswer(e.target.value);
    
    if (answerTextareaRef.current) {
      answerTextareaRef.current.style.height = 'auto';
      const scrollHeight = answerTextareaRef.current.scrollHeight;
      const maxHeight = 200;
      answerTextareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  // Guardar especialidad y reiniciar ChromaDB
  const handleSpecialtySubmit = async () => {
    if (specialty.trim()) {
      setShowSpecialtyModal(false);
      
      // Reiniciar ChromaDB solo cuando se confirma la especialidad
      try {
        await fetch('https://desarrollo.softweb.mx/api/reiniciar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('ChromaDB reiniciada');
      } catch (error) {
        console.error('Error reiniciando ChromaDB:', error);
      }
    }
  };

  // Subir archivo
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['.txt', '.pdf', '.docx', '.doc'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      alert('Por favor sube solo archivos .txt o .pdf .docx .doc');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('collection', specialty);

    try {
      const response = await fetch('https://desarrollo.softweb.mx/api/index', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setUploadedFiles([...uploadedFiles, file.name]);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      } else {
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Abrir modal para pedir respuesta del profesional
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const question = message.trim();
    setPendingQuestion(question);
    setMessage('');
    setProfessionalAnswer('');
    setShowAnswerModal(true);
    
    // Resetear altura del textarea de pregunta
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px';
    }
  };

  // Enviar pregunta con respuesta del profesional al backend
  const handleSubmitWithAnswer = async () => {
    if (!professionalAnswer.trim()) return;

    setShowAnswerModal(false);
    setCurrentQuestion(pendingQuestion);
    setIsLoading(true);
    
    // Resetear respuestas
    setResponses({
      'gemma3:4b': '',
      'mistral:7b': '',
      'llama3.1:8b': ''
    });

    try {
      const response = await fetch('https://desarrollo.softweb.mx/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: pendingQuestion,
          answer: professionalAnswer.trim(),
          especialidad: specialty
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResponses({
          'gemma3:4b': data.results['gemma3:4b'] || 'No hay respuesta disponible',
          'mistral:7b': data.results['mistral:7b'] || 'No hay respuesta disponible',
          'llama3.1:8b': data.results['llama3.1:8b'] || 'No hay respuesta disponible'
        });
      } else {
        console.error('Error en la respuesta');
        setResponses({
          'gemma3:4b': 'Error al obtener respuesta',
          'mistral:7b': 'Error al obtener respuesta',
          'llama3.1:8b': 'Error al obtener respuesta'
        });
      }
    } catch (error) {
      console.error('Error enviando pregunta:', error);
      setResponses({
        'gemma3:4b': 'Error de conexión',
        'mistral:7b': 'Error de conexión',
        'llama3.1:8b': 'Error de conexión'
      });
    } finally {
      setIsLoading(false);
      setPendingQuestion('');
      setProfessionalAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAnswerKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitWithAnswer();
    }
  };

  const handleCancelAnswer = () => {
    setShowAnswerModal(false);
    setMessage(pendingQuestion);
    setPendingQuestion('');
    setProfessionalAnswer('');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      {/* Modal de Especialidad */}
      {showSpecialtyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border-2 border-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Bienvenido al Sistema RAG UAA</h2>
            
            <p className="text-gray-300 mb-3">
              Por favor, ingresa tu especialidad de manera <span className="font-semibold text-white">específica</span>:
            </p>
            
            <div className="bg-zinc-950 border border-white/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-400 mb-2">Ejemplos:</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Cardiología (en lugar de Medicina)</li>
                <li>✓ Derecho Penal (en lugar de Derecho)</li>
                <li>✓ Ingeniería Civil (en lugar de Ingeniería)</li>
              </ul>
            </div>
            
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSpecialtySubmit()}
              placeholder="Ej: Cardiología, Derecho Penal, Ingeniería Civil..."
              className="w-full px-4 py-2 bg-black border border-white rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
              autoFocus
            />
            
            <div className="bg-zinc-950 border border-white/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-white">Aviso de Privacidad:</span> La información recabada es 100% anónima y solo será utilizada con fines de investigación académica.
              </p>
            </div>
            
            <button
              onClick={handleSpecialtySubmit}
              disabled={!specialty.trim()}
              className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Respuesta del Profesional */}
      {showAnswerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border-2 border-white rounded-xl p-6 max-w-2xl w-full">
            <div className="mb-4 p-4 bg-zinc-950 border border-white/20 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Pregunta:</p>
              <p className="text-white text-lg">{pendingQuestion}</p>
            </div>

            <p className="text-gray-300 mb-3">
              Como especialista en <span className="font-semibold text-white">{specialty}</span>, por favor escriba su respuesta a la pregunta anterior:
            </p>
            
            <textarea
              ref={answerTextareaRef}
              value={professionalAnswer}
              onChange={handleAnswerTextareaChange}
              onKeyPress={handleAnswerKeyPress}
              placeholder="Escriba su respuesta profesional aquí..."
              className="w-full resize-none border border-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white bg-black text-white placeholder-gray-400 min-h-[100px] max-h-[200px] custom-scrollbar mb-4"
              style={{ height: '100px' }}
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={handleCancelAnswer}
                className="flex-1 bg-zinc-800 text-white font-semibold py-2 rounded-lg hover:bg-zinc-700 transition-colors border border-white/20"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitWithAnswer}
                disabled={!professionalAnswer.trim()}
                className="flex-1 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Consulta
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Presiona Enter para enviar, Shift + Enter para nueva línea
            </p>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-black">
        {/* Sidebar Izquierdo */}
        <div className="w-64 bg-zinc-950 border-r border-white p-4 flex flex-col">
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-2">Especialidad</h3>
            <div className="bg-zinc-900 border border-white/20 rounded-lg px-3 py-2">
              <p className="text-white">{specialty || 'No definida'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Subir Archivos</h3>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.pdf,.docx,.doc"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 px-4 rounded-lg transition-colors border border-white/20 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : uploadStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : uploadStatus === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              <span>{isUploading ? 'Subiendo...' : 'Subir Archivo'}</span>
            </label>
            <p className="text-xs text-gray-500 mt-2">Formatos: .txt, .pdf, .docx, .doc</p>
            <p className="text-xs text-gray-400 mt-1">Puedes subir todos los archivos que necesites</p>
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-semibold mb-3">Archivos Indexados</h3>
            <div className="space-y-2 overflow-y-auto custom-scrollbar max-h-full">
              {uploadedFiles.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay archivos cargados</p>
              ) : (
                uploadedFiles.map((fileName, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-zinc-900 rounded-lg border border-white/10">
                    <FileText className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-white text-sm truncate">{fileName}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Área Principal */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-black border-b border-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">UAA RAG System</h2>
                <p className="text-sm text-gray-400">Compara respuestas de múltiples modelos</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Tu Especialidad:</p>
                  <p className="text-2xl font-bold text-white">{specialty}</p>
                </div>
                
                <div className="border-l border-white/20 pl-4">
                  <p className="text-xs text-yellow-400">⚠️ Si recarga la página se perderá toda la información</p>
                </div>
              </div>
            </div>
          </div>

          {/* Área de Respuestas */}
          <div className="flex-1 overflow-hidden p-6">
            {currentQuestion ? (
              <div className="h-full flex flex-col">
                {/* Pregunta del Usuario */}
                <div className="mb-4 p-4 bg-zinc-900 border border-white rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Tu pregunta:</p>
                  <p className="text-white">{currentQuestion}</p>
                </div>

                {/* Grid de Respuestas */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
                  {/* Respuesta Gemma */}
                  <div className="flex flex-col bg-zinc-950 border border-white rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-900 border-b border-white">
                      <h3 className="font-semibold text-white">Gemma3:4B</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      ) : (
                        <p className="text-gray-200 whitespace-pre-wrap">{responses['gemma3:4b']}</p>
                      )}
                    </div>
                  </div>

                  {/* Respuesta Mistral */}
                  <div className="flex flex-col bg-zinc-950 border border-white rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-900 border-b border-white">
                      <h3 className="font-semibold text-white">Mistral:7B</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      ) : (
                        <p className="text-gray-200 whitespace-pre-wrap">{responses['mistral:7b']}</p>
                      )}
                    </div>
                  </div>

                  {/* Respuesta Llama */}
                  <div className="flex flex-col bg-zinc-950 border border-white rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-900 border-b border-white">
                      <h3 className="font-semibold text-white">Llama3.1:8B</h3>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      ) : (
                        <p className="text-gray-200 whitespace-pre-wrap">{responses['llama3.1:8b']}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-zinc-900 border border-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Sistema RAG Listo
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    Sube archivos desde el panel izquierdo y haz preguntas sobre ellos. 
                    Compara las respuestas de tres modelos diferentes.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-black border-t border-white p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleTextareaChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    placeholder="Escribe tu pregunta sobre los documentos..."
                    className="w-full resize-none border border-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white bg-black text-white placeholder-gray-400 min-h-[50px] max-h-[200px] custom-scrollbar disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ height: '50px' }}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className="absolute right-3 bottom-3 p-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 text-center">
                Presiona Enter para enviar, Shift + Enter para nueva línea
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}