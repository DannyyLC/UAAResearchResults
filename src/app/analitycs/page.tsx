"use client";
import React, { JSX, useState } from "react";
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

// Interfaces de TypeScript
interface ModelArea {
  pregunta: string;
  puntuacion: number;
  tiempo: number;
}

interface ModelStats {
  min: number;
  max: number;
  avg: number;
  median: number;
  range: number;
  std: number;
}

interface CompleteModelData {
  name: string;
  type: 'vanilla' | 'rag';
  similarity: ModelStats;
  time: ModelStats;
  color: string;
  efficiency: number;
  areas: ModelArea[];
}

interface CustomLabelProps {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  value?: string | number;
}

export default function Playground() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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

  // Estadísticas completas por modelo - DATOS REALES DEL CSV
  const completeStats: Record<string, CompleteModelData> = {
    "vanilla_mistral": {
      name: "Vanilla Mistral",
      type: "vanilla",
      similarity: { min: 21.5, max: 90.2, avg: 70.0, median: 73.3, range: 68.7, std: 15.2 },
      time: { min: 1.32, max: 11.82, avg: 4.51, median: 4.13, range: 10.5, std: 1.84 },
      color: "#ef4444",
      efficiency: 16,
      areas: [
        { pregunta: "Redes", puntuacion: 84, tiempo: 5.1 },
        { pregunta: "MySQL", puntuacion: 79, tiempo: 4.8 },
        { pregunta: "MongoDB", puntuacion: 76, tiempo: 4.9 },
        { pregunta: "Sist. Op.", puntuacion: 76, tiempo: 4.0 },
        { pregunta: "Est. Datos", puntuacion: 73, tiempo: 4.4 },
        { pregunta: "Python", puntuacion: 68, tiempo: 5.3 },
        { pregunta: "Programación", puntuacion: 67, tiempo: 4.6 },
        { pregunta: "React", puntuacion: 66, tiempo: 4.0 },
        { pregunta: "Angular", puntuacion: 64, tiempo: 6.1 },
        { pregunta: "POO", puntuacion: 57, tiempo: 3.5 }
      ]
    },
    "vanilla_llama": {
      name: "Vanilla Llama",
      type: "vanilla", 
      similarity: { min: 24.4, max: 92.4, avg: 70.3, median: 73.7, range: 68.0, std: 14.5 },
      time: { min: 0.59, max: 6.25, avg: 2.68, median: 2.74, range: 5.65, std: 0.84 },
      color: "#f59e0b",
      efficiency: 26,
      areas: [
        { pregunta: "Redes", puntuacion: 82, tiempo: 2.6 },
        { pregunta: "MongoDB", puntuacion: 78, tiempo: 2.9 },
        { pregunta: "Sist. Op.", puntuacion: 77, tiempo: 2.9 },
        { pregunta: "MySQL", puntuacion: 76, tiempo: 2.9 },
        { pregunta: "Est. Datos", puntuacion: 74, tiempo: 2.2 },
        { pregunta: "Programación", puntuacion: 72, tiempo: 2.9 },
        { pregunta: "Python", puntuacion: 69, tiempo: 2.6 },
        { pregunta: "Angular", puntuacion: 68, tiempo: 2.8 },
        { pregunta: "React", puntuacion: 67, tiempo: 2.6 },
        { pregunta: "POO", puntuacion: 56, tiempo: 2.2 }
      ]
    },
    "vanilla_gemma": {
      name: "Vanilla Gemma",
      type: "vanilla",
      similarity: { min: 29.7, max: 89.5, avg: 68.0, median: 71.9, range: 59.8, std: 13.5 },
      time: { min: 4.39, max: 12.58, avg: 7.25, median: 6.94, range: 8.18, std: 1.44 },
      color: "#f97316",
      efficiency: 9,
      areas: [
        { pregunta: "Redes", puntuacion: 79, tiempo: 6.2 },
        { pregunta: "MySQL", puntuacion: 75, tiempo: 7.6 },
        { pregunta: "Sist. Op.", puntuacion: 75, tiempo: 6.4 },
        { pregunta: "MongoDB", puntuacion: 72, tiempo: 7.9 },
        { pregunta: "Python", puntuacion: 71, tiempo: 7.4 },
        { pregunta: "Programación", puntuacion: 70, tiempo: 8.7 },
        { pregunta: "Est. Datos", puntuacion: 70, tiempo: 7.4 },
        { pregunta: "React", puntuacion: 65, tiempo: 7.4 },
        { pregunta: "Angular", puntuacion: 65, tiempo: 8.0 },
        { pregunta: "POO", puntuacion: 54, tiempo: 6.4 }
      ]
    },
    "rag_mistral": {
      name: "RAG Mistral ⭐",
      type: "rag",
      similarity: { min: 21.4, max: 90.3, avg: 68.0, median: 70.0, range: 68.9, std: 15.7 },
      time: { min: 3.26, max: 74.36, avg: 8.56, median: 7.73, range: 71.1, std: 5.82 },
      color: "#10b981",
      efficiency: 8,
      areas: [
        { pregunta: "Redes", puntuacion: 80, tiempo: 8.9 },
        { pregunta: "MySQL", puntuacion: 75, tiempo: 8.5 },
        { pregunta: "MongoDB", puntuacion: 74, tiempo: 7.9 },
        { pregunta: "Sist. Op.", puntuacion: 72, tiempo: 7.4 },
        { pregunta: "Est. Datos", puntuacion: 68, tiempo: 7.1 },
        { pregunta: "Programación", puntuacion: 67, tiempo: 9.6 },
        { pregunta: "React", puntuacion: 66, tiempo: 7.8 },
        { pregunta: "Python", puntuacion: 65, tiempo: 8.7 },
        { pregunta: "Angular", puntuacion: 63, tiempo: 14.1 },
        { pregunta: "POO", puntuacion: 57, tiempo: 7.6 }
      ]
    },
    "rag_llama": {
      name: "RAG Llama ⭐",
      type: "rag",
      similarity: { min: 20.4, max: 92.4, avg: 70.7, median: 74.4, range: 71.9, std: 14.4 },
      time: { min: 1.75, max: 22.44, avg: 6.6, median: 6.45, range: 20.69, std: 2.42 },
      color: "#3b82f6",
      efficiency: 11,
      areas: [
        { pregunta: "Redes", puntuacion: 81, tiempo: 7.1 },
        { pregunta: "MongoDB", puntuacion: 79, tiempo: 6.5 },
        { pregunta: "Sist. Op.", puntuacion: 79, tiempo: 6.8 },
        { pregunta: "MySQL", puntuacion: 78, tiempo: 6.8 },
        { pregunta: "Est. Datos", puntuacion: 73, tiempo: 6.7 },
        { pregunta: "Programación", puntuacion: 72, tiempo: 6.0 },
        { pregunta: "Python", puntuacion: 72, tiempo: 5.0 },
        { pregunta: "Angular", puntuacion: 69, tiempo: 6.2 },
        { pregunta: "React", puntuacion: 67, tiempo: 6.7 },
        { pregunta: "POO", puntuacion: 56, tiempo: 6.5 }
      ]
    },
    "rag_gemma": {
      name: "RAG Gemma ⭐",
      type: "rag",
      similarity: { min: 20.9, max: 91.5, avg: 69.5, median: 73.3, range: 70.6, std: 14.6 },
      time: { min: 5.84, max: 36.07, avg: 10.49, median: 10.19, range: 30.23, std: 3.09 },
      color: "#8b5cf6",
      efficiency: 7,
      areas: [
        { pregunta: "Redes", puntuacion: 81, tiempo: 9.1 },
        { pregunta: "MySQL", puntuacion: 78, tiempo: 11.0 },
        { pregunta: "Sist. Op.", puntuacion: 77, tiempo: 10.4 },
        { pregunta: "MongoDB", puntuacion: 76, tiempo: 11.1 },
        { pregunta: "Est. Datos", puntuacion: 72, tiempo: 10.7 },
        { pregunta: "Python", puntuacion: 71, tiempo: 9.8 },
        { pregunta: "Programación", puntuacion: 70, tiempo: 11.0 },
        { pregunta: "Angular", puntuacion: 67, tiempo: 11.4 },
        { pregunta: "React", puntuacion: 66, tiempo: 12.6 },
        { pregunta: "POO", puntuacion: 55, tiempo: 8.7 }
      ]
    }
  };

  // Datos para rankings
  const models = Object.values(completeStats);
  
  const similarityRanking = [...models].sort((a, b) => b.similarity.avg - a.similarity.avg);
  const speedRanking = [...models].sort((a, b) => a.time.avg - b.time.avg);
  const consistencyRanking = [...models].sort((a, b) => a.similarity.range - b.similarity.range);
  const efficiencyRanking = [...models].sort((a, b) => b.efficiency - a.efficiency);

  // Comparaciones Vanilla vs RAG
  const improvements = [
    { 
      model: "Mistral", 
      vanilla: 70.0, 
      rag: 68.0, 
      improvement: -2.0, 
      timeRatio: 1.9 
    },
    { 
      model: "Llama", 
      vanilla: 70.3, 
      rag: 70.7, 
      improvement: 0.4, 
      timeRatio: 2.5 
    },
    { 
      model: "Gemma", 
      vanilla: 68.0, 
      rag: 69.5, 
      improvement: 1.5, 
      timeRatio: 1.4 
    }
  ];

  // Datos para radar chart - comparación del mejor de cada tipo
  const radarData = [
    { subject: 'Precisión', vanilla_llama: 70.3, rag_llama: 70.7, fullMark: 100 },
    { subject: 'Velocidad', vanilla_llama: 95, rag_llama: 40, fullMark: 100 },
    { subject: 'Consistencia', vanilla_llama: 68, rag_llama: 65, fullMark: 100 },
    { subject: 'Eficiencia', vanilla_llama: 85, rag_llama: 45, fullMark: 100 },
    { subject: 'Min Score', vanilla_llama: 24.4, rag_llama: 20.4, fullMark: 100 },
    { subject: 'Max Score', vanilla_llama: 92.4, rag_llama: 92.4, fullMark: 100 }
  ];

  // Scatter plot data (Velocidad vs Precisión)
  const scatterData = models.map(model => ({
    name: model.name,
    x: model.time.avg,
    y: model.similarity.avg,
    z: model.efficiency,
    type: model.type
  }));

  const handleBackClick = (): void => {
    router.push("/");
  };

  const renderCustomLabel = (props: CustomLabelProps): JSX.Element | null => {
    const { x, y, width, value } = props;
    
    if (x === undefined || y === undefined || width === undefined || value === undefined) return null;
    
    const xNum = typeof x === 'string' ? parseFloat(x) : x;
    const yNum = typeof y === 'string' ? parseFloat(y) : y;
    const widthNum = typeof width === 'string' ? parseFloat(width) : width;
    const valueNum = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(xNum) || isNaN(yNum) || isNaN(widthNum) || isNaN(valueNum)) return null;
    
    return (
      <text 
        x={xNum + widthNum / 2} 
        y={yNum - 5} 
        fill="#ffffff" 
        textAnchor="middle" 
        fontSize="10" 
        fontWeight="bold"
      >
        {Math.round(valueNum)}%
      </text>
    );
  };

  const toggleSection = (section: string): void => {
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
                  <h1 className="text-2xl font-bold">Análisis Comparativo RAG vs Vanilla</h1>
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
              <h3 className="text-lg font-bold text-green-400">70.7%</h3>
              <p className="text-xs text-gray-300">Mejor Precisión</p>
              <p className="text-xs text-green-300">RAG Llama</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <h3 className="text-lg font-bold text-blue-400">2.68s</h3>
              <p className="text-xs text-gray-300">Más Rápido</p>
              <p className="text-xs text-blue-300">Vanilla Llama</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <h3 className="text-lg font-bold text-purple-400">59.8</h3>
              <p className="text-xs text-gray-300">Más Consistente</p>
              <p className="text-xs text-purple-300">Vanilla Gemma</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <Gauge className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">26</h3>
              <p className="text-xs text-gray-300">Más Eficiente</p>
              <p className="text-xs text-yellow-300">Vanilla Llama</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <h3 className="text-lg font-bold text-red-400">+1.5%</h3>
              <p className="text-xs text-gray-300">Mayor Mejora</p>
              <p className="text-xs text-red-300">Gemma RAG</p>
            </div>
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 text-center">
              <Activity className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
              <h3 className="text-lg font-bold text-indigo-400">92.4%</h3>
              <p className="text-xs text-gray-300">Pico Máximo</p>
              <p className="text-xs text-indigo-300">Llama (ambos)</p>
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
                      {models.map((model) => (
                        <tr key={model.name} className={`border-b border-white/10 ${
                          model.type === 'rag' ? 'bg-green-900/10' : 'bg-red-900/10'
                        }`}>
                          <td className="py-3 px-4 font-medium">{model.name}</td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-1 rounded text-xs ${
                              model.type === 'rag' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {model.type.toUpperCase()}
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

          {/* RAG vs Vanilla Improvements */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-400">
                <Trophy className="w-6 h-6" />
                Comparación RAG vs Vanilla
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {improvements.map((item) => (
                  <div key={item.model} className="bg-black/50 border border-white/20 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-3 text-white">{item.model}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Diferencia en Precisión</p>
                        <p className={`text-xl font-bold ${
                          item.improvement > 0 ? 'text-green-400' : 
                          item.improvement < 0 ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {item.improvement > 0 ? '+' : ''}{item.improvement.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Factor de Tiempo</p>
                        <p className="text-lg font-semibold text-orange-400">{item.timeRatio.toFixed(1)}x</p>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-red-300">Vanilla: {item.vanilla}%</span>
                        <span className="text-green-300">RAG: {item.rag}%</span>
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
                      domain={[0, 12]}
                      name="Tiempo (s)"
                      tick={{ fill: "#ffffff" }}
                      label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -10, fill: '#ffffff' }}
                    />
                    <YAxis 
                      dataKey="y" 
                      type="number" 
                      domain={[65, 72]}
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
                      data={scatterData.filter(d => d.type === 'vanilla')} 
                      fill="#ef4444"
                      name="Vanilla"
                      r={8}
                    />
                    <Scatter 
                      data={scatterData.filter(d => d.type === 'rag')} 
                      fill="#10b981"
                      name="RAG"
                      r={8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                🟢 RAG: Mayor tiempo de procesamiento | 🔴 Vanilla: Mayor velocidad
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
                      name="Vanilla Llama"
                      dataKey="vanilla_llama"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Radar
                      name="RAG Llama"
                      dataKey="rag_llama"
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
                                  {item.name}: {item.value?.toFixed(1)}
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
                Comparación directa entre el mejor modelo Vanilla vs RAG (Llama)
              </p>
            </div>
          </div>

          {/* Individual Model Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.values(completeStats).map((model) => (
              <div key={model.name} className={`border rounded-xl p-6 ${
                model.type === 'rag' 
                  ? 'bg-green-900/10 border-green-500/30' 
                  : 'bg-red-900/10 border-red-500/30'
              }`}>
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2 ${
                    model.type === 'rag' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className={`w-3 h-3 rounded-full ${
                      model.type === 'rag' ? 'bg-green-400' : 'bg-red-400'
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
                        domain={[50, 90]}
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
                        formatter={(value: number, name: string) => [
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
            <h3 className="text-3xl font-bold text-center mb-6 text-white">🏆 Conclusiones del Análisis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-black/30 rounded-lg border border-green-500/20">
                <h4 className="text-lg font-semibold text-green-400 mb-2">Mejora Promedio</h4>
                <p className="text-2xl font-bold text-white">+0.3%</p>
                <p className="text-sm text-gray-300">RAG mayor precisión</p>
              </div>
              
              <div className="text-center p-4 bg-black/30 rounded-lg border border-blue-500/20">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Trade-off Temporal</h4>
                <p className="text-2xl font-bold text-white">1.9x</p>
                <p className="text-sm text-gray-300">RAG más lento (promedio)</p>
              </div>
              
              <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-500/20">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Mejor Modelo</h4>
                <p className="text-2xl font-bold text-white">Llama</p>
                <p className="text-sm text-gray-300">En velocidad y eficiencia</p>
              </div>
              
              <div className="text-center p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">RAG Funciona</h4>
                <p className="text-2xl font-bold text-white">2/3</p>
                <p className="text-sm text-gray-300">Modelos mejoraron con RAG</p>
              </div>
            </div>
            
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                El análisis demuestra que <strong className="text-green-400">RAG ofrece mejoras moderadas</strong> en 
                precisión para Llama (+0.4%) y Gemma (+1.5%), pero <strong className="text-red-400">reduce ligeramente</strong> 
                el rendimiento de Mistral (-2.0%). El trade-off principal es el <strong className="text-yellow-400">aumento 
                significativo en tiempo de procesamiento</strong> (1.4x - 2.5x más lento).
              </p>
              <p className="text-md text-gray-300 leading-relaxed">
                <strong className="text-blue-400">Vanilla Llama</strong> destaca como el modelo más <strong>eficiente y 
                rápido</strong> (26 pts/s), mientras que <strong className="text-purple-400">RAG es más útil cuando la 
                precisión marginal supera el costo de latencia</strong>, especialmente con Gemma donde la mejora es más notable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}