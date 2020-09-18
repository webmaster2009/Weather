/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { createRef, RefObject } from "react";

import {
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  ImageRequireSource,
  ActivityIndicator,
  View,
  TextInput,
} from "react-native";

import { BackgroundImage } from "./components/BackgroundImage";
import { SearchInput } from "./components/SearchInput";
import { getImageForWeatherState, fetchLocationId, fetchWeather } from "./utils/utils";

type AppProps = {}
type AppState = {
  loading: boolean
  error: string
  location: string
  temperature: number
  weather: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    // this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      loading: false,
      error: '',
      location: '',
      temperature: NaN,
      weather: '',
    }
  }

  textInputReference: RefObject<TextInput> = createRef<TextInput>()
  
  componentDidMount() {
    this.setState(
      {
        location: "San Francisco",
        weather: "",
        temperature: NaN
      }
    )
  }

  onNewLocation = async (newLocation: string): Promise<void> => {
    try {
      
      this.setState(
        {
          loading: true
        }
      );
      const locationId = await fetchLocationId(newLocation)
      console.log("locationId: " + locationId)
      const weather = await fetchWeather(locationId)
      this.setState(
        {
          loading: false,
          location: weather.location,
          weather: weather.weatherState,
          temperature: weather.temperature
        }
      );
    } catch (e) {
      console.log("error: " + e.message)
      this.setState(
        {
          loading: false,
          location: "San Francisco",
          weather: "",
          temperature: NaN
        }
      )
    }
    this.textInputReference.current?.clear()
  }

  formatTemperature(temperature: number): string {
    if (isNaN(temperature)) return ''
    else return Math.round((temperature * 9 / 5) + 32) + '°F'
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <BackgroundImage
          source={getImageForWeatherState(this.state.weather) as ImageRequireSource}>
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={this.state.loading} color='#888' />
            <Text style={[styles.textStyle, styles.largeText]}>{this.state.location}</Text>
            <Text style={[styles.textStyle, styles.largeText]}>{this.state.weather}</Text>
            <Text style={[styles.textStyle, styles.largeText]}>{this.formatTemperature(this.state.temperature)}</Text>
            <Text style={[styles.textStyle, styles.largeText]}>{this.state.error}</Text>
            <SearchInput
              placeholder='Search any City'
              submitCallback={this.onNewLocation}
              inputReference={this.textInputReference}
            />
          </View>
        </BackgroundImage>

      </>

    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'black',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;
