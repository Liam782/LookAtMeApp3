import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {StatusBar} from 'expo-status-bar';
import * as FaceDetector from 'expo-face-detector';

import Filter1 from './Filter1'
import Filter2 from './Filter2'
import Filter3 from './Filter3'
import Filter4 from './Filter4'

let data = [
    {
        "id": "1",
        "image": require('../assets/crown-pic1.png')
    },
    {
        "id": "2",
        "image": require('../assets/crown-pic2.png')
    },
    {
        "id": "3",
        "image": require('../assets/crown-pic3.png')
    },
    {
        "id": "4",
        "image": require('../assets/flower-pic1.png')
    }
]

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            current_filter: "filter_1"
        }

        this.onFacesDetected = this.onFacesDetected.bind(this)
    }

    async componentDidMount() {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasCameraPermission: status === "granted"})
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces })
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }

        return(
            <View style = {styles.container}>
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.title}>Look At Me!</Text>
                    </View>
                </View>

                <View style = {styles.cameraContainer}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />

                    {this.state.faces.map(face => {
                        if (this.state.current_filter === "filter_1") {
                            return <Filter1 key={face.faceID} face={face} />
                        } else if (this.state.current_filter === "filter_2") {
                            return <Filter2 key={face.faceID} face={face} />
                        } else if (this.state.current_filter === "filter_3") {
                            return <Filter3 key={face.faceID} face={face} />
                        } else if (this.state.current_filter === "filter_4") {
                            return <Filter4 key={face.faceID} face={face} />
                        }
                    })}
                </View>
                <View style={styles.framesContainer}>
                    <ScrollView style={{ flexDirection: "row" }} horizontal showsHorizontalScrollIndicator={false}>
                        {
                            data.map(filter_data => {
                                return (
                                    <TouchableOpacity style={styles.filterImageContainer} onPress={() => this.setState({ current_filter: `filter_${filter_data.id}` })}>
                                        <Image source={filter_data.image} style={{ height: 32, width: 80 }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    titleContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#6278e4"
    },

    title: {
        fontSize: RFValue(30),
        fontWeight: "bold",
        color: "#efb141",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },

    cameraContainer: {
        flex: 0.5
    },

    actionPanel: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: "#6278e4"
    },
})