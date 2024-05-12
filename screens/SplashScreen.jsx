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
            backgroundColor: '#FFFC',
            image:  (
              <View style={style.lottie}>
                <Image source={require('../assets/images/11.png')}
                
                style={{ width: 400, height: 400, marginLeft: 30 }} />
                
              </View>
            ),
            title: 'Empowering collaboration, ',
            subtitle: 'enhancing productivity.',
          },
          {
            backgroundColor: '#FFFC',
            image: (
              <View style={style.lottie}>
               {/*<LottieView source={require('../assets/animations/man-repairing-motherboard.json')} autoPlay loop />*/} 
                <Image source={require('../assets/images/22.png')} 
                style={{ width: 400, height: 400, marginLeft: 40 }} />

              </View>
            ),
            title: 'Where teamwork meets ',
            subtitle: 'efficiency',
          },
          {
            backgroundColor: '#FFFC',
            image: (
              <View style={style.lottie}>
                <Image source={require('../assets/images/33.png')}                
                 style={{ width: 400, height: 400, marginLeft: 30 }} />


              </View>
            ),
            title: 'Your project, ',
            subtitle: ' our passion for collaboration',
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