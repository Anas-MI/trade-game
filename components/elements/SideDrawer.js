import React, { Component } from "react";
import { Image, View, Dimensions, StyleSheet, TouchableOpacity, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView } from "react-native";

import { Button, Icon, Text } from 'native-base';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import App from "../index";

const MenuItem = ({
    onPress, title, icon
}) => {
    return <TouchableNativeFeedback onPress={onPress} >
        <View style={styles.sliderMenus}>
            <View style={styles.row}>
                {icon && <Text style={[styles.menuText, styles.menuLinkIcon]}>
                    <Icon name={icon} style={styles.menuIcon} />
                </Text>}
                <Text style={styles.menuText}>
                    {title}
                </Text>
            </View>
        </View>
    </TouchableNativeFeedback>
}

class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount() {
        //  handleAndroidBackButton(this.handleBack)
        // getUser().then((responseText) => responseText)
        // .then((response) => this.setState({userName: response.name}));
    }
  
    handlelogout = () => {
        Alert.alert('Confirm Logout', 'Are you sure you want to logout?',
            [
                {
                    text: 'No', style: 'cancel', onPress: () => {
                        this.hideSideMenu();
                    }
                },
                {
                    text: 'Yes', onPress: () => {
                        this.hideSideMenu();
                        this.removeUser();
                    }
                }
            ]);

    };

    removeUser = async ()=> {
        AccessToken.getCurrentAccessToken().then(data => {
            if(data.accessToken){
                LoginManager.logOut()
            }
        })
        try {
            const value = await AsyncStorage.removeItem('user', (user) => {
                console.log('top Error', user);
                this.pushAndCloseSideMenu("Login")
            });
        } catch (error) {
            console.error("bottom error", error)
        }
    }


    handleBack() {
        this.props.navigation.closeDrawer()
    }
    render() {
        const {
            navigation
        } = this.props
        return (
            <View style={[styles.container]} >
                <Icon name='ios-return-left' onPress={() => this.hideSideMenu()} style={styles.closeicon} />
                <View style={styles.topBar}>
                    <Image style={styles.topBarImage} source={require('../images/man.png')} />
                    <Text style={styles.topBarName} >
                        Welcome, {this.state.userName}
                    </Text>
                </View>
                <ScrollView>
                    <TouchableNativeFeedback onPress={() => {

                        this.pushAndCloseSideMenu("Dashboard")
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-home' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    Dashboard
                            </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <MenuItem title="Trading" icon="graph" onPress={() => {
                        this.pushAndCloseSideMenu("Trading", 'Trading')
                    }} />
                      <TouchableNativeFeedback onPress={() => {
                        this.pushAndCloseSideMenu("Transactions", 'Transactions')
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-person' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    Purchased Shares
                            </Text>
                            </View>
                        </View>

                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => {
                        this.pushAndCloseSideMenu("TransactionRandom", 'TransactionRandom')
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-person' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    Purchased Shares (Random)
                            </Text>
                            </View>
                        </View>

                    </TouchableNativeFeedback>


                    
                    <TouchableNativeFeedback onPress={() => {
                        this.pushAndCloseSideMenu("ChartRandomData", 'ChartRandomData')
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-person' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    Trading (Random Data)
                            </Text>
                            </View>
                        </View>

                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => {
                        this.pushAndCloseSideMenu("About", 'About')
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-person' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    About
                            </Text>
                            </View>
                        </View>

                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => {
                        this.pushAndCloseSideMenu("Search", 'Search Symbol')
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-search' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    Search
                            </Text>
                            </View>
                        </View>

                    </TouchableNativeFeedback>


                    <TouchableNativeFeedback onPress={() => {
                        this.handlelogout()
                    }
                    } >
                        <View style={styles.sliderMenus}>
                            <View style={styles.row}>
                                <Text style={[styles.menuText, styles.menuLinkIcon]}>
                                    <Icon name='ios-log-out' style={styles.menuIcon} />
                                </Text>
                                <Text style={styles.menuText}>
                                    Logout
                            </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </ScrollView>
            </View>
        );
    }
    hideSideMenu() {
        this.props.navigation.closeDrawer()

    }
    pushAndCloseSideMenu(componentName, name) {
        console.log({
            componentName
        })
        this.hideSideMenu();
        this.props.navigation.navigate(componentName)
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        backgroundColor: "white",
        flex: 1
    },
    sliderMenus: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    menuText: {
        textAlignVertical: 'center',

    },
    topBar: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: lightPrimary // '#3f51b5'
    },
    topBarImage: {
        width: 64,
        height: 64,
        margin: 20,
        borderRadius: 64,
    },
    topBarName: {
        color: '#fff',

    },
    menuIcon: {

    },
    menuLinkIcon: {
        width: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {

    },
    text: {

    },
    closeicon: {
        marginLeft: 250
    }
});

export default SideDrawer;
