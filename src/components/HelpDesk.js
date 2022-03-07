import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CustomText} from './common';
import React from 'react';

const HelpDesk = () => {
  const {
    screen,
    containerOne,
    containerTwo,
    containerTwoSubOne,
    containerTwoSubTwo,
    containerThree,
  } = styles;
  return (
    <ScrollView  showsVerticalScrollIndicator>
      <View style={screen}>
        <View style={containerOne}>
          <CustomText
            text={'Step Up Step Forward and Report Bullying'}
            textAlign={'center'}
            textSize={20}
            textWeight={900}
            textColor={'#F473B9'}
          />
          <TouchableOpacity>
            <CustomText
              style={{marginTop: 10}}
              text={'Report Here'}
              textAlign={'center'}
              textSize={15}
              textWeight={200}
              textColor={'#FFDDEE'}
            />
          </TouchableOpacity>
        </View>
        <View style={containerTwo}>
          <View style={containerTwoSubOne}>
            <CustomText
              text={'Depression is Real! Come And Talk about it'}
              textAlign={'center'}
              textSize={20}
              textWeight={900}
              textColor={'#D18CE0'}
            />
            <TouchableOpacity>
              <CustomText
                style={{marginTop: 10}}
                text={'Click for resources'}
                textAlign={'center'}
                textSize={15}
                textWeight={200}
                textColor={'#ECA6A6'}
              />
            </TouchableOpacity>
          </View>

          <View style={containerTwoSubTwo}>
            <CustomText
              text={'Listen to the experts and fight your depression'}
              textAlign={'center'}
              textSize={20}
              textWeight={900}
              textColor={'#FFB2A6'}
            />
            <TouchableOpacity>
              <CustomText
                style={{marginTop: 10}}
                text={'Learn More'}
                textAlign={'center'}
                textSize={15}
                textWeight={200}
                textColor={'#FF8AAE'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={containerThree}>
          <CustomText
            text={'Todays News Letter- Is Social Media the real evil?'}
            textAlign={'center'}
            textSize={25}
            textWeight={700}
            textColor={'#008E89'}
          />
          <TouchableOpacity>
            <CustomText
              style={{marginTop: 10}}
              text={'Read here'}
              textAlign={'center'}
              textSize={20}
              textWeight={200}
              textColor={'#085E7D'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
  },
  containerOne: {
    backgroundColor: '#0E3EDA',
    width: '80%',
    height: 140,
    margin: 15,
    padding: 10,
    paddingTop: 30,
    borderRadius: 10,
    elevation: 5,
  },
  containerTwo: {
    flexDirection: 'row',
  },
  containerTwoSubOne: {
    backgroundColor: '#E2DEA9',
    width: '38%',
    height: 180,
    margin: 15,
    padding: 10,
    paddingTop: 30,
    borderRadius: 10,
    elevation: 5,
  },
  containerTwoSubTwo: {
    backgroundColor: '#9ADCFF',
    width: '38%',
    height: 180,
    margin: 15,
    padding: 10,
    paddingTop: 30,
    borderRadius: 10,
    elevation: 5,
  },
  containerThree: {
    backgroundColor: '#FFD32D',
    width: '80%',
    height: 170,
    margin: 15,
    padding: 10,
    paddingTop: 30,
    borderRadius: 10,
    elevation: 5,
  },
});

export default HelpDesk;
