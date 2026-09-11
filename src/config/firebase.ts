/**
 * @file firebase.ts
 * @description Configuración centralizada de Firebase para el portafolio.
 * En la arquitectura de este proyecto, este archivo actúa como el punto de contacto
 * con los servicios de infraestructura externa (BaaS - Backend as a Service).
 * Inicializa la aplicación y expone las instancias de autenticación, base de datos
 * en tiempo real y Firestore para su uso en los diferentes repositorios y hooks.
 *
 * ¡Excelente estructura, Brandon! Centralizar la configuración de Firebase facilita
 * el mantenimiento y el escalado hacia un sistema multi-entorno de forma limpia.
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Credenciales de configuración del proyecto Firebase.
// Nota de Arquitectura: Estos valores se conectan directamente con la consola de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyACtDBP1lYYnjK1ComumsLXae7XlTrUR_k",
  authDomain: "portafolio-brandon-daza.firebaseapp.com",
  projectId: "portafolio-brandon-daza",
  storageBucket: "portafolio-brandon-daza.firebasestorage.app",
  messagingSenderId: "982333994404",
  appId: "1:982333994404:web:2b177f19264ac7f81ffd31",
  measurementId: "G-JC80EFXL8B",
  databaseURL: "https://portafolio-brandon-daza-default-rtdb.firebaseio.com/"
};

// Inicialización de la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Instancia de Cloud Firestore (Base de datos NoSQL basada en documentos)
export const db = getFirestore(app);

// Instancia de Realtime Database (Ideal para analíticas fluidas en tiempo real)
export const rtdb = getDatabase(app);

// Instancia del servicio de Autenticación de usuarios
export const auth = getAuth(app);
