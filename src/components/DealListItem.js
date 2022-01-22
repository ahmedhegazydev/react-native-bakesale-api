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
  Animated,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import Swiper from 'react-native-swipe-image';

// import getPriceDisplay from './utils';

const DealsListItem = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const deal = props.dealItem;

  const onItemClick = () => {
    //console.log('on item clicking');
    // console.log('on item clicking', deal.title);
    props.onDealItemClick({deal});
  };

  return (
    <Animated.View
    // transform={[props.scale]}
    >
      <TouchableOpacity onPress={onItemClick}>
        <View style={styles.border}>
          <Image
            style={{
              width: windowWidth - 24.5,
              height: 300,
              // marginRight: 20,
              borderRadius: 13,
              overflow: 'hidden',
            }}
            source={{
              // uri: deal.media[0],
              uri: deal.img,
            }}
          />

          <Text style={{padding: 8, fontWeight: '600'}}>
            {/* {deal.title} */}
            {deal.category}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{padding: 0, fontWeight: '200'}}>
              {/* {deal.cause.name} */}
              {deal.name}
            </Text>
            <Text style={{padding: 0, fontWeight: '200'}}>
              {/* {getPriceDisplay(deal.price)} */}
              {/* {deal.price / 100}$ */}
              {deal.birthday}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default DealsListItem;
