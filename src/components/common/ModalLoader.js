import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import {CustomText} from '.';
function ModalLoader() {
    const {modalBackground, activityIndicatorContainer} = styles
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View
        style={modalBackground}>
        <View
          style={activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#1B5ADE" />
          <CustomText
            textColor="#1B5ADE"
            textWeight={600}
            text="Uploading..."
            textSize={16}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles= {
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040',
      },
      activityIndicatorContainer: {
        backgroundColor: 'white',
        height: 120,
        width: 120,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:15,
      },
}
export {ModalLoader}
