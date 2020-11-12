import React, { Component } from "react";
import {
  Container,
  Text,
  Content,
  Button,
  Spinner,
  Footer,
  Icon,
  FooterTab
} from "native-base";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Linking
} from "react-native";
import HTML from "react-native-render-html";
import { baseUrl } from "../../config";
import ImageView from "react-native-image-view";

export default class SingleLessonSlide extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }
  onImageClose = () => {
    console.log("close image");
    this.setState({
      isVisible: false
    });
  };
  viewImage = () => {
    console.log("view image");
    this.setState({
      isVisible: true
    });
  };
  viewAlert = msg => {
    alert(msg);
  };
  render() {
    const { slide, courseId } = this.props;
    const { isVisible } = this.state;
    console.log({
      slide
    });
    const fullWidth = Dimensions.get("window").width - 20;
    return (
      <Container>
        <Content>
          {/* <ScrollView> */}
          {slide.GoToQuiz ? (
            <View style={StyleSheet.detailsSection}>
              <Text style={styles.courseDoneMsg}>
                All Lesson completed in this course .
              </Text>
              <Button
                bordered
                info
                style={styles.margin20}
                onPress={() => {
                  console.log({
                    navigation: this.props.navigation.navigate
                  });
                  this.props.navigation.navigate("QuizPage", {
                    itemId: courseId
                  });
                }}
              >
                <Text>Start Quiz</Text>
              </Button>
            </View>
          ) : (
            <View style={styles.detailsSection}>
              <ImageView
                isVisible={isVisible}
                onClose={() => {
                  this.onImageClose();
                }}
                images={[
                  {
                    source: {
                      uri: baseUrl + slide.image
                    },
                    width: this.state.width ? this.state.width : null,
                    height: this.state.height ? this.state.height : null
                  }
                ]}
              />
              <Text style={styles.heading}>{slide.title}</Text>
              {slide.downloadFile && slide.downloadFile !== "" ? (
                <View
                  
                  style={{
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                    <TouchableNativeFeedback 
                    onPress={() => {
                        Linking.openURL(baseUrl + slide.downloadFile);
                      }}>
                  <Image
                    
                    onLoad={e => {
                      console.log("eeee", e.target);
                      Image.getSize(baseUrl + slide.image, (width, height) => {
                        this.setState({ width, height }, () => {
                          console.log({
                            width,
                            height
                          });
                        });
                      });
                    }}
                    resizeMode="contain"
                    source={{ uri: baseUrl + slide.image }}
                    style={{
                      height:
                        this.state.height && this.state.width
                          ? (parseInt(fullWidth) * this.state.height) /
                            this.state.width
                          : null,
                      width: fullWidth,
                      flex: 1
                    }}
                  />
                  </TouchableNativeFeedback>
                </View>
                
              ) : (
                <TouchableNativeFeedback
                  onPress={() => {
                    this.viewImage();
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      onLoad={e => {
                        console.log("eeee", e.target);
                        Image.getSize(
                          baseUrl + slide.image,
                          (width, height) => {
                            this.setState({ width, height }, () => {
                              console.log({
                                width,
                                height
                              });
                            });
                          }
                        );
                      }}
                      resizeMode="contain"
                      source={{ uri: baseUrl + slide.image }}
                      style={{
                        height:
                          this.state.height && this.state.width
                            ? (parseInt(fullWidth) * this.state.height) /
                              this.state.width
                            : null,
                        width: fullWidth,
                        flex: 1
                      }}
                    />
                  </View>
                </TouchableNativeFeedback>
              )}

              <FooterTab>
                {slide.youtubeVideoLink && slide.youtubeVideoLink !== "" ? (
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate("VideoPage", {
                        itemId: courseId,
                        videoID: slide.youtubeVideoLink
                      })
                    }
                    style={styles.color}
                  >
                    <Icon name="camera" />
                    <Text style={styles.color}> Video</Text>
                  </Button>
                ) : (
                  <Button
                    style={styles.color}
                    onPress={() => this.viewAlert("Sorry No Video Found !")}
                  >
                    <Icon name="camera" />
                    <Text style={styles.color}> Video</Text>
                  </Button>
                )}
                {/* {slide.downloadFile && slide.downloadFile !== "" ? (
                  <Button
                    onPress={() => {
                      Linking.openURL(baseUrl + slide.downloadFile);
                    }}
                    style={styles.color}
                  >
                    <Icon name="save" />
                    <Text style={styles.color}> File</Text>
                  </Button>
                ) : (
                  <Button
                    style={styles.color}
                    onPress={() => this.viewAlert("Sorry No Download File Found !")}
                  >
                    <Icon name="save" />
                    <Text style={styles.color}> File</Text>
                  </Button>
                )} */}
              </FooterTab>
              <HTML
                html={slide.details}
                containerStyle={[
                  {
                    width: "100%",
                    fontSize: 18
                  }
                ]}
                imagesMaxWidth={fullWidth}
              />
            </View>
          )}
          {/* </ScrollView> */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#8D8D8D",
    padding: 20
  },
  color: {
    color: "#ffffff"
  },
  heading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 10,
    padding: 0
  },
  courseDoneMsg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#8D8D8D",
    padding: 20,
    fontSize: 20,
    marginTop: 100
  },
  detailsSection: {
    padding: 0,
    flex: 1,
    width: "100%"
  },
  margin20: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#8D8D8D",
    width: "90%",
    margin: 15
  },
  quaction: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    width: "100%"
  }
});
