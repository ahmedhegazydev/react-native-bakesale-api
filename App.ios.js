/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ajax from './src/ajax';
import DealsList from './src/components/DealList';
import DealsListItem from './src/components/DealListItem';
import NetInfo from '@react-native-community/netinfo';
// import {NetInfo} from 'react-native';

// class App extends React.Component {
//   componentDidMount() {
//     fetchInitialDeals();
//   }
//   render() {
//     return <View></View>;
//   }
// }

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const fetchInitialDeals = async () => {
  //   try {
  //     const response = await fetch(apiHost + 'api/deals');
  //     const json = await response.json();
  //     return json;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const json = ajax.fetchInitialDeals();
    // console.log(json);
    // setData(json);

    fetch('https://bakesaleforgood.com/api/deals')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    unsubscribe();

    // NetInfo.fetch().then(state => {
    //   console.log('Connection type', state.type);
    //   console.log('Is connected?', state.isConnected);
    // });
  }, []);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1, padding: 0}}>
        {isLoading ? (
          // <Text>Loading...</Text>
          <ActivityIndicator />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, color: 'green', textAlign: 'center'}}>
              {data.title}
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                color: 'green',
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              Articles:
            </Text> */}
            <FlatList
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                // <Text>{item.title}</Text>
                <DealsListItem dealItem={item} />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
