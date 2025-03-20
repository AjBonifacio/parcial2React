import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventoModel() {
  const { id } = useLocalSearchParams();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [image, setImage] = useState("");

  const database = useSQLiteContext();


  React.useEffect(() => {
    if (id) {
      // if id is present,
      loadData();
    }
  }, [id]);

  
  const loadData = async () => {
    const result = await database.getFirstAsync<{
      id: number;
      titulo: string;
      descripcion: string;
      fecha: string;
      image : string;
    }>(`SELECT * FROM users WHERE id = ?`, [parseInt(id as string)]);
    setTitulo(result?.Titulo!);
    setDescripcion(result?.descripcion!);
    setFecha(result?.fecha!);
    setImage(results?.image!);
  };

  const handleSave = async () => {
    try {
      const response = await database.runAsync(
        "INSERT INTO emergencia1 (Titulo, descripcion, fecha, image) VALUES (?, ?, ?,?)",
        [titulo, descripcion, fecha,image]
      );
      console.log("Se guardó la emergencia en la base de datos:", response);
      router.back();
    } catch (error) {
      console.error("Ocurrió un error al guardar:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Nuevo Evento" }} />

      <View>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={fecha}
          onChangeText={setFecha}
        />
         <TextInput
                  style={styles.input}
                  placeholder="URL"
                  value={image}
                  onChangeText={setImage}
          />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
