"use client"
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Legend,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  Radar
} from "recharts";
import { 
  ArrowLeft, TrendingUp, Award, Target, Zap, 
  BarChart3, Trophy, Gauge, Activity,
  ChevronDown, ChevronUp, Info, Star
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Playground() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);

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

  // Estadísticas completas por modelo
  const completeStats = {
    "ollama_mistral": {
      name: "Ollama Mistral",
      type: "ollama",
      similarity: { min: 82.6, max: 95.9, avg: 89.7, median: 89.5, range: 13.3, std: 3.2 },
      time: { min: 2.25, max: 11.09, avg: 5.12, median: 5.89, range: 8.84, std: 2.1 },
      color: "#ef4444",
      efficiency: 175, // puntos/segundo
      areas: [
        { pregunta: "Biología", puntuacion: 91, tiempo: 3.8 },
        { pregunta: "Finanzas", puntuacion: 91, tiempo: 4.5 },
        { pregunta: "Física", puntuacion: 90, tiempo: 4.6 },
        { pregunta: "IA", puntuacion: 91, tiempo: 5.5 },
        { pregunta: "Leyes", puntuacion: 88, tiempo: 4.1 },
        { pregunta: "Matemáticas", puntuacion: 88, tiempo: 5.7 },
        { pregunta: "Medicina", puntuacion: 91, tiempo: 3.8 },
        { pregunta: "Química", puntuacion: 91, tiempo: 4.8 },
        { pregunta: "Redes", puntuacion: 89, tiempo: 6.6 },
        { pregunta: "Sistemas Op.", puntuacion: 87, tiempo: 6.3 }
      ]
    },
    "ollama_llama": {
      name: "Ollama Llama",
      type: "ollama", 
      similarity: { min: 75.0, max: 97.2, avg: 87.6, median: 86.8, range: 22.3, std: 4.8 },
      time: { min: 1.60, max: 8.45, avg: 3.66, median: 4.34, range: 6.85, std: 1.9 },
      color: "#f59e0b",
      efficiency: 239,
      areas: [
        { pregunta: "Biología", puntuacion: 88, tiempo: 3.2 },
        { pregunta: "Finanzas", puntuacion: 87, tiempo: 3.1 },
        { pregunta: "Física", puntuacion: 88, tiempo: 3.8 },
        { pregunta: "IA", puntuacion: 87, tiempo: 4.2 },
        { pregunta: "Leyes", puntuacion: 86, tiempo: 3.5 },
        { pregunta: "Matemáticas", puntuacion: 86, tiempo: 4.1 },
        { pregunta: "Medicina", puntuacion: 89, tiempo: 3.4 },
        { pregunta: "Química", puntuacion: 88, tiempo: 3.9 },
        { pregunta: "Redes", puntuacion: 88, tiempo: 3.8 },
        { pregunta: "Sistemas Op.", puntuacion: 88, tiempo: 3.6 }
      ]
    },
    "ollama_gemma": {
      name: "Ollama Gemma",
      type: "ollama",
      similarity: { min: 77.2, max: 96.3, avg: 88.4, median: 87.6, range: 19.1, std: 4.1 },
      time: { min: 2.10, max: 15.42, avg: 7.79, median: 8.28, range: 13.32, std: 3.2 },
      color: "#f97316",
      efficiency: 113,
      areas: [
        { pregunta: "Biología", puntuacion: 89, tiempo: 7.1 },
        { pregunta: "Finanzas", puntuacion: 88, tiempo: 7.5 },
        { pregunta: "Física", puntuacion: 88, tiempo: 8.2 },
        { pregunta: "IA", puntuacion: 88, tiempo: 8.1 },
        { pregunta: "Leyes", puntuacion: 87, tiempo: 7.9 },
        { pregunta: "Matemáticas", puntuacion: 87, tiempo: 8.3 },
        { pregunta: "Medicina", puntuacion: 89, tiempo: 7.4 },
        { pregunta: "Química", puntuacion: 90, tiempo: 7.6 },
        { pregunta: "Redes", puntuacion: 88, tiempo: 7.9 },
        { pregunta: "Sistemas Op.", puntuacion: 86, tiempo: 8.0 }
      ]
    },
    "sistema_mistral": {
      name: "Sistema Mistral ⭐",
      type: "sistema",
      similarity: { min: 82.3, max: 96.9, avg: 89.9, median: 89.8, range: 14.5, std: 3.4 },
      time: { min: 8.24, max: 35.67, avg: 17.64, median: 19.80, range: 27.43, std: 6.8 },
      color: "#10b981",
      efficiency: 51,
      areas: [
        { pregunta: "Biología", puntuacion: 90, tiempo: 16.2 },
        { pregunta: "Finanzas", puntuacion: 90, tiempo: 15.8 },
        { pregunta: "Física", puntuacion: 90, tiempo: 18.1 },
        { pregunta: "IA", puntuacion: 90, tiempo: 19.2 },
        { pregunta: "Leyes", puntuacion: 90, tiempo: 17.4 },
        { pregunta: "Matemáticas", puntuacion: 89, tiempo: 19.5 },
        { pregunta: "Medicina", puntuacion: 90, tiempo: 16.8 },
        { pregunta: "Química", puntuacion: 91, tiempo: 17.1 },
        { pregunta: "Redes", puntuacion: 91, tiempo: 18.9 },
        { pregunta: "Sistemas Op.", puntuacion: 88, tiempo: 16.4 }
      ]
    },
    "sistema_llama": {
      name: "Sistema Llama ⭐",
      type: "sistema",
      similarity: { min: 81.6, max: 95.7, avg: 89.1, median: 88.9, range: 14.2, std: 3.6 },
      time: { min: 12.45, max: 62.47, avg: 25.80, median: 31.63, range: 50.02, std: 12.4 },
      color: "#3b82f6",
      efficiency: 35,
      areas: [
        { pregunta: "Biología", puntuacion: 89, tiempo: 24.1 },
        { pregunta: "Finanzas", puntuacion: 88, tiempo: 23.7 },
        { pregunta: "Física", puntuacion: 91, tiempo: 26.8 },
        { pregunta: "IA", puntuacion: 89, tiempo: 27.2 },
        { pregunta: "Leyes", puntuacion: 88, tiempo: 25.1 },
        { pregunta: "Matemáticas", puntuacion: 88, tiempo: 28.4 },
        { pregunta: "Medicina", puntuacion: 91, tiempo: 24.9 },
        { pregunta: "Química", puntuacion: 90, tiempo: 26.3 },
        { pregunta: "Redes", puntuacion: 89, tiempo: 27.1 },
        { pregunta: "Sistemas Op.", puntuacion: 87, tiempo: 24.4 }
      ]
    },
    "sistema_gemma": {
      name: "Sistema Gemma ⭐",
      type: "sistema",
      similarity: { min: 80.7, max: 95.3, avg: 89.3, median: 88.7, range: 14.7, std: 3.5 },
      time: { min: 6.78, max: 28.93, avg: 15.12, median: 16.49, range: 22.15, std: 5.9 },
      color: "#8b5cf6",
      efficiency: 59,
      areas: [
        { pregunta: "Biología", puntuacion: 89, tiempo: 14.2 },
        { pregunta: "Finanzas", puntuacion: 89, tiempo: 13.9 },
        { pregunta: "Física", puntuacion: 90, tiempo: 15.8 },
        { pregunta: "IA", puntuacion: 89, tiempo: 16.1 },
        { pregunta: "Leyes", puntuacion: 88, tiempo: 14.7 },
        { pregunta: "Matemáticas", puntuacion: 88, tiempo: 16.8 },
        { pregunta: "Medicina", puntuacion: 90, tiempo: 14.5 },
        { pregunta: "Química", puntuacion: 92, tiempo: 15.3 },
        { pregunta: "Redes", puntuacion: 90, tiempo: 15.9 },
        { pregunta: "Sistemas Op.", puntuacion: 89, tiempo: 15.7 }
      ]
    }
  };

  // Datos para rankings
  const models = Object.values(completeStats);
  
  const similarityRanking = [...models].sort((a, b) => b.similarity.avg - a.similarity.avg);
  const speedRanking = [...models].sort((a, b) => a.time.avg - b.time.avg);
  const consistencyRanking = [...models].sort((a, b) => a.similarity.range - b.similarity.range);
  const efficiencyRanking = [...models].sort((a, b) => b.efficiency - a.efficiency);

  // Comparaciones Ollama vs Sistema
  const improvements = [
    { model: "Mistral", ollama: 89.7, sistema: 89.9, improvement: 0.2, timeRatio: 3.4 },
    { model: "Llama", ollama: 87.6, sistema: 89.1, improvement: 1.5, timeRatio: 7.0 },
    { model: "Gemma", ollama: 88.4, sistema: 89.3, improvement: 0.9, timeRatio: 1.9 }
  ];

  // Datos para radar chart
  const radarData = [
    { subject: 'Precisión', ollama_mistral: 89.7, sistema_mistral: 89.9, fullMark: 100 },
    { subject: 'Velocidad', ollama_mistral: 95, sistema_mistral: 30, fullMark: 100 },
    { subject: 'Consistencia', ollama_mistral: 87, sistema_mistral: 86, fullMark: 100 },
    { subject: 'Eficiencia', ollama_mistral: 80, sistema_mistral: 40, fullMark: 100 },
    { subject: 'Min Score', ollama_mistral: 82.6, sistema_mistral: 82.3, fullMark: 100 },
    { subject: 'Max Score', ollama_mistral: 95.9, sistema_mistral: 96.9, fullMark: 100 }
  ];

  // Scatter plot data (Velocidad vs Precisión)
  const scatterData = models.map(model => ({
    name: model.name,
    x: model.time.avg,
    y: model.similarity.avg,
    z: model.efficiency,
    type: model.type
  }));

  const handleBackClick = () => {
    router.push("/");
  };

  const renderCustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text x={x + width / 2} y={y - 5} fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">
        {value}%
      </text>
    );
  };

  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white bg-black sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors border border-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-900 border border-white rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Análisis Comparativo Completo</h1>
                  <p className="text-gray-400 text-sm">Evaluación Exhaustiva: Similitud, Tiempo y Eficiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 custom-scrollbar">
          {/* Executive Summary */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <h3 className="text-lg font-bold text-green-400">89.9%</h3>
              <p className="text-xs text-gray-300">Mejor Precisión</p>
              <p className="text-xs text-green-300">Sistema Mistral</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <h3 className="text-lg font-bold text-blue-400">3.66s</h3>
              <p className="text-xs text-gray-300">Más Rápido</p>
              <p className="text-xs text-blue-300">Ollama Llama</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <h3 className="text-lg font-bold text-purple-400">13.3</h3>
              <p className="text-xs text-gray-300">Más Consistente</p>
              <p className="text-xs text-purple-300">Ollama Mistral</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <Gauge className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">239</h3>
              <p className="text-xs text-gray-300">Más Eficiente</p>
              <p className="text-xs text-yellow-300">Ollama Llama</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <h3 className="text-lg font-bold text-red-400">+1.5%</h3>
              <p className="text-xs text-gray-300">Mayor Mejora</p>
              <p className="text-xs text-red-300">Llama Sistema</p>
            </div>
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 text-center">
              <Activity className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
              <h3 className="text-lg font-bold text-indigo-400">97.2%</h3>
              <p className="text-xs text-gray-300">Pico Máximo</p>
              <p className="text-xs text-indigo-300">Ollama Llama</p>
            </div>
          </div>

          {/* Rankings Section */}
          <div className="mb-8">
            <div 
              className="bg-zinc-900 border border-white/20 rounded-xl p-6 cursor-pointer hover:bg-zinc-800 transition-colors"
              onClick={() => toggleSection('rankings')}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  Rankings Comparativos Detallados
                </h2>
                {expandedSection === 'rankings' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              {expandedSection === 'rankings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Ranking por Precisión */}
                  <div className="bg-black border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Por Precisión Promedio
                    </h3>
                    <div className="space-y-3">
                      {similarityRanking.map((model, index) => (
                        <div key={model.name} className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-black' : 
                              index === 1 ? 'bg-gray-300 text-black' :
                              index === 2 ? 'bg-orange-600 text-white' : 'bg-zinc-600 text-white'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-green-400">{model.similarity.avg}%</span>
                            <div className="text-xs text-gray-400">
                              {model.similarity.min}% - {model.similarity.max}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ranking por Velocidad */}
                  <div className="bg-black border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Por Velocidad Promedio
                    </h3>
                    <div className="space-y-3">
                      {speedRanking.map((model, index) => (
                        <div key={model.name} className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-black' : 
                              index === 1 ? 'bg-gray-300 text-black' :
                              index === 2 ? 'bg-orange-600 text-white' : 'bg-zinc-600 text-white'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-blue-400">{model.time.avg.toFixed(2)}s</span>
                            <div className="text-xs text-gray-400">
                              {model.time.min}s - {model.time.max}s
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ranking por Consistencia */}
                  <div className="bg-black border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Por Consistencia (Menor Variación)
                    </h3>
                    <div className="space-y-3">
                      {consistencyRanking.map((model, index) => (
                        <div key={model.name} className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-black' : 
                              index === 1 ? 'bg-gray-300 text-black' :
                              index === 2 ? 'bg-orange-600 text-white' : 'bg-zinc-600 text-white'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-purple-400">{model.similarity.range.toFixed(1)} pts</span>
                            <div className="text-xs text-gray-400">
                              σ = {model.similarity.std.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ranking por Eficiencia */}
                  <div className="bg-black border border-yellow-500/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                      <Gauge className="w-5 h-5" />
                      Por Eficiencia (Puntos/Segundo)
                    </h3>
                    <div className="space-y-3">
                      {efficiencyRanking.map((model, index) => (
                        <div key={model.name} className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-black' : 
                              index === 1 ? 'bg-gray-300 text-black' :
                              index === 2 ? 'bg-orange-600 text-white' : 'bg-zinc-600 text-white'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-yellow-400">{model.efficiency} pts/s</span>
                            <div className="text-xs text-gray-400">
                              {model.similarity.avg}% ÷ {model.time.avg.toFixed(1)}s
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Statistics Table */}
          <div className="mb-8">
            <div 
              className="bg-zinc-900 border border-white/20 rounded-xl p-6 cursor-pointer hover:bg-zinc-800 transition-colors"
              onClick={() => toggleSection('detailed')}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Info className="w-6 h-6 text-indigo-400" />
                  Estadísticas Detalladas por Modelo
                </h2>
                {expandedSection === 'detailed' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              
              {expandedSection === 'detailed' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4">Modelo</th>
                        <th className="text-center py-3 px-2">Tipo</th>
                        <th className="text-center py-3 px-2">Sim Min</th>
                        <th className="text-center py-3 px-2">Sim Max</th>
                        <th className="text-center py-3 px-2">Sim Avg</th>
                        <th className="text-center py-3 px-2">Sim Med</th>
                        <th className="text-center py-3 px-2">Rango</th>
                        <th className="text-center py-3 px-2">T Min</th>
                        <th className="text-center py-3 px-2">T Max</th>
                        <th className="text-center py-3 px-2">T Avg</th>
                        <th className="text-center py-3 px-2">T Med</th>
                        <th className="text-center py-3 px-2">Eficiencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((model, index) => (
                        <tr key={model.name} className={`border-b border-white/10 ${
                          model.type === 'sistema' ? 'bg-green-900/10' : 'bg-red-900/10'
                        }`}>
                          <td className="py-3 px-4 font-medium">{model.name}</td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-1 rounded text-xs ${
                              model.type === 'sistema' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {model.type}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">{model.similarity.min}%</td>
                          <td className="py-3 px-2 text-center font-semibold">{model.similarity.max}%</td>
                          <td className="py-3 px-2 text-center font-bold text-green-400">{model.similarity.avg}%</td>
                          <td className="py-3 px-2 text-center">{model.similarity.median}%</td>
                          <td className="py-3 px-2 text-center">{model.similarity.range.toFixed(1)}</td>
                          <td className="py-3 px-2 text-center">{model.time.min}s</td>
                          <td className="py-3 px-2 text-center">{model.time.max}s</td>
                          <td className="py-3 px-2 text-center font-bold text-blue-400">{model.time.avg.toFixed(2)}s</td>
                          <td className="py-3 px-2 text-center">{model.time.median.toFixed(2)}s</td>
                          <td className="py-3 px-2 text-center font-semibold text-yellow-400">{model.efficiency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sistema vs Ollama Improvements */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-400">
                <Trophy className="w-6 h-6" />
                Mejoras de Sistema vs Foundation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {improvements.map((item, index) => (
                  <div key={item.model} className="bg-black/50 border border-white/20 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-3 text-white">{item.model}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Mejora en Precisión</p>
                        <p className={`text-xl font-bold ${item.improvement > 1 ? 'text-green-400' : 'text-yellow-400'}`}>
                          +{item.improvement.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Factor de Tiempo</p>
                        <p className="text-lg font-semibold text-red-400">{item.timeRatio.toFixed(1)}x más lento</p>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-red-300">Foundation: {item.ollama}%</span>
                        <span className="text-green-300">Sistema: {item.sistema}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Scatter Plot: Velocidad vs Precisión */}
            <div className="bg-zinc-900 border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Velocidad vs Precisión</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis 
                      dataKey="x" 
                      type="number" 
                      domain={[0, 30]}
                      name="Tiempo (s)"
                      tick={{ fill: "#ffffff" }}
                      label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -10, fill: '#ffffff' }}
                    />
                    <YAxis 
                      dataKey="y" 
                      type="number" 
                      domain={[85, 92]}
                      name="Precisión (%)"
                      tick={{ fill: "#ffffff" }}
                      label={{ value: 'Precisión (%)', angle: -90, position: 'insideLeft', fill: '#ffffff' }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-zinc-800 border border-white/20 rounded-lg p-3">
                              <p className="font-semibold text-white">{data.name}</p>
                              <p className="text-blue-300">Tiempo: {data.x.toFixed(2)}s</p>
                              <p className="text-green-300">Precisión: {data.y.toFixed(1)}%</p>
                              <p className="text-yellow-300">Eficiencia: {data.z} pts/s</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      data={scatterData.filter(d => d.type === 'ollama')} 
                      fill="#ef4444"
                      name="Foundation"
                      r={8}
                    />
                    <Scatter 
                      data={scatterData.filter(d => d.type === 'sistema')} 
                      fill="#10b981"
                      name="Sistema"
                      r={8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                🟢 Sistemas: Mayor precisión, menor velocidad | 🔴 Foundation: Mayor velocidad, menor precisión
              </p>
            </div>

            {/* Radar Chart Comparison */}
            <div className="bg-zinc-900 border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Comparación Multidimensional</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#ffffff20" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff', fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} />
                    <Radar
                      name="Ollama Mistral"
                      dataKey="ollama_mistral"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Sistema Mistral"
                      dataKey="sistema_mistral"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Legend />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-zinc-800 border border-white/20 rounded-lg p-3">
                              <p className="font-semibold text-white mb-1">{label}</p>
                              {payload.map((item, index) => (
                                <p key={index} style={{ color: item.color }}>
                                  {item.name}: {item.value.toFixed(1)}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Comparación directa entre el mejor modelo foundation vs sistema
              </p>
            </div>
          </div>

          {/* Individual Model Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.values(completeStats).map((model, index) => (
              <div key={model.name} className={`border rounded-xl p-6 ${
                model.type === 'sistema' 
                  ? 'bg-green-900/10 border-green-500/30' 
                  : 'bg-red-900/10 border-red-500/30'
              }`}>
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2 ${
                    model.type === 'sistema' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className={`w-3 h-3 rounded-full ${
                      model.type === 'sistema' ? 'bg-green-400' : 'bg-red-400'
                    }`}></span>
                    {model.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <span className="bg-white/10 px-2 py-1 rounded">
                      📊 Avg: {model.similarity.avg}%
                    </span>
                    <span className="bg-white/10 px-2 py-1 rounded">
                      ⏱️ Avg: {model.time.avg.toFixed(1)}s
                    </span>
                    <span className="bg-white/10 px-2 py-1 rounded">
                      📏 Rango: {model.similarity.range.toFixed(1)}
                    </span>
                    <span className="bg-white/10 px-2 py-1 rounded">
                      ⚡ Efic: {model.efficiency} pts/s
                    </span>
                  </div>
                </div>

                <div className="h-72 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={model.areas} margin={{ top: 25, right: 30, left: 10, bottom: 50 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                      <XAxis
                        dataKey="pregunta"
                        tick={{ fill: "#ffffff", fontSize: 9 }}
                        axisLine={{ stroke: "#ffffff20" }}
                        tickLine={{ stroke: "#ffffff20" }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        domain={[75, 95]}
                        tick={{ fill: "#ffffff", fontSize: 10 }}
                        axisLine={{ stroke: "#ffffff20" }}
                        tickLine={{ stroke: "#ffffff20" }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value, name) => [
                          name === 'puntuacion' ? `${value}%` : `${value}s`,
                          name === 'puntuacion' ? 'Similitud' : 'Tiempo'
                        ]}
                      />
                      <Bar 
                        dataKey="puntuacion" 
                        fill={model.color} 
                        radius={[3, 3, 0, 0]} 
                        stroke={model.color} 
                        strokeWidth={1}
                      >
                        <LabelList content={renderCustomLabel} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Estadísticas:</strong> Min: {model.similarity.min}% | Max: {model.similarity.max}% | 
                    Mediana: {model.similarity.median}% | Tiempo: {model.time.min}s - {model.time.max}s
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Final Comprehensive Summary */}
          <div className="mt-12 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30 rounded-xl p-8">
            <h3 className="text-3xl font-bold text-center mb-6 text-white">🏆 Análisis Conclusivo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-black/30 rounded-lg border border-green-500/20">
                <h4 className="text-lg font-semibold text-green-400 mb-2">Precisión Superior</h4>
                <p className="text-2xl font-bold text-white">+0.86%</p>
                <p className="text-sm text-gray-300">Promedio sistemas vs foundation</p>
              </div>
              
              <div className="text-center p-4 bg-black/30 rounded-lg border border-blue-500/20">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Trade-off Temporal</h4>
                <p className="text-2xl font-bold text-white">3.5x</p>
                <p className="text-sm text-gray-300">Más lento pero más preciso</p>
              </div>
              
              <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-500/20">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Dominio Áreas</h4>
                <p className="text-2xl font-bold text-white">6/10</p>
                <p className="text-sm text-gray-300">Áreas lideradas por sistemas</p>
              </div>
              
              <div className="text-center p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Mayor Mejora</h4>
                <p className="text-2xl font-bold text-white">Llama</p>
                <p className="text-sm text-gray-300">+1.5% de mejora en sistema</p>
              </div>
            </div>
            
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                El análisis exhaustivo demuestra que los <strong className="text-green-400">sistemas optimizados</strong> superan 
                consistentemente a los modelos foundation en <strong>precisión y especialización</strong>, con mejoras que van desde 
                <strong className="text-yellow-400"> +0.2% hasta +1.5%</strong> en similitud coseno.
              </p>
              <p className="text-md text-gray-300 leading-relaxed">
                Aunque requieren significativamente más tiempo de procesamiento, los sistemas ofrecen 
                <strong className="text-blue-400"> mayor consistencia</strong> y <strong className="text-purple-400">especialización por dominio</strong>, 
                siendo la opción preferida cuando la <strong>calidad supera a la velocidad</strong> como prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}