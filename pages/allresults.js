// All the results from a specific search string here 

import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";


const AllResultsPage = ({ route, navigation }) => {
  const [movies, setMovies] = useState([]);  
  const { AllQuery } = route.params;  

  const fetchMovies=()=>{
  	var movieListOne;
  	var movieListTwo;
    var fetchQuery = 'http://www.omdbapi.com/?apikey=248c22d1&s=' + AllQuery;
    fetch(fetchQuery
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        movieListOne = myJson.Search;
      });
    fetchQuery = 'http://www.omdbapi.com/?apikey=248c22d1&page=2&s=' + AllQuery;    
    fetch(fetchQuery
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        movieListTwo = movieListOne.concat(myJson.Search);
        setMovies(movieListTwo)
      });

  }

  // Fetch movie details on 'mount'
  useEffect(() => {
   fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image
        style={{height:130, width:80, resizeMode: 'contain'}}
        source={{
            uri: item.Poster
          }}
        /> 
      <View style={{padding:10, flex:1}}>     
        <Text 
            style={{fontWeight:"bold", fontSize: 17, color:"white"}}
            onPress={() => {
            	navigation.navigate('Movies', {imdbID: `${item.imdbID}`});
            }}
        >
          {`${item.Title}`}
        </Text>
        <Text style={{color:"white"}}>{`${item.Year}`}</Text>
        <Text style={{color:"white"}}>{`${item.Type}`}</Text>
       </View>
    </View>
  );

  ItemSeprator = () => <View style={{
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.5)",
  }} />


  return (
    <View style={{backgroundColor:"#303337"}}>
      <FlatList 
        data={movies}
        keyExtractor = {(i)=>i.imdbID}
        renderItem = {renderItem} 
        ItemSeparatorComponent={this.ItemSeprator}
      />
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303337",
  },
  listItem:{
    margin:5,
    padding:5,
    backgroundColor:"#303337",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});


export default AllResultsPage;
