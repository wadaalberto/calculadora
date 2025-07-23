import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PaymentMethod {
  id: string;
  name: string;
  installments: number;
  interestRate: number;
}

export default function PaymentCalculator() {
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
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Calculadora de Pagamento</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Valor da Compra:</Text>
          <TextInput
            style={styles.input}
            value={amount ? amount.toString() : ''}
            onChangeText={(text) => setAmount(parseFloat(text) || 0)}
            placeholder="Digite o valor"
            keyboardType="numeric"
          />
        </View>

        {/* Payment Method Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Forma de Pagamento:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPaymentMethod}
              onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma forma de pagamento" value="" />
              {paymentMethods.map((method) => (
                <Picker.Item key={method.id} label={method.name} value={method.id} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Payment Info Bar */}
        <View style={styles.paymentInfoBar}>
          <Text style={styles.paymentInfoText}>{getInstallmentText()}</Text>
        </View>

        {/* Results */}
        {amount > 0 && selectedPaymentMethod && (
          <View style={styles.results}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Valor Original:</Text>
              <Text style={styles.resultValue}>{formatCurrency(amount)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total a Pagar:</Text>
              <Text style={styles.totalValue}>{formatCurrency(totalClientPays)}</Text>
            </View>
            {totalClientPays > amount && (
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Juros:</Text>
                <Text style={styles.interestValue}>
                  {formatCurrency(totalClientPays - amount)}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    padding: 24,
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  picker: {
    height: 50,
  },
  paymentInfoBar: {
    backgroundColor: '#fbbf24',
    padding: 12,
    alignItems: 'center',
  },
  paymentInfoText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  results: {
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    color: '#6b7280',
  },
  resultValue: {
    fontWeight: '600',
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#059669',
  },
  interestValue: {
    fontWeight: '600',
    color: '#dc2626',
  },
});