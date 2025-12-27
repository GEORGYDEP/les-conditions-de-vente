
import React, { useState } from 'react';
import { AnalysisExerciseData } from '../types';

interface Props {
  data: AnalysisExerciseData;
}

export const AnalysisExercise: React.FC<Props> = ({ data }) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});

  const handleInputChange = (id: number, value: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleSubmit = (id: number) => {
    setSubmitted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all hover:shadow-xl">
      <div className="bg-amber-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {data.title}
        </h2>
      </div>

      <div className="p-6">
        <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-xl p-6 mb-8 relative">
          <span className="absolute -top-3 left-4 bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded">CONDITIONS GÉNÉRALES DE VENTE</span>
          <div className="font-serif leading-relaxed text-gray-800 space-y-3 pt-2">
            <h3 className="text-center font-bold text-lg mb-4 underline uppercase text-amber-900">{data.conditions.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><strong>💰 Prix :</strong> {data.conditions.prix}</p>
              <p><strong>🚚 Livraison :</strong> {data.conditions.livraison}</p>
              <p><strong>⏱️ Délai :</strong> {data.conditions.delai}</p>
              <p><strong>💳 Paiement :</strong> {data.conditions.paiement}</p>
              <p><strong>📉 Réductions :</strong> {data.conditions.reductions}</p>
              <p><strong>📝 Réclamations :</strong> {data.conditions.reclamations}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="font-bold text-gray-700 text-lg border-b pb-2">Répondez aux questions suivantes :</h4>
          <div className="space-y-6">
            {data.questions.map((q, idx) => (
              <div key={q.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-gray-900 font-semibold mb-3">{idx + 1}. {q.text}</p>
                <div className="space-y-3">
                  <textarea
                    disabled={submitted[q.id]}
                    value={userAnswers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="Saisissez votre réponse ici..."
                    className={`w-full p-3 rounded-md border-2 transition-all min-h-[80px] text-sm ${
                      submitted[q.id] 
                        ? 'bg-gray-100 border-gray-200 text-gray-600' 
                        : 'border-blue-100 focus:border-blue-500 focus:ring-0 outline-none'
                    }`}
                  />
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSubmit(q.id)}
                      className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                        submitted[q.id]
                          ? 'bg-gray-500 text-white hover:bg-gray-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      }`}
                    >
                      {submitted[q.id] ? "Modifier ma réponse" : "Valider et voir le corrigé"}
                    </button>
                  </div>

                  {submitted[q.id] && (
                    <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-green-700 uppercase mb-1">Solution attendue :</p>
                          <p className="text-sm text-green-800 italic">{q.correctAnswer}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
