import React from 'react';
import {NavigatorIOS} from 'react-native';
import {Button,View,Text,Form, Item, Input, Label} from 'native-base';
import LoginView from './View/LoginView'
class Route extends React.Component {
    render(){
        return(
            <NavigatorIOS
                initialRoute={{
                    component:LoginView,
                    title:'login',
                }}
                style={{flex:1}}
            />
        )
    }
}
export default Route