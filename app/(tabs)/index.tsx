import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, TouchableOpacity, FlatList,Image } from "react-native";

export default function tabHome() {
  const [data, setData] = useState<
    { id: number;Titulo: string; descripcion: string; fecha: string; image:string }[]
  >([]);

  const database = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const headerRight = () => (
    <TouchableOpacity
       onPress={() => router.push("/modal")}>
      <Text style={{ color: "#007bff", fontWeight: "bold" }}>Agregar</Text>
    </TouchableOpacity>
  );

  const loadData = async () => {
    try {
      const result = await database.getAllAsync<{
        id: number;
        Titulo: string;
        descripcion: string;
        fecha: string;
        image : string;
      }>("SELECT * FROM emergencia1");
      setData(result);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f8f9fa" }}>
      <Stack.Screen options={{ headerRight }} />
      <FlatList
        data={data}
        renderItem={({
          item,
         }: {
           item: {id: number; Titulo: string; descripcion: string; fecha: string; image: string}}
        ) => (
          <View style={{ 
            padding: 10, 
            marginVertical: 5, 
            backgroundColor: "white", 
            borderRadius: 5, 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.Titulo}</Text>
              <Text style={{ fontSize: 14, color: "#6c757d" }}>{item.descripcion}</Text>
              <Text style={{ fontSize: 12, color: "#adb5bd" }}>{item.fecha}</Text>
            </View>
          
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
                resizeMode="cover"
              />
            )}
          </View>
        )}
      />
    </View>
  );
}