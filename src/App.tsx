import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

interface PaymentMethod {
  id: string;
  name: string;
  installments: number;
  interestRate: number;
}

const PaymentCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [totalClientPays, setTotalClientPays] = useState<number>(0);

  const paymentMethods: PaymentMethod[] = [
    { id: 'pix', name: 'PIX', installments: 1, interestRate: 0 },
    { id: 'debit', name: 'Cartão de Débito', installments: 1, interestRate: 0 },
    { id: 'credit-1x', name: 'Cartão de Crédito 1x', installments: 1, interestRate: 0 },
    { id: 'credit-2x', name: 'Cartão de Crédito 2x', installments: 2, interestRate: 0.05 },
    { id: 'credit-3x', name: 'Cartão de Crédito 3x', installments: 3, interestRate: 0.08 },
    { id: 'credit-4x', name: 'Cartão de Crédito 4x', installments: 4, interestRate: 0.12 },
    { id: 'credit-5x', name: 'Cartão de Crédito 5x', installments: 5, interestRate: 0.15 },
    { id: 'credit-6x', name: 'Cartão de Crédito 6x', installments: 6, interestRate: 0.18 },
  ];

  useEffect(() => {
    if (selectedPaymentMethod && amount > 0) {
      const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
      if (method) {
        const total = amount * (1 + method.interestRate);
        setTotalClientPays(total);
      }
    } else {
      setTotalClientPays(0);
    }
  }, [amount, selectedPaymentMethod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getInstallmentText = () => {
    if (!selectedPaymentMethod || amount === 0) {
      return 'Forma de Pagamento:';
    }

    const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
    if (!method || method.installments === 1) {
      return 'Forma de Pagamento:';
    }

    const installmentValue = totalClientPays / method.installments;
    return `Pagamento em ${method.installments}X de ${formatCurrency(installmentValue)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <StatusBar style="auto" />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-xl font-bold">Calculadora de Pagamento</h1>
        </div>

        {/* Amount Input */}
        <div className="p-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Valor da Compra:
          </label>
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o valor"
          />
        </div>

        {/* Payment Method Selection */}
        <div className="px-6 pb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Forma de Pagamento:
          </label>
          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma forma de pagamento</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Info Bar */}
        <div className="bg-yellow-400 text-black text-center py-3 px-4 font-semibold">
          {getInstallmentText()}
        </div>

        {/* Results */}
        {amount > 0 && selectedPaymentMethod && (
          <div className="p-6 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor Original:</span>
                <span className="font-semibold">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total a Pagar:</span>
                <span className="font-bold text-lg text-green-600">
                  {formatCurrency(totalClientPays)}
                </span>
              </div>
              {totalClientPays > amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Juros:</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(totalClientPays - amount)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCalculator;