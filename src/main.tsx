@@ .. @@
 import React from 'react'
 import ReactDOM from 'react-dom/client'
 import App from './App.tsx'
 import './index.css'
+import { defineCustomElements } from '@ionic/pwa-elements/loader';
+
+// Call the element loader after the platform has been bootstrapped
+defineCustomElements(window);