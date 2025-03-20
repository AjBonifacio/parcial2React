//
import { Stack } from "expo-router";
import { SQLiteDatabase,SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";


const CreateDb = async (database: SQLiteDatabase) => {
    console.log("DB create");
    try {
      const response = await database.execAsync(
        "CREATE TABLE IF NOT EXISTS emergencia1 (id INTEGER PRIMARY KEY AUTOINCREMENT, Titulo TEXT, descripcion TEXT, fecha TEXT,image TEXT)"
      );
      console.log("Db creada: ", response);
    } catch (error) {
      console.log("Error al crear la DB:", error);
    }
  };

//2023-0939

  export default function App() {
    return (
        <>
      <SQLiteProvider databaseName="emergey.db" onInit={CreateDb}> {/* Asegúrate de envolver toda la aplicación */}
        <Stack>
          
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
        
      </SQLiteProvider>
    <StatusBar style="auto" />
    </>

    );
  }