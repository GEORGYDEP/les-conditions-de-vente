
import React, { useState } from 'react';
import { AnalysisExercise } from './components/AnalysisExercise';
import { CalculationExercise } from './components/CalculationExercise';
import { AnalysisExerciseData, CalculationExerciseData } from './types';

// Mock Data based on the provided PDF instructions
const analysisExercises: AnalysisExerciseData[] = [
  {
    id: 1,
    title: "Analyse 1 : OfficePro.be",
    conditions: {
      name: "OfficePro.be",
      prix: "Tous nos prix s'entendent HTVA (TVA 21% non incluse).",
      livraison: "Franco domicile dès 75 € d'achat. Frais de port forfaitaires de 6,50 € pour toute commande inférieure.",
      delai: "Livraison sous 24h à 48h ouvrables.",
      paiement: "Bancontact, Carte de Crédit, PayPal. Facturation à 30 jours pour les administrations publiques.",
      reductions: "Remise de 15% pour toute commande de plus de 500 unités. Escompte de 3% pour paiement au grand comptant (à la réception).",
      reclamations: "Toute réclamation doit être introduite par écrit dans les 5 jours suivant la livraison."
    },
    questions: [
      {
        id: 1,
        text: "Quelles sont les conditions de livraison ? Explique.",
        correctAnswer: "Franco (gratuit) si la commande est ≥ 75 €. Sinon, 6,50 € de frais de port. Délai : 24-48h."
      },
      {
        id: 2,
        text: "Une école commande pour 60 € de matériel. Quel sera le montant des frais de livraison ?",
        correctAnswer: "6,50 € car le montant est inférieur au seuil de 75 €."
      },
      {
        id: 3,
        text: "Un client paie sa facture dès réception. De quelle réduction peut-il bénéficier ?",
        correctAnswer: "Un escompte de 3% (paiement au grand comptant)."
      },
      {
        id: 4,
        text: "De combien de temps disposez-vous pour signaler un article manquant ?",
        correctAnswer: "5 jours suivant la livraison."
      }
    ]
  },
  {
    id: 2,
    title: "Analyse 2 : ElectroTech Express",
    conditions: {
      name: "ElectroTech Express",
      prix: "Prix nets TVAC affichés.",
      livraison: "Livraison standard 4,90 €. Franco de port à partir de 150 € d'achat.",
      delai: "Expédition le jour même pour toute commande passée avant 12h.",
      paiement: "Virement bancaire ou espèces en magasin. Professionnels : paiement à 30 jours date de facture.",
      reductions: "Remise fidélité de 5% dès le 3ème achat annuel. Escompte de 1% pour paiement sous 10 jours.",
      reclamations: "Signalement des avaries de transport endéans les 48 heures."
    },
    questions: [
      {
        id: 1,
        text: "À partir de quel montant la livraison devient-elle gratuite ?",
        correctAnswer: "À partir de 150 € d'achat."
      },
      {
        id: 2,
        text: "Quelle est l'échéance de paiement pour un client professionnel ?",
        correctAnswer: "30 jours après la date de la facture."
      },
      {
        id: 3,
        text: "Un client paie sa facture le 5ème jour après l'achat. Quel avantage financier obtient-il ?",
        correctAnswer: "Un escompte de 1% (car paiement effectué sous 10 jours)."
      },
      {
        id: 4,
        text: "Quand faut-il signaler un colis endommagé pendant le transport ?",
        correctAnswer: "Dans les 48 heures."
      }
    ]
  }
];

const calculationExercises: CalculationExerciseData[] = [
  {
    id: 1,
    title: "Calcul 1 : Librairie du Centre",
    companyName: "Librairie du Centre (SRL)",
    supplierName: "Papeterie Gros",
    items: [
      { label: "Ramettes de papier A4", quantity: 80, unitPrice: 4.50 }
    ],
    remiseRate: 10,
    remiseThreshold: 300,
    escompteRate: 2,
    escompteDays: 8
  },
  {
    id: 2,
    title: "Calcul 2 : Garage du Midi",
    companyName: "Garage du Midi",
    supplierName: "Pneus-Direct",
    items: [
      { label: "Pneus été 205/55 R16", quantity: 12, unitPrice: 95.00 }
    ],
    remiseRate: 5,
    remiseThreshold: 1000,
    escompteRate: 3,
    escompteDays: 5
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'calculation'>('analysis');

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg p-6 mb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">Fiche 5 : Les Conditions de Vente</h1>
          <p className="mt-2 text-blue-100 italic">4ème année - Technique de qualification - Économie d'entreprise</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
              activeTab === 'analysis'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500'
            }`}
          >
            Analyse des conditions
          </button>
          <button
            onClick={() => setActiveTab('calculation')}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
              activeTab === 'calculation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500'
            }`}
          >
            Calcul complet
          </button>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {activeTab === 'analysis' ? (
            <div className="grid grid-cols-1 gap-12">
              {analysisExercises.map((ex) => (
                <AnalysisExercise key={ex.id} data={ex} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {calculationExercises.map((ex) => (
                <CalculationExercise key={ex.id} data={ex} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 text-center text-gray-500 text-sm border-t pt-6">
        <p>© 2025-2026 - Institut Saint-Luc de Frameries - Cours de Depret</p>
      </footer>
    </div>
  );
};

export default App;
