import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Counter from './Counter.js';
import { Audio } from 'expo-av';



export default function App() {
  console.disableYellowBox = true;


  const [state, setState] = useState('select');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);

  const [alarmSound, setAlarmSound] = useState([
    {
      id: 1,
      select: true,
      sound: 'alarm 1',
      file: require('./assets/alarme1.mp3')
    },
    {
      id: 2,
      select: false,
      sound: 'alarm 2',
      file: require('./assets/alarme2.mp3')
    },
    {
      id: 3,
      select: false,
      sound: 'alarm 3',
      file: require('./assets/alarme3.mp3')
    }
  ])

  var number = [];
  for (var i = 1; i <= 60; i++) {
    number.push(i);
  }

  function alarmChoice(id) {
    let alarmTemp = alarmSound.map(function (val) {
      if (id != val.id)
        val.select = false;
      else
        val.select = true;
      return val;
    })
    setAlarmSound(alarmTemp);
  }


  if (state == 'select') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          
          colors={['rgba(59,29,105,1)', 'rgba(59,29,105,0.4)']}
          style={styles.background}
        />
        <Text style={{ color: 'white', fontSize: 30 }}>Selecione o seu tempo</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, color: 'white', padding: 13 }}>Min:</Text>
          <Picker
            style={{ height: 50, width: 100, color: 'white' }}
            selectedValue={minutes}
            onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)
            }>
            < Picker.Item label='0' value='0' />
            {
              number.map(function (val) {
                return (
                  < Picker.Item label={val.toString()} value={val.toString()} />
                )
              })
            }
          </Picker>
          <Text style={{ fontSize: 20, color: 'white', padding: 13 }}>Sec:</Text>
          <Picker
            style={{ height: 50, width: 100, color: 'white' }}
            selectedValue={seconds}
            onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)
            }>
            {
              number.map(function (val) {
                return (
                  < Picker.Item label={val.toString()} value={val.toString()} />
                )
              })
            }
          </Picker>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {
            alarmSound.map(function (val) {
              if (val.select) {
                return (
                  < TouchableOpacity onPress={() => alarmChoice(val.id)} style={styles.btnAlarmSelected}>
                    <Text style={{ color: 'white' }}>{val.sound}</Text>
                  </TouchableOpacity>
                )
              } else {
                return (
                  < TouchableOpacity onPress={() => alarmChoice(val.id)} style={styles.btnAlarm}>
                    <Text style={{ color: 'white' }}>{val.sound}</Text>
                  </TouchableOpacity>
                )
              }
            })
          }
        </View>
        <TouchableOpacity onPress={() => setState('initiate')} style={styles.btnInit}>
          <Text style={{ textAlign: 'center', color: 'white', paddingTop: 30 }}>Iniciar</Text>
        </TouchableOpacity>
      </View >
    );
  } else if (state == 'initiate') {
    return (
      <Counter alarms={alarmSound} setState={setState} setMinutes={setMinutes} minutes={minutes} setSeconds={setSeconds} seconds={seconds} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  btnAlarm: {
    padding: 8,
    backgroundColor: 'rgba(116, 67, 191, 0.7)',
    marginRight: 10
  },
  btnAlarmSelected: {
    padding: 8,
    backgroundColor: 'rgb(116, 67, 191)',
    marginRight: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1
  },
  btnInit: {
    padding: 8,
    backgroundColor: 'rgba(116, 67, 191, 0.7)',
    marginRight: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    borderColor: 'white',
    borderWidth: 2
  }
});
