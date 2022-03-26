import {View, Text, FlatList} from 'react-native';
import React from 'react';
import ToolCard from '../components/common/ToolCard';

const data = [
  {
    id: 1,
    title: 'Self-guided ERP exercises',
    desc: 'Identify an obsession and create your own exposure',
    icon: require('../assets/icons/plant.png'),
    color: '#FFF5F3',
  },
  {
    id: 2,
    title: 'SOS episodes',
    desc: 'Depression guidance for help in the moment',
    icon: require('../assets/icons/encrypted.png'),
    color: '#F1F8FF',
  },
];

const Tools = () => {
  return (
    <>
      <FlatList
        data={data}
        style={{margin:10,backgroundColor:'white',flex:1}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ToolCard
            title={item.title}
            descp={item.desc}
            image={item.icon}
            color={item.color}
          />
        )}
      />
    </>
  );
};

export default Tools;
