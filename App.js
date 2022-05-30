import React,{useState,useCallback} from 'react';
import axios from 'axios';
import{
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ActivityIndicator,
}from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  appbar:{
    fontSize:25,
    color:'#fff',
    fontWeight:'500'
  },

  textInput: {
    // borderBottomWidth: 3,
    // padding: 5,
    // paddingVertical: 20,
    // marginVertical: 100,
    // marginHorizontal: 10,
    backgroundColor: 'transparent',
    fontSize: 19,
    marginLeft:10,
    borderWidth:1,
    borderRadius:20,
    padding:10,
    borderColor:'#fff',
    marginRight:10,
    marginTop:10
    
    // fontWeight: '300',
    // borderRadius: 16,
    // borderBottomColor: '#df8e00',
  },

  cityCountryText: {
    fontFamily:'Poppins-Regular',
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    // marginLeft:10,
  },

  infoView: {
    marginLeft:10,
    flex:2,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  infoView2: {
    marginLeft:10,
    flex:3,
    alignItems:'flex-start',
    justifyContent:'flex-end'
  },

  dateText: {
    color: '#fff',
    fontSize: 17,
  },
  tempText: {
    fontSize: 80,
    color: '#fff',
    

    // marginVertical: 1,
  },
  minMaxText: {
    fontSize: 20,
    color: '#fff',
    marginLeft:5,
    marginVertical: 10,
    fontWeight: '500',
    marginTop:-10
  },
});

const App = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = {
    key: 'b31b5c821f9eb227063cd2e4395d03b3',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input, api.key]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/cloudy.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={{ flex:1,}}>
          <View style={{backgroundColor:'transparent',height:"40%",width:"100%",justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.appbar}>WeatherApp</Text>
            </View>
          <TextInput
            
            
            placeholder="search city"
            style={styles.textInput}
            onChangeText={text => setInput(text)}
            placeholderTextColor={'white'}
            onSubmitEditing={fetchDataHandler}
            value={input}
          />
        </View>

        {loading && (
          <View>
            <ActivityIndicator size={'large'} color={'#fff'} />
          </View>
        )}
        {data && (
          <View style={styles.infoView}>
           
            <Text
              style={
                styles.cityCountryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
           
            
        
            
            
       
          </View>
        )}
        {data && (
          <View style={styles.infoView2}>
           
       
         
          
          <Text style={styles.tempText}>{`${Math.round(
            data?.main?.temp,
          )} °C`}</Text>
          <Text style={styles.minMaxText}>{`Min ${Math.round(
            data?.main?.temp_min,
          )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
      
          
          
     
        </View>
        )}
      </ImageBackground>
    </View>
  );
};
export default App;