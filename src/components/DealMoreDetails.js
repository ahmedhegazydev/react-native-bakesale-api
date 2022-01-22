import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-image-avatars';

// import {CardView} from 'react-native-cardview';
import {AwesomeCard} from 'react-native-awesome-card';

const apiHost = 'https://www.breakingbadapi.com/';
// const apiHost = 'https://bakesaleforgood.com/';

// const endPointList = "api/deals"
const endPointList = 'api/characters';

const endPontSearch = endPointList + '?searchTerm';
const endPointSearch = endPointList + '?name=';

const DealDetails = ({route, navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const deal = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // const json = ajax.fetchInitialDeals();
    // console.log(json);
    // setData(json);

    // fetch(apiHost + endPointList + '/' + deal.key)
    //   .then(response => response.json())
    //   .then(json => setData(json))
    //   .catch(error => console.error(error))
    //   .finally(() => setLoading(false));

    fetch(apiHost + endPointList + '/' + deal.char_id)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{padding: 10}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{}}>
        <View style={styles.border}>
          <Image
            style={{width: windowWidth - 22, height: 300}}
            source={{
              // uri: deal.media[0],
              uri: deal.img,
            }}
          />

          <Text
            style={{padding: 8, fontWeight: '600', backgroundColor: 'brown'}}>
            {/* {deal.title} */}
            {deal.category}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  marginTop: 20,
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{padding: 0, fontWeight: '500', fontSize: 15}}>
                  {/* {deal.price / 100}$ */}
                  {deal.birthday}
                </Text>
                <Text style={{padding: 0, fontWeight: '300', fontSize: 15}}>
                  {/* {deal.cause.name} */}
                  {deal.name}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  marginTop: 20,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <View>
                    <Avatar
                      // imageUrl={data.user.avatar}
                      imageUrl={deal.img}
                      size="small"
                      borderColor="#f2f2f2"
                      shadow
                    />
                    <Text style={{padding: 0, fontWeight: '300', fontSize: 15}}>
                      {/* {data.user.name} */}
                      {/* {data.occupation.length > 0 ? data.occupation[0] : ''} */}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
              <Text>Elevation 0</Text>
            </CardView> */}
            <AwesomeCard>
              <View>
                <Text>
                  {/* {data.description} */}
                  {deal.nickname}
                </Text>
              </View>
            </AwesomeCard>
          </View>
        </View>
      </ScrollView>
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

export default DealDetails;
