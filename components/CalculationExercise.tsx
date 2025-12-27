
import React, { useState, useMemo } from 'react';
import { CalculationExerciseData } from '../types';

interface Props {
  data: CalculationExerciseData;
}

export const CalculationExercise: React.FC<Props> = ({ data }) => {
  const [userInputs, setUserInputs] = useState({
    gross: '',
    remise: '',
    netCom: '',
    escompte: '',
    final: ''
  });
  const [showCorrection, setShowCorrection] = useState(false);

  const calculations = useMemo(() => {
    const grossPrice = data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const remiseAmount = grossPrice > data.remiseThreshold ? (grossPrice * data.remiseRate / 100) : 0;
    const netCommercial = grossPrice - remiseAmount;
    const escompteAmount = (netCommercial * data.escompteRate / 100);
    const netToPay = netCommercial - escompteAmount;

    return {
      gross: grossPrice,
      remise: remiseAmount,
      netCom: netCommercial,
      escompte: escompteAmount,
      final: netToPay
    };
  }, [data]);

  const handleInputChange = (field: keyof typeof userInputs, value: string) => {
    // On n'accepte que les chiffres et la virgule/point
    const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setUserInputs(prev => ({ ...prev, [field]: cleaned }));
  };

  const isCorrect = (field: keyof typeof userInputs) => {
    if (!showCorrection) return null;
    const val = parseFloat(userInputs[field]);
    return Math.abs(val - calculations[field]) < 0.01;
  };

  const formatEuro = (val: number) => {
    return new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-indigo-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          {data.title}
        </h2>
      </div>

      <div className="p-6">
        <div className="bg-slate-800 text-white rounded-xl p-6 mb-8 shadow-inner relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-indigo-300 font-bold uppercase text-xs mb-2 tracking-widest">Énoncé du problème</p>
            <p className="text-lg mb-4">
              L'entreprise <span className="text-yellow-400 font-bold">{data.companyName}</span> achète chez son fournisseur <span className="text-yellow-400 font-bold">{data.supplierName}</span> :
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 mb-4">
              <ul className="list-disc ml-5 space-y-1">
                {data.items.map((item, idx) => (
                  <li key={idx} className="text-slate-100">
                    {item.quantity} x <span className="font-semibold">{item.label}</span> à {formatEuro(item.unitPrice)} / unité.
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Remise de {data.remiseRate}% (si {">"} {formatEuro(data.remiseThreshold)})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Escompte {data.escompteRate}% (paiement sous {data.escompteDays} jours)</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h10V4H7zm2 2h2v2H9V6zm4 0h2v2h-2V6zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" />
            </svg>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">Tableau de calcul à compléter :</h3>
          
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase">Élément de calcul</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase text-right">Saisie élève (€)</th>
                  {showCorrection && <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase text-right bg-blue-50">Correction</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Ligne Prix Brut */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">Prix Brut</td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="text"
                      value={userInputs.gross}
                      onChange={(e) => handleInputChange('gross', e.target.value)}
                      disabled={showCorrection}
                      className={`w-32 px-3 py-2 text-right rounded border-2 outline-none transition-all ${
                        showCorrection 
                          ? (isCorrect('gross') ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                          : 'border-gray-200 focus:border-indigo-500'
                      }`}
                      placeholder="0.00"
                    />
                  </td>
                  {showCorrection && <td className="px-4 py-4 text-sm text-right font-bold text-indigo-700 bg-blue-50">{formatEuro(calculations.gross)}</td>}
                </tr>

                {/* Ligne Remise */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">- Remise ({data.remiseRate}%)</td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="text"
                      value={userInputs.remise}
                      onChange={(e) => handleInputChange('remise', e.target.value)}
                      disabled={showCorrection}
                      className={`w-32 px-3 py-2 text-right rounded border-2 outline-none transition-all ${
                        showCorrection 
                          ? (isCorrect('remise') ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                          : 'border-gray-200 focus:border-indigo-500'
                      }`}
                      placeholder="0.00"
                    />
                  </td>
                  {showCorrection && <td className="px-4 py-4 text-sm text-right font-bold text-red-600 bg-blue-50">- {formatEuro(calculations.remise)}</td>}
                </tr>

                {/* Ligne Net Commercial */}
                <tr className="bg-indigo-50/30 font-bold">
                  <td className="px-4 py-4 text-sm text-indigo-900">NET COMMERCIAL</td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="text"
                      value={userInputs.netCom}
                      onChange={(e) => handleInputChange('netCom', e.target.value)}
                      disabled={showCorrection}
                      className={`w-32 px-3 py-2 text-right rounded border-2 outline-none transition-all ${
                        showCorrection 
                          ? (isCorrect('netCom') ? 'border-green-600 bg-green-100' : 'border-red-500 bg-red-50')
                          : 'border-indigo-200 focus:border-indigo-600'
                      }`}
                      placeholder="0.00"
                    />
                  </td>
                  {showCorrection && <td className="px-4 py-4 text-sm text-right font-bold text-indigo-900 bg-blue-100">{formatEuro(calculations.netCom)}</td>}
                </tr>

                {/* Ligne Escompte */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">- Escompte ({data.escompteRate}%)</td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="text"
                      value={userInputs.escompte}
                      onChange={(e) => handleInputChange('escompte', e.target.value)}
                      disabled={showCorrection}
                      className={`w-32 px-3 py-2 text-right rounded border-2 outline-none transition-all ${
                        showCorrection 
                          ? (isCorrect('escompte') ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                          : 'border-gray-200 focus:border-indigo-500'
                      }`}
                      placeholder="0.00"
                    />
                  </td>
                  {showCorrection && <td className="px-4 py-4 text-sm text-right font-bold text-red-600 bg-blue-50">- {formatEuro(calculations.escompte)}</td>}
                </tr>

                {/* Ligne Net à Payer */}
                <tr className="bg-indigo-700 text-white font-black">
                  <td className="px-4 py-5 text-base uppercase">NET À PAYER</td>
                  <td className="px-4 py-5 text-right">
                    <input
                      type="text"
                      value={userInputs.final}
                      onChange={(e) => handleInputChange('final', e.target.value)}
                      disabled={showCorrection}
                      className={`w-32 px-3 py-2 text-right rounded border-2 outline-none transition-all ${
                        showCorrection 
                          ? (isCorrect('final') ? 'bg-green-600 border-white' : 'bg-red-600 border-white')
                          : 'bg-indigo-800 border-indigo-400 focus:border-white'
                      }`}
                      placeholder="0.00"
                    />
                  </td>
                  {showCorrection && <td className="px-4 py-5 text-lg text-right bg-indigo-900">{formatEuro(calculations.final)}</td>}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => setShowCorrection(!showCorrection)}
              className={`px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
                showCorrection
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-green-500 text-white hover:bg-green-600 ring-4 ring-green-100'
              }`}
            >
              {showCorrection ? "Réessayer l'exercice" : "Valider mes calculs"}
            </button>
          </div>
          {showCorrection && (
            <p className={`text-sm font-bold flex items-center gap-2 ${
              Object.keys(userInputs).every(k => isCorrect(k as any)) ? 'text-green-600' : 'text-red-600'
            }`}>
              {Object.keys(userInputs).every(k => isCorrect(k as any)) 
                ? "🎉 Félicitations ! Tous vos calculs sont corrects." 
                : "⚠️ Certains calculs sont erronés. Comparez avec la correction en bleu."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
