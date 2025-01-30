import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const PaymentGateway = ({ plan, onClose }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      // Simulate success (in real app, would handle actual payment processing)
      onClose();
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-lg p-8 border border-red-500/20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Complete Purchase</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        {/* Plan Summary */}
        <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">{plan.name} Plan</h3>
          <div className="text-2xl font-bold text-red-500">{plan.price}<span className="text-sm text-gray-400 ml-2">{plan.period}</span></div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300">
              Card Number
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pl-11"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div>
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-300">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="Name on card"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300">
                Expiry Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pl-11"
                  placeholder="MM/YY"
                  maxLength="5"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-300">
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="123"
                maxLength="4"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm flex items-center gap-2">
              <span className="text-red-500">⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Pay {plan.price}
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Payments are secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;