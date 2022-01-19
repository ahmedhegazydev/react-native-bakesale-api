const apiHost = 'https://bakesaleforgood.com';
import React from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

export default {
  fetchInitialDeals: async () => {
    try {
      const response = await fetch(apiHost + '/api/deals', {
        // method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({
        //   firstParam: 'yourValue',
        //   secondParam: 'yourOtherValue',
        // }),
      });
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  },
};
