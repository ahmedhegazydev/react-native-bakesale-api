import React, {useEffect, useState, createRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import DelayInput from 'react-native-debounce-input';

const SearchBarInput = () => {
  const [text, onChangeText] = useState(null);
  const [value, setValue] = useState('Have');
  const inputRef = createRef();

  return (
    <View
      styles={
        {
          // flex: 1,
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          // flexWrap: 'wrap',
        }
      }>
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search All Deals"
        // keyboardType="numeric"
      /> */}
      <DelayInput
        value={value}
        minLength={3}
        inputRef={inputRef}
        onChangeText={setValue}
        delayTimeout={500}
        style={{margin: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
      />
      <Text>value: {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchBarInput;
