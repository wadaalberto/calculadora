@@ .. @@
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat('pt-BR', {
       style: 'currency',
       currency: 'BRL'
     }).format(value);
   };
 
+  const getInstallmentText = () => {
+    if (!selectedPaymentMethod || amount === 0) {
+      return 'Forma de Pagamento:';
+    }
+
+    const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
+    if (!method || method.installments === 1) {
+      return 'Forma de Pagamento:';
+    }
+
+    const installmentValue = totalClientPays / method.installments;
+    return `Pagamento em ${method.installments}X de ${formatCurrency(installmentValue)}`;
+  };
+
   return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
@@ .. @@
         </div>
 
         {/* Payment Info Bar */}
         <div className="bg-yellow-400 text-black text-center py-3 px-4 font-semibold">
-          Forma de Pagamento:
+          {getInstallmentText()}
         </div>