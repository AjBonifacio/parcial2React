import React from "react";
import { Image,Text,StyleSheet,View } from "react-native";
import { PaperProvider,Card } from "react-native-paper";

export default function Tabsetting (){
   return(
 <View style={styles.container}>
      <Card style = {styles.card}>
         <Card.Title title="About Me"titleStyle={{alignSelf: 'center'}}/>
         <Card.Content>
            <View>
                <Image style={styles.image} source={require("../../assets/travisMc.jpg")}/>
               <View>
                  <Text style={styles.textName}>Angelo Bonifacio</Text>
                  <Text style={styles.textDesc}>estudiante de desarrollo de software, apacionado por la tecnologia
                  </Text>
               <View style={styles.contact}>
                  <Text style={styles.mail}>angelojose383@gmail.com</Text>
               </View>
               </View>
         </View>
         </Card.Content>  
      </Card>   
  </View>
   );
}


const styles = StyleSheet.create({
     container :{flex:1,padding:20},
     image: {width: 150, height:150,borderRadius: 10,alignSelf:"center"},
     textName: {fontSize:20,textAlign:"justify",color: '#333',marginBottom:20 },
     textDesc: {fontSize:16,textAlign:"justify",color: '#333',marginBottom:20},
     card  : {alignSelf:"center",margin: 10, borderRadius:6,width:400,height:350 },
     contact :{flexDirection:'row',alignSelf:"center"},
     mail :{fontSize: 16, color: '#007AFF', marginLeft: 8}     


})