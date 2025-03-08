import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Label } from './Label';

const ToggleInput = ({initialEnabled=false, onChange=(enabled)=>null, labels=['Pago', 'Em aberto']}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  useEffect(() => {
    if(initialEnabled === true)
      setIsEnabled(true);
  }, []);

  const toggleSwitch = () => {
    onChange(!isEnabled);
    
    setIsEnabled(!isEnabled);
  }

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#efefef', true: 'green' }}
        thumbColor={'#fff'}
        ios_backgroundColor="transparent"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Label value={isEnabled === true ? labels[0] : labels[1]}
          style={styles.lbl}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lbl:{
    fontSize:10
  },
});

export default ToggleInput;