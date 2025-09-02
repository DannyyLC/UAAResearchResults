"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Playground() {
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

  // Datos hardcodeados para cada tema
  const chartData = [
    {
      title: "Programación",
      description: "Evaluación de capacidades de desarrollo de código, debugging y solución de problemas algorítmicos.",
      data: [
        { modelo: "GPT-4", puntuacion: 85 },
        { modelo: "Claude", puntuacion: 82 },
        { modelo: "Gemini", puntuacion: 78 }
      ]
    },
    {
      title: "Leyes",
      description: "Análisis jurídico, interpretación de normativas y razonamiento legal en casos complejos.",
      data: [
        { modelo: "GPT-4", puntuacion: 79 },
        { modelo: "Claude", puntuacion: 81 },
        { modelo: "Gemini", puntuacion: 76 }
      ]
    },
    {
      title: "Contaduría",
      description: "Cálculos financieros, análisis contable y comprensión de principios de contabilidad.",
      data: [
        { modelo: "GPT-4", puntuacion: 83 },
        { modelo: "Claude", puntuacion: 80 },
        { modelo: "Gemini", puntuacion: 77 }
      ]
    },
    {
      title: "Medicina",
      description: "Diagnósticos médicos, interpretación de síntomas y conocimiento de tratamientos.",
      data: [
        { modelo: "GPT-4", puntuacion: 76 },
        { modelo: "Claude", puntuacion: 78 },
        { modelo: "Gemini", puntuacion: 74 }
      ]
    },
    {
      title: "Matemáticas",
      description: "Resolución de problemas matemáticos complejos, cálculo y álgebra avanzada.",
      data: [
        { modelo: "GPT-4", puntuacion: 88 },
        { modelo: "Claude", puntuacion: 85 },
        { modelo: "Gemini", puntuacion: 83 }
      ]
    },
    {
      title: "Literatura",
      description: "Análisis literario, comprensión de textos complejos y creatividad narrativa.",
      data: [
        { modelo: "GPT-4", puntuacion: 84 },
        { modelo: "Claude", puntuacion: 87 },
        { modelo: "Gemini", puntuacion: 81 }
      ]
    },
    {
      title: "Historia",
      description: "Conocimiento histórico, análisis de eventos y comprensión de contextos temporales.",
      data: [
        { modelo: "GPT-4", puntuacion: 82 },
        { modelo: "Claude", puntuacion: 84 },
        { modelo: "Gemini", puntuacion: 79 }
      ]
    },
    {
      title: "Ciencias",
      description: "Conocimiento científico, análisis de fenómenos naturales y método científico.",
      data: [
        { modelo: "GPT-4", puntuacion: 81 },
        { modelo: "Claude", puntuacion: 83 },
        { modelo: "Gemini", puntuacion: 80 }
      ]
    },
    {
      title: "Idiomas",
      description: "Traducción, gramática y comprensión cultural en múltiples idiomas.",
      data: [
        { modelo: "GPT-4", puntuacion: 86 },
        { modelo: "Claude", puntuacion: 84 },
        { modelo: "Gemini", puntuacion: 88 }
      ]
    },
    {
      title: "Negocios",
      description: "Análisis estratégico, plan de negocios y comprensión del mercado empresarial.",
      data: [
        { modelo: "GPT-4", puntuacion: 80 },
        { modelo: "Claude", puntuacion: 82 },
        { modelo: "Gemini", puntuacion: 78 }
      ]
    }
  ];

  const handleBackClick = () => {
    router.push('/');
  };

  // Función personalizada para renderizar las etiquetas
  const renderCustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 5} 
        fill="#ffffff" 
        textAnchor="middle" 
        fontSize="12"
        fontWeight="bold"
      >
        {value}%
      </text>
    );
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
                  <h1 className="text-2xl font-bold">Playground</h1>
                  <p className="text-gray-400 text-sm">Comparación de Rendimiento entre Modelos LLM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 custom-scrollbar">
          {/* Intro Section */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">Resultados del Estudio Comparativo</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Este análisis presenta una evaluación exhaustiva del rendimiento de los principales modelos de lenguaje 
              en diferentes áreas de conocimiento. Cada gráfica muestra las puntuaciones obtenidas por GPT-4, Claude y Gemini 
              en pruebas especializadas, proporcionando insights valiosos para la selección del modelo más adecuado según el dominio.
            </p>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chartData.map((chart, index) => (
              <div key={index} className="bg-black border border-white rounded-xl p-6">
                {/* Chart Title */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    {chart.title}
                  </h3>
                </div>

                {/* Chart Container */}
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chart.data} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis 
                        dataKey="modelo" 
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        axisLine={{ stroke: '#ffffff40' }}
                        tickLine={{ stroke: '#ffffff40' }}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        axisLine={{ stroke: '#ffffff40' }}
                        tickLine={{ stroke: '#ffffff40' }}
                      />
                      <Bar 
                        dataKey="puntuacion" 
                        fill="#ffffff"
                        radius={[4, 4, 0, 0]}
                        stroke="#ffffff"
                        strokeWidth={1}
                      >
                        <LabelList content={renderCustomLabel} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart Description */}
                <div className="border-t border-white/20 pt-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {chart.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary */}
          <div className="mt-16 p-8 border border-white rounded-xl bg-zinc-900/30">
            <h3 className="text-xl font-semibold mb-4 text-center">Resumen de Resultados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-white mb-2">GPT-4</div>
                <div className="text-sm text-gray-400">Excelente en programación y matemáticas</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-white mb-2">Claude</div>
                <div className="text-sm text-gray-400">Destacado en literatura y análisis legal</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-white mb-2">Gemini</div>
                <div className="text-sm text-gray-400">Superior en idiomas y traducción</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}