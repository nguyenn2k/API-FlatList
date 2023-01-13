import { ActivityIndicator, FlatList, StyleSheet, Image, View, Text, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'

const App = () => {
  //Tạo useState():
  //Lúc khởi tạo lên là mảng rỗng:
  const [Data, setData] = useState([]);
  //Ban đầu vào cho nó loading luôn:
  const [isLoading, setisLoading] = useState(true);

  //Refesh API lúc mới mở app:
  useEffect(() => {
    getListPhotos(); //Gọi API
    return () => {
      //Cần dùng khi hủy một sự kiện nào đó
    };
  }, []);

  //Function Request API:
  const getListPhotos = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/photos';
    //request toi server thong qua URL 
    //fetch(yourDomain/api_service)
    fetch(apiURL)
    .then((res) => res.json())
    .then((resJson)=>{
      setData(resJson)
    }).catch((error) =>{ //catch lỗi cho nó:
      console.log('Error: ', error);
    }).finally(()=> setisLoading(false)) //Request API xong ->setLoading(false)
  }
  //Làm lại item: (cuối cùng)
  const renderItem = ({item, index}) =>{
    return(
      <View style={styles.item}>
        <Image
          style = {styles.image}
          source ={{uri: item.url}}
          resizeMode = 'contain'
        />
        <View style={styles.wrapText} >
          <Text>{item.title}</Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style = {styles.container}>
      {/**Giờ làm show cái loading */}
      {/**
       * Nếu bằng true -> hiển thị cái ActivityIndicator;
       * Nếu có data -> hiển thị FlatList;
       */}
      {isLoading ? <ActivityIndicator/>:(
        <FlatList
        style = {styles.list}
        data = {Data}
        renderItem = {renderItem}
        //Phan biet tung cai item tren cai List
        keyExtractor= {item =>  `key-${item.id}`}
      />
      )}
      
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  //////
  container:{
    flex: 1,
  }, 
  list:{
    flex: 1,
    padding: 8,
  }, 
  item:{
    flex: 1,
    marginTop: 8,
    padding: 5,
    shadowColor:'#000',
    shadowRadius:4,
    shadowOpacity:0.25,
  },
  image:{
    width: 100,
    height: 150,
  },
  wrapText:{
    flexDirection: 'row',
    marginTop:16,
    marginLeft:8,
    justifyContent: 'center'
  }
})