import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export default function Counter(props) {

    let done = false;

    useEffect(() => {

        const timer = setInterval(() => {
            props.setSeconds(props.seconds - 1);

            if (props.seconds <= 0) {
                if (props.minutes > 0) {
                    props.setMinutes(minutes - 1);
                    props.setSeconds(59);
                } else {
                    if (!done) {
                        done = true;
                        props.setState('select');
                        props.setMinutes(0);
                        props.setSeconds(1);
                        playAudio();
                        alert('Finish.');
                    }
                }
            }


        }, 1000);

        return () => clearInterval(timer);


    });

    async function playAudio() {
        let alarm;
        props.alarms.map(function (val) {
            if (val.select) {
                alarm = val.file;
            }
        })
        const { sound } = await Audio.Sound.createAsync(alarm);
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
        });
        await sound.playAsync();

    }


    function reset() {
        props.setState('select');
        props.setMinutes(0);
        props.setSeconds(1);
    }

    var sec = formatNumber(props.seconds);
    var min = formatNumber(props.minutes);

    function formatNumber(number) {
        var finalNumber = "";
        if (number < 10) {
            finalNumber = "0" + number;
        } else {
            finalNumber = number;
        }
        return finalNumber;
    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <LinearGradient colors={['rgba(59,29,105,1)', 'rgba(59,29,105,0.4)']} style={styles.background} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.counter}>{min} : </Text>
                <Text style={styles.counter}>{sec}</Text>
            </View>
            <TouchableOpacity onPress={() => reset()} style={styles.btnReset}>
                <Text style={{ textAlign: 'center', color: 'white', paddingTop: 30 }}>Resetar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
    counter: {
        paddingTop: 60,
        color: 'white',
        fontSize: 40
    },
    btnReset: {
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
})