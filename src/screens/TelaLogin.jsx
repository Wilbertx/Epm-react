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

      return (
        <View style={styles.container}>
          <Paragraph>Faça o seu Login</Paragraph>
          <HelperText type="error"> {error} </HelperText>
          <View style={styles.maxWidth}>
            <Paragraph>E-mail</Paragraph>
    
              <TextInput
                mode="outlined"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                style={styles.maxWidth}
              />
          </View>
          <View style={styles.maxWidth}>
            <Paragraph>Senha</Paragraph>
            <TextInput
              mode="outlined"
              placeholder="Digite sua Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={passwordVisible}
              style={styles.maxWidth}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye" : "eye-off"}
                  size={20}
                  style={{ marginRight: 10 }}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
          </View>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ marginTop: 20 }}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                Registrar
              </Button>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button mode="contained" onPress={handleRegister}>
                Acessar
              </Button>
            </View>
          </View>
        </View>
      );
    }

}