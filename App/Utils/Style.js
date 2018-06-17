/**
 * Kevin Chang
 * (c) 06/2018
 */

 import { StyleSheet } from 'react-native';

export default StyleSheet.create({
           container: {
               flex: 1,
               justifyContent: 'center',
               backgroundColor: '#EEEEEE'
           },
           scrollContainer: {
               flex: 1,
           },
           scrollText: {
               color: 'black',
               fontSize: 18,
           },
           btn: {
               borderRadius: 30,
               width: 60,
               height: 60,
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: 'rgba(0,0,0,0.7)',
           },
           btnImage: {
               resizeMode: 'contain',
               width: '100%',
               tintColor: 'white'
           },
           icon: {
               width: 24,
               height: 24,
           }
       });

