import React, { Component } from 'react';
import { TouchableNativeFeedback, View } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions } from 'react-navigation';
import {Container, Content, Button, Text, Badge,
    Left, Icon, Body, Right, Title, Header
 } from 'native-base';

class MainHeader extends Component {
    constructor(props){
        super(props)
      
    }
    
  
    // renderIcon(routeName, iconName){
        
    //     const {
    //         navigation,
    //         title,
            
    //     } = this.props
    //     return (
    //     <TouchableNativeFeedback 
    //         transparent>
    //         <View style={{ marginLeft: 2, marginRight: 2, paddingLeft: 5, paddingRight: 5 }}>
    //             <Icon style={{ height: 28, fontSize: 22, color: "white" }} name={iconName} />
    //         </View>
    //     </TouchableNativeFeedback>
    //     )
    // }
    render(){
        const {
            navigation,
            title,
            
        } = this.props
       return( 
            <Header 
            >
            <Left>
                <Button transparent
                onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                }}
                  >
                    <Icon name='menu' />

                </Button>
            </Left>
            <Body>
                {title && <Title>{title}</Title>}
            </Body>
            <Right>
               
            </Right>
        </Header>

    )
    }
}

export default MainHeader;