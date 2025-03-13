import React, { useState,useContext} from "react";
import { CreditCard, Calendar, Lock } from "lucide-react";


const PaymentGateway = ({ plan, onClose }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);  // For showing modal
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Function to validate the card number using the Luhn Algorithm
  const isValidCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, ""); // Remove non-numeric characters
    let sum = 0;
    let alternate = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let n = parseInt(cleaned[i], 10);
      if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alternate = !alternate;
    }
    return sum % 10 === 0;
  };

  // 🔹 Function to validate expiry date (MM/YY) and ensure it's in the future
  const isValidExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Matches MM/YY format
    if (!regex.test(date)) return false;

    const [month, year] = date.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  // 🔹 Function to validate CVV (3-4 digits)
  const isValidCVV = (cvv) => /^\d{3,4}$/.test(cvv);

  // 🔹 Form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { cardNumber, cardholderName, expiryDate, cvv } = formData;

    // Card Number Validation
    if (!isValidCardNumber(cardNumber)) {
      setError("Invalid card number.");
      return;
    }

    // Cardholder Name Validation
    if (!cardholderName.trim()) {
      setError("Cardholder name is required.");
      return;
    }

    // Expiry Date Validation
    if (!isValidExpiryDate(expiryDate)) {
      setError("Invalid or expired expiry date.");
      return;
    }

    // CVV Validation
    if (!isValidCVV(cvv)) {
      setError("Invalid CVV.");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      onClose(); // Close the modal after success

      try {
        const userId = localStorage.getItem('userId'); // Ensure userId is retrieved

        if (!userId) {
          alert('User not logged in. Please log in again.');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/plans/${userId}/updateMemberPlan`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPlan: plan.name }), // Send only newPlan
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Trigger modal with success message
        setModalMessage('Plan updated successfully!');
        setShowModal(true); // Show modal

        // Use React state update inside a component
        const { setUser } = useContext(UserContext);
        setUser((prevState) => ({
          ...prevState,
          plan: plan.name, // Update the plan in the user context
        }));

      } catch (error) {
        console.error('Error updating plan:', error);
       // alert('An error occurred while updating the plan.');
      }
    }, 2000);
  };


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-lg p-8 border border-red-500/20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Complete Purchase</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
          <div className="text-2xl font-bold text-red-500">
            {plan.price}
            <span className="text-sm text-gray-400 ml-2">{plan.period}</span>
          </div>
        </div>

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
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="MM/YY"
                maxLength="5"
              />
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
          {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>)}

          {error && <div className="text-red-500 text-sm">{error}</div>}
          

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-red-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : `Pay ${plan.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
