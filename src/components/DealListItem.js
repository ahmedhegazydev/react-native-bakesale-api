import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
} from 'react-native';

const DealsListItem = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const deal = props.dealItem;

  return (
    <View style={styles.border}>
      <Image
        style={{width: windowWidth, height: 300}}
        source={{
          uri: deal.media[0],
        }}
      />

      <Text style={{padding: 8, fontWeight: '600'}}>{deal.title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={{padding: 0, fontWeight: '200'}}>{deal.cause.name}</Text>
        <Text style={{padding: 0, fontWeight: '200'}}>{deal.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },

  border: {
    borderColor: 'black',
    // borderBottomWidth: 2,
    // borderTopWidth: 2,
    borderWidth: 2,
    marginBottom: 7,
  },
});

export default DealsListItem;
