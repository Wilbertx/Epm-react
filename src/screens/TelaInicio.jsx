import { Image, Text, View } from "react-native";
import styles from "../utils/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function inicioTela() {
    const [user, setUser] = useState ({});

    useEffect (() => {

    const unsub = onAuthStateChanged(

        auth,

        (user) => {

            if (user) {
            console.log(user)

            setUser({
              userUID: user.uid,
            })
          }
        })

        return () => unsub();
  
    }, []);// graças a este colchete que simboliza a entrada do componente na tela
  
    useEffect(() => {
      // se não houver usuário logado, não faz nada
      if (!user?.userUID) return
  
      // se houver usuário logado, 
      // busca os dados dele no banco de dados
      const docRef = doc(db, "usuarios", user.userUID);

      const docSnap = getDoc(docRef)

      .then((docSnap) => {

        if (docSnap.exists()) {

            const usuario = {
              ...docSnap.data(),
              userUID: user.userUID
            }

            setUser(usuario);

            AsyncStorage.setItem(
              "usuario",
              JSON.stringify(usuario))
              .then(
                () => console.log("Usuário salvo no AsyncStorage")
              )
          } else {
            console.log("Não encontrei o usuário!");
          }
        })
        .catch((error) => {
          console.log("Problemas ao recuperar o usuário:", error);
        });
  
  
      // este colchete escuta a variável user.userUID
    }, [user?.userUID]);
  
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: "https://picsum.photos/300/300",
            }}
            style={styles.image}
          />
        </View>
        <Text>Hola {user?.nomeDaPessoa}, bem vindo ao meu app</Text>
        <Aviso />
      </View>
    );
  }
  
  // é um componente em React Native
  function Aviso() {
    return (
      <View style={{ backgroundColor: "yellow" }}>
        <Text>Oi eu sou um aviso!</Text>
      </View>
    );

}