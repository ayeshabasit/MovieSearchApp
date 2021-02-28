// The page for the details from a specific movie

import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



const MoviePage = ({ route, navigation }) => {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState([]);

  const fetchMovieDetails=()=>{
    var fetchQuery = 'http://www.omdbapi.com/?apikey=248c22d1&i=' + imdbID;
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
        setMovie(myJson)
      });
  }

  // Fetch movie details on 'mount'
  useEffect(() => {
   fetchMovieDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      	{ `${movie.Title}` }
      </Text>
      <Text style={styles.YRR}>
        { `${movie.Year}` }
        {"   "}
        ·
        {"   "}
        { `${movie.Rated}` }
        {"   "}
        ·
        {"   "}
        { `${movie.Runtime}` }
      </Text>
      <Text style={styles.ratings}>
      	⭐
        {" "}
        { `${movie.imdbRating}` }/10 
        {"  "}
        ·
        {"  "}
        { `${movie.imdbVotes}` }   
      </Text>
      <Image
        style={styles.poster}
        source={{
            uri: movie.Poster
          }}
        />       

      <Text style={styles.plot}>
        { `${movie.Plot}` }       
      </Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#303337",
    padding:25,
	flexDirection: 'column',
  },
  title: {
    bottom:10,
  	fontSize: 30,
  	color: "white",
  	textAlign: "center",
	alignContent: 'center',
    flex: 1.6,	
  },
  YRR: {
    flex: 0.5,
  	color: "white",
    padding:5,
    textAlign: "center",
  	bottom:10,
  },
  ratings:{
    flex: 2,
  	color: "white",  	
    padding:5,
    textAlign: "center",
  },
  plot: {
  	color: "white",
  	textAlign: "center",
  	bottom:10,
    flex: 2,	
  },
  poster: {
  	height:500, 
  	resizeMode: 'contain',
  	bottom:60,
    flex: 10,	
  }
});


export default MoviePage;

