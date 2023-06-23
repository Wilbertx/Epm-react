import { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, HelperText, Paragraph, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "../utils/styles";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState ("");
    const [senha, setSenha] = useState ("");
    const [passwordVisible, setPasswordVisible] = useState (true);
    const [error, setError] = useState ("");

    function loginTela() {
        console.log("Login usuário");

    signInWithEmailAndPassword(auth, email, senha)

      .then((userCredential) => {
   
        console.log(userCredential, "Usuário registrado com sucesso");
        navigation.navigate("MTBNavigation");
      })
      .catch((error) => {
        setError(error.message); // mostra a mensagem original do Firebase
        const errorCode = error.code; // obtém o código de erro do Firebase
        switch (
        errorCode // verifica qual é o código de erro
        ) {
          case "auth/email-already-in-use":
            setError("Esse email já está em uso!"); // mostra uma mensagem humanizada
            break;
          case "auth/invalid-email":
            setError("Esse email não é válido!");
            break;
          case "auth/weak-password":
            setError("Essa senha é muito fraca!");
            break;
          default:
            setError("O email ou senha está incorreto!");
        }
      });
  }

}