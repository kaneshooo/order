import React from 'react';
import { StyleSheet,View,Text,Button } from 'react-native';

const TreasurerScreen=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>Treasurer</Text>
            <Button 
                title="会計"
                onPress={()=>{
                    navigation.navigate('会計');
                }}
                />
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
});


export default TreasurerScreen;