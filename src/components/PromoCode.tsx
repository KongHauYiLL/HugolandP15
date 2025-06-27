import React, { useState } from 'react';
import { PromoCodeState } from '../types/game';
import { Gift, Check, X, AlertCircle } from 'lucide-react';

interface PromoCodeProps {
  promoCodes: PromoCodeState;
  onRedeemCode: (code: string) => boolean;
}

export const PromoCode: React.FC<PromoCodeProps> = ({ promoCodes, onRedeemCode }) => {
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleRedeem = () => {
    if (!inputCode.trim()) {
      setMessage({ text: 'Please enter a promo code', type: 'error' });
      return;
    }

    const success = onRedeemCode(inputCode.toUpperCase());
    
    if (success) {
      setMessage({ text: 'Promo code redeemed successfully!', type: 'success' });
      setInputCode('');
    } else {
      setMessage({ text: 'Invalid or already used promo code', type: 'error' });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 sm:p-6 rounded-lg shadow-2xl">
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Promo Codes</h2>
        </div>
        <p className="text-green-300 text-sm sm:text-base">Redeem special codes for exclusive rewards!</p>
      </div>

      {/* Redeem Section */}
      <div className="bg-black/30 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
        <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Enter Promo Code</h3>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="Enter code here..."
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none text-sm sm:text-base"
            maxLength={20}
          />
          <button
            onClick={handleRedeem}
            className="px-4 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-200 text-sm sm:text-base"
          >
            Redeem
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-900/50 border border-green-500/50 text-green-300' 
              : 'bg-red-900/50 border border-red-500/50 text-red-300'
          }`}>
            {message.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}
      </div>

      {/* Available Codes */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Available Codes</h3>
        <div className="space-y-3">
          {promoCodes.availableCodes.map((code) => (
            <div
              key={code.code}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                code.isUsed
                  ? 'border-gray-600 bg-gray-800/50 opacity-50'
                  : 'border-green-500/50 bg-green-900/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm sm:text-base ${
                    code.isUsed ? 'text-gray-400' : 'text-green-400'
                  }`}>
                    {code.code}
                  </span>
                  {code.isUsed && <Check className="w-4 h-4 text-green-400" />}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  code.isUsed 
                    ? 'bg-gray-600 text-gray-300' 
                    : 'bg-green-600 text-white'
                }`}>
                  {code.isUsed ? 'Used' : 'Available'}
                </span>
              </div>
              
              <h4 className={`font-semibold text-sm sm:text-base mb-1 ${
                code.isUsed ? 'text-gray-400' : 'text-white'
              }`}>
                {code.name}
              </h4>
              
              <p className={`text-xs sm:text-sm mb-2 ${
                code.isUsed ? 'text-gray-500' : 'text-gray-300'
              }`}>
                {code.description}
              </p>
              
              <div className="flex gap-3 text-xs">
                {code.rewards.coins && (
                  <span className={code.isUsed ? 'text-gray-500' : 'text-yellow-400'}>
                    +{code.rewards.coins} coins
                  </span>
                )}
                {code.rewards.gems && (
                  <span className={code.isUsed ? 'text-gray-500' : 'text-purple-400'}>
                    +{code.rewards.gems} gems
                  </span>
                )}
                {code.rewards.items && (
                  <span className={code.isUsed ? 'text-gray-500' : 'text-blue-400'}>
                    +{code.rewards.items.length} items
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Used Codes */}
      {promoCodes.usedCodes.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Redeemed Codes</h3>
          <div className="bg-black/20 p-3 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {promoCodes.usedCodes.map((code, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-600 text-white text-xs rounded font-semibold"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-gray-400 text-xs sm:text-sm">
          Promo codes can only be used once. Keep an eye out for new codes!
        </p>
      </div>
    </div>
  );
};