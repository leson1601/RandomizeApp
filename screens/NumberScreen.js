import { View, Text, Pressable, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import Checkbox from 'expo-checkbox';
import { generateRandomNumbers } from '../utils/randomNumber';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { ToastAndroid } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
const NumberScreen = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [resultQuantity, setResultQuantity] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const [randNumbers, setRandNumbers] = useState();


  const onPressGenerate = () => {
    if (min >= max) {
      Alert.alert("Error", "Minimum number must smaller than maximum number!");
    } else {
      const generatedNumbers = generateRandomNumbers(min, max, resultQuantity, isChecked);
      setRandNumbers(generatedNumbers);
    }
  };

  const onPressCopy = async () => {
    if (randNumbers && randNumbers.text) {
      await Clipboard.setStringAsync(randNumbers.text);
      ToastAndroid.show('Copied to clipboard!', 0.2);
    }
    else {
      ToastAndroid.show('Copied to clipboard!', 0.2);

    }
  };

  return (

    <View className="p-5  flex-col flex-1 ">

      <View className="flex-row border-b pb-6 space-x-8">
        <View className="items-center space-y-2 flex-1">
          <TextInput keyboardType='numeric' className="border w-full rounded-md text-2xl p-2" textAlign={'center'} maxLength={10} value={min.toString()} onChangeText={(text) => setMin(+text.replace(/[^0-9]/g, ''),)} />
          <Text className="text-xl text-center">Min</Text>
        </View>
        <View className=" items-center space-y-2 flex-1">
          <TextInput keyboardType='numeric' className="border w-full rounded-md text-2xl p-2" textAlign={'center'} maxLength={10} value={max.toString()} onChangeText={(text) => setMax(+text.replace(/[^0-9]/g, ''),)} />
          <Text className="text-x">Max</Text>
        </View>
      </View>
      <View className="py-6 border-b">
        <Text className="text-xl">Number of results: {resultQuantity} {typeof resultQuantity} </Text>
        <View className="flex-row justify-between items-center px-8">
          <Text className="text-xl">1</Text>
          <View className="flex-1 mx-4">
            <Slider
              value={resultQuantity}
              onValueChange={value => {
                console.log(value , value == 1);
                setResultQuantity(value);
              }}
              minimumValue={1}
              maximumValue={10}
              step={1}
            />
          </View>
          <Text className="text-xl">10</Text>
        </View>
      </View>
      <View className="pt-6 flex-row justify-between items-center">
        <Text className="text-xl">Repetitions</Text>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#F97B22' : undefined}
          className="h-8 w-8 rounded-md"
        />
      </View>

      {/* Generated Numbers */}
      <View className="flex-1 mt-8 bg-white rounded-lg">

        <Pressable className="items-end mt-2 mr-2 w-16 self-end"
          onPress={onPressCopy}>
          <View>
            <Ionicons name="copy" size={44} color="#F97B22" />
          </View>

        </Pressable>

        <View className="justify-center items-center flex-1">
          {
            randNumbers &&
            <View>
              <Text className="px-2 text-4xl font-bold text-center text-[#F97B22]">{randNumbers.text}</Text>

              {resultQuantity != 1 && <Text className="px-2 text-base font-bold text-center text-slate-400">Sum: {randNumbers.sum}</Text>}
              {resultQuantity != 1 && <Text className="px-2 text-base font-bold text-center text-slate-400">Average: {randNumbers.average}</Text>}
            </View>
          }
        </View>
      </View>

      <View className="pb-5">
        <Pressable className="px-4 py-3 rounded-2xl bg-[#F97B22] flex-row items-center justify-center space-x-2"
          onPress={onPressGenerate}>
          <View>
            <FontAwesome5 name="random" size={24} color="white" />
          </View>
          <Text className="text-white text-2xl">Generate Numbers</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NumberScreen;