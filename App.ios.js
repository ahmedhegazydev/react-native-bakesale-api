/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState, createRef, useRef} from 'react';
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
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DelayInput from 'react-native-debounce-input';
// import VegaScrollList from 'react-native-vega-scroll-list';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ajax from './src/ajax';
import DealsList from './src/components/DealList';
import DealsListItem from './src/components/DealListItem';
import NetInfo from '@react-native-community/netinfo';
import DealDetails from './src/components/DealMoreDetails';
// import SearchBarInput from './src/components/SearchBarInput';
// import {NetInfo} from 'react-native';

// class App extends React.Component {
//   componentDidMount() {
//     fetchInitialDeals();
//   }
//   render() {
//     return <View></View>;
//   }
// }

const Stack = createNativeStackNavigator();

const apiHost = 'https://www.breakingbadapi.com/';
// const apiHost = 'https://bakesaleforgood.com/';

// const endPointList = "api/deals"
const endPointList = 'api/characters?limit=10&offset=10';

const endPontSearch = endPointList + 'searchTerm';
const endPointSearch = endPointList + '&name=';

const ITEM_SIZE = 10;

const AllDealsScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [searchTerm, onChangeText] = useState(null);
  const [dataSearch, setDataSearch] = useState([]);

  const [value, setValue] = useState('');
  const inputRef = createRef();

  clearSearch = () => {
    dataSearch = [];
  };

  useEffect(() => {
    // const json = ajax.fetchInitialDeals();
    // console.log(json);
    // setData(json);

    fetch(apiHost + endPointList)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // if (searchTerm) {
    //   fetch(apiHost + 'api/deals?searchTerm' + searchTerm)
    //     .then(response => response.json())
    //     .then(json => setDataSearch(json))
    //     .catch(error => console.error(error))
    //     .finally(() => setLoading(false));
    // }
  }, []);

  const onDealItemClick = ({deal}) => {
    // console.log('on item clicking');
    // navigation.navigate('Details', {deal});
    // let data = {deal: dealItem};
    // console.log(deal.title);
    navigation.push('Details', deal);
  };

  const dealsToDisplay = dataSearch.length > 0 ? dataSearch : data;

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{flex: 1, marginTop: 15, padding: 10, flexDirection: 'column'}}>
      {/* <SearchBarInput searchDeals={dataSearch} /> */}
      <DelayInput
        value={value}
        minLength={3}
        inputRef={inputRef}
        placeholder="Search All Deals"
        onChangeText={text => {
          setValue(text);
          console.log('kkkkkkkk');

          fetch(apiHost + endPointSearch + text)
            .then(response => response.json())
            .then(json => {
              setDataSearch(json);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        }}
        delayTimeout={500}
        style={{
          marginTop: 24,
          marginBottom: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 5,
        }}
      />

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
          {/* <Text style={{fontSize: 18, color: 'green', textAlign: 'center'}}>
            {data.title}
          </Text> */}
          {/* <Text
        style={{
          fontSize: 14,
          color: 'green',
          textAlign: 'center',
          paddingBottom: 10,
        }}>
        Articles:
      </Text> */}
          <Animated.FlatList
            // pagingEnabled={true}
            legacyImplementation={false}
            contentContainerStyle={{
              padding: 0,
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // data={data}
            data={dealsToDisplay}
            keyExtractor={({id}, index) => id}
            renderItem={({item, index}) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });

              return (
                <DealsListItem
                  onDealItemClick={onDealItemClick}
                  dealItem={item}
                  scale={scale}
                  key={index}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{header: () => null}}
          name="Bakesale Deals"
          component={AllDealsScreen}
        />
        <Stack.Screen name="Details" component={DealDetails} />
      </Stack.Navigator>
    </NavigationContainer>
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
