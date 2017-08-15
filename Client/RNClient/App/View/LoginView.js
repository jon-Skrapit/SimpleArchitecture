import React,{PropTypes} from 'react';
import {Button,View,Text,Form, Item, Input, Label} from 'native-base';
import {Dimensions, Modal, AlertIOS} from 'react-native'
import Realm from '../Services/Realm'
import renderIf from '../Utils/Visibility'
import MainView from './MainView'
import api from '../Services/API'
import CenterSpinner from './CenterSpinner'
const type={
  login:'login',
  register:'register'
}
var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
class LoginView extends React.Component {
  static propTypes={
    navigator: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state={
      username:null,
      password:null,
      token:null,
      type:null,
      logining:false,
    }
  }
  handlerLogin(){
    this.setState({
      type:type.login
    })
  }
  handlerRegister(){
    this.setState({
      type:type.register
    })
  }
  setUsername(text){
    this.setState({
      username:text
    })
  }
  setPassword(text){
    this.setState({
      password:text
    })
  }
  toMainView(props){
    const nextRoute = {
      component:MainView,
      title:'main',
      passProps:{
        ...props
      }
    }
    this.props.navigator.push(nextRoute);
  }
  handlerSubmit(){
    this.setState({logining:true})
    if(this.state.type===type.login){
      api.login(this.state.username,this.state.password)
      .then((response)=>{
        response = response.data
        if(response.success){
          this.setState({token:response.data})
          Realm.getRealm(response.data)
          .then((object)=>{
            this.setState({logining:false})
            this.toMainView({...object,token:this.state.token})
          }).catch((err)=>{
            console.log(err)
            this.setState({logining:false})
          })
        }else{
          AlertIOS.alert(
            'wrong',
            response.message,
            [
              {text:'OK',onPress:()=>{this.setState({logining:false})}}
            ]
          )
        }
      }).catch((error)=>{
        this.setState({logining:false})
      })
    }else if(this.state.type===type.register){
      api.register(this.state.username,this.state.password)
      .then((response)=>{
        response = response.data
        if(response.success){
          this.setState({token:response.data})
          Realm.getRealm(response.data)
          .then((object)=>{
            this.toMainView({...object,token:this.state.token})
            this.setState({logining:false})
          }).catch((err)=>{
            console.log(err)
            this.setState({logining:false})
          })
        }else{
          AlertIOS.alert(
            'wrong',
            response.message,
            [
              {text:'OK',onPress:()=>{this.setState({logining:false})}}
            ]
          )
        }
      }).catch((error)=>{
        this.setState({logining:false})
      })
    }
  }
  render(){
    return(
    <View style={styles.container}>
      {renderIf(!this.state.type)(
          <View>
            <Button rounded style={styles.button} onPress={()=>{this.handlerLogin()}}>
              <Text>login</Text>
            </Button>
            <Button rounded style={styles.button} onPress={()=>{this.handlerRegister()}}>
              <Text>register</Text>
            </Button>
          </View>
      )}
      {renderIf(this.state.type)(
        <View>
          <Item style={styles.item}>
            <Input
              placeholder='name'
              placeholderTextColor='rgba(0,0,0,0.5)'
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              keyboardAppearance="light"
              onChangeText={(text)=>{this.setUsername(text)}}
            />
          </Item>
          <Item style={styles.item}>
            <Input
              placeholder='password'
              placeholderTextColor='rgba(0,0,0,0.5)'
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              keyboardAppearance="light"
              secureTextEntry={true}
              onChangeText={(text)=>{this.setPassword(text)}}
            />
          </Item>
          {renderIf(this.state.username && this.state.password)(
              <Button rounded style={styles.submitButton} onPress={()=>{this.handlerSubmit()}}>
                <Text>submit</Text>
              </Button>
          )}
          {renderIf(!this.state.username || !this.state.password)(
            <Button rounded style={styles.submitButton} disabled={true}>
              <Text>submit</Text>
            </Button>
          )}
        </View>
      )}
      {renderIf(this.state.logining)(
        <Modal transparent={true}>
          <CenterSpinner/>
        </Modal>
      )}
    </View>
    )
  }
}
const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      alignSelf:'center',
      width:120,
      flexDirection: 'row',
      justifyContent:'center',
      marginTop:10,
    },
    input:{
      textAlign:'center',
      color:'black', 
      height:38,
      fontSize:20, 
      lineHeight:28,
    },
    item:{
      alignSelf:'center',
      width:180,
      height:38,
      marginTop:5
    },
    submitButton:{
      width:120,
      alignSelf:'center',
      flexDirection: 'row',
      justifyContent:'center',
      marginTop:20,
    }
}
export default LoginView