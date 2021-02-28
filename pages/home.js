// home page

import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'

import MoviePage from "./movie.js";

const Stack = createStackNavigator();

const HomePage: () => React$Node = ({ navigation }) => {
  const [displayQuery, setDisplayQuery] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  // 
  const fetchMovies = async () => {
      var fetchQuery = 'http://www.omdbapi.com/?apikey=248c22d1&s=' + query;
      const res = await fetch(fetchQuery);
      const json = await res.json();
      setMovies(json.Search);
    };
  // Splash screen
  useEffect(() => {
   SplashScreen.hide();
  }, []);


  // Fetch movie data upon query change (when length is greater than 3)
  useEffect(() => {
   fetchMovies();
  }, [query]);

  // Handles the query to the API
  const updateQuery = (input) => {
    setDisplayQuery(input)
    console.log(input);
    if(input.length >= 3){
      setQuery(input.trim());
    }
  }

  // What each item in the autocomplete list looks like
  // Every time movie is changes, flatlist rerenders
  // Each title is a link to a details page
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
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  }} />


  return (
    <View style={styles.container}>
      <SearchBar
       onChangeText={updateQuery}
       value={displayQuery}   
       placeholder="Search OMDb"/>

      <FlatList 
        data={movies}
        keyExtractor = {(i)=>i.imdbID}
        extraData = {query} 
        renderItem = {renderItem} 
        ItemSeparatorComponent={this.ItemSeprator}
        ListFooterComponent = {query.length>=3 ?  <Button
        	onPress={() => {
        	navigation.navigate('Allresults', {AllQuery: query});
            }}
	       title="See all"
	       color="red"
	      />
       : <></>}         
      />

    </View>
  );
}

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


export default HomePage;
