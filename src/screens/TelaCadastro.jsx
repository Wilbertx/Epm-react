import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { auth, db } from "../config/firebase";
import styles from "../utils/styles";
export default function TelaCadastro() {
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState ("")
    const [email, setEmail] = useState ("")
    const [confirmarEmail, setConfirmarEmail] = useState ("")
    const [senha, setSenha] = useState ("")
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [error, setError] = useState(
        {
            padrao: false,
            cidade: false,  
            email: false,
            senha: false,
            confirmarSenha: false,
          }
        );

    function userRegister() {
        console.log("Realizando o Registro do Usuário")
        if (checkPasswordsMatch()) {
            console.log("As senhas estão corretas!")
        }   else {
            console.log("As senhas não estão corretas!");
        } 
        if (checkPasswordsLenght()) {
            console.log("Senha muito grande!")
        } else {
            console.log("Senha muito pequena!")
        }

        registerUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log(userCredential, "Usuário registrado!");

        const userUID = userCredential.user.uid;

        const collectionRef = doc(db, "usuarios", userUID);

        const dadosParaInserir = {
          nomeDaPessoa: nome,
          cidadeDaPessoa: cidade,
          emailDaPessoa: email,
          userUID: userUID
        }

        const docRef = setDoc(collectionRef, dadosParaInserir)
          .then((docRef) => {
            console.log("Documento inserido com sucesso: ", docRef);
            navigation.navigate("LoginScreen");
          })
          .catch((error) => {
            console.log("Erro ao inserir o documento: ", error);
          });
      })
    }   

}