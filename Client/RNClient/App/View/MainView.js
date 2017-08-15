import React from 'react';
import {Button,View,Text,Form, Item, Input, Label} from 'native-base';
import {Dimensions} from 'react-native'
import realm from '../Services/Realm'
import renderIf from '../Utils/Visibility'
import api from '../Services/API'
var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      token:props.token,
      realm:props.realm,
      realmUser:props.realmUser,
      myData:null,
      allData:null,
    }
  }
  componentDidMount(){
    let {token,realm} = this.state
    let datas = realm.objects('Data').slice(0, 1)
    let data = datas[0]
    if(data){
      this.setState({myData:data})
    }else{
      this.setState({myData:{one:0,two:0,three:0,four:0}})
    }
    setInterval(()=>{
      api.allData(this.state.token).then((response)=>{
        console.log(response)
        response = response.data
        if(response.success){
          this.setState({allData:response.data[0]})
        }
      }).catch((error)=>{
        
      })
    },1000)
  }
  increase(index){
    if(this.state.realm){
      let {token,realm} = this.state
      let datas = realm.objects('Data').slice(0, 1)
      let data = datas[0]
      if(data){
        realm.write(()=>{
          if(index===1){
            data.one = data.one+1
          }else if(index===2){
            data.two = data.two+1
          }else if(index===3){
            data.three = data.three+1
          }else if(index===4){
            data.four = data.four+1
          }
          this.setState({myData:data})
          api.update(token,data).then((response)=>{
            console.log(response)
          }).catch((err)=>{
            console.log(err)
          })
        })
      }else{
        realm.write(()=>{
          let data = {one:0,two:0,three:0,four:0}
          if(index===1){
            realm.create('Data', {id:1, one: 1});
            data.one=1
          }else if(index===2){
            realm.create('Data', {id:1, two: 1});
            data.two=1
          }else if(index===3){
            realm.create('Data', {id:1, three: 1});
            data.three=1
          }else if(index===4){
            realm.create('Data', {id:1, four: 1});
            data.four=1
          }
          this.setState({myData:data})
          api.update(token,data).then((response)=>{
            console.log(response)
          }).catch((err)=>{
            console.log(err)
          })
        })
      }
    }
  }
  renderMyData(){
    if(this.state.myData){
      let myData = this.state.myData
      return(
        <View style={{...styles.second_container,backgroundColor:'rgb(172,217,195)'}}>
          <Text>我的记录</Text>
          <Text>{myData.one}</Text>
          <Text>{myData.two}</Text>
          <Text>{myData.three}</Text>
          <Text>{myData.four}</Text>
        </View>
      )
    }else{
      return(
        <View style={{...styles.second_container,backgroundColor:'rgb(172,217,195)'}}>
          <Text>我的记录</Text>
          <Text>0</Text>
          <Text>0</Text>
          <Text>0</Text>
          <Text>0</Text>
        </View>
      )
    }
  }
  renderAllData(){
    if(this.state.allData){
      let allData = this.state.allData
      return(
        <View style={{...styles.second_container,backgroundColor:'rgb(150,207,172)'}}>
          <Text>总的记录</Text>
          <Text>{allData.one}</Text>
          <Text>{allData.two}</Text>
          <Text>{allData.three}</Text>
          <Text>{allData.four}</Text>
        </View>
      )
    }else{
      return(
        <View style={{...styles.second_container,backgroundColor:'rgb(150,207,172)'}}>
          <Text>总的记录</Text>
          <Text>0</Text>
          <Text>0</Text>
          <Text>0</Text>
          <Text>0</Text>
        </View>
      )
    }
  }
  render(){
    return(
      <View style={styles.container}>
        {this.renderMyData()}
        {this.renderAllData()}
        <View style={styles.second_container}>
          <Button info style={styles.button} onPress={()=>this.increase(1)}>
            <Text>1</Text>
          </Button>
          <Button info style={styles.button} onPress={()=>this.increase(2)}>
            <Text>2</Text>
          </Button>
          <Button info style={styles.button} onPress={()=>this.increase(3)}>
            <Text>3</Text>
          </Button>
          <Button info style={styles.button} onPress={()=>this.increase(4)}>
            <Text>4</Text>
          </Button>
        </View>
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
  second_container:{
    width: deviceWidth,
    padding:20,
    marginTop:10,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  button:{
    alignSelf:'center'
  },
}
export default MainView