import { View, Text ,StyleSheet, Dimensions} from 'react-native'
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import {useNavigation} from '@react-navigation/native'
const {width , height}=Dimensions.get('window');


export default function SplashScreen() {
  const navigation = useNavigation();

  const handleDone = ()=>{
    navigation.navigate('LogIn')

  }


  return (
    <View style={style.container}>
      <Onboarding
      bottomBarHighlight={false}
      onDone={handleDone}
      onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#2A229A',
            image:  (
              <View style={style.lottie}>
                <Image source={require('../assets/images/teamwork.png')} />
                
              </View>
            ),
            title: 'new here',
            subtitle: 'sign up and discover more',
          },
          {
            backgroundColor: '#F9A826',
            image: (
              <View style={style.lottie}>
               {/*<LottieView source={require('../assets/animations/man-repairing-motherboard.json')} autoPlay loop />*/} 
                <Image source={require('../assets/images/developer-team.png')} />
              </View>
            ),
            title: 'already have an account',
            subtitle: 'log in and discover more',
          },
          {
            backgroundColor: '#2A229A',
            image: (
              <View style={style.lottie}>
                <Image source={require('../assets/images/solved-the-problem.png')} />

              </View>
            ),
            title: 'first time ',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  lottie: {
    width: width* 0.,
    height: width,
    marginRight:500,
  }
});