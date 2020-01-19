import React, { Component } from 'react';
import { Button, StyleSheet, View, Platform, Dimensions, Text } from "react-native";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import gameState from '../backend/GameState.js';
import serverSocket from '../backend/ServerConnection.js';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var apiKey = 'AIzaSyDVfVr11MvcKgNNlW6TSRwX2a3VhTzs4k8';
var first = true;

const test_pellets = [
  [53.5304811882,-113.530713474],
  [53.5304225712,-113.530552996],
  [53.530425247,-113.530418419],
  [53.5304134623,-113.530270269],
  [53.5303996741,-113.530131655],
  [53.5303824152,-113.529986609],
  [53.530366866,-113.529830076],
  [53.530438218,-113.529495418],
  [53.5305062371,-113.529442828],
  [53.5305473672,-113.529158025],
  [53.5305181527,-113.52902544],
  [53.5304889382,-113.528892855],
  [53.5304585167,-113.528762883],
  [53.5304265488,-113.528633691],
  [53.5303951222,-113.528504527],
  [53.5303636955,-113.528375365],
  [53.5303322686,-113.528246203],
  [53.5303008415,-113.52811704],
  [53.5302694145,-113.527987878],
  [53.5302379871,-113.527858716],
  [53.5302075843,-113.527734498],
  [53.5301754942,-113.527606455],
  [53.5301434041,-113.527478414],
  [53.5301110149,-113.527348461],
  [53.5300777059,-113.527213195],
  [53.5300464299,-113.527083784],
  [53.5300151539,-113.526954373],
  [53.5299780376,-113.526780172],
  [53.5299328748,-113.526536001],
  [53.5299141498,-113.526392093],
  [53.5298930217,-113.526223303],
  [53.5298763544,-113.526077907],
  [53.5303910537,-113.530712351],
  [53.5303525234,-113.529661131],
  [53.529856466,-113.525904415],
  [53.5298397984,-113.525759019],
  [53.5298231306,-113.525613624],
  [53.5298035783,-113.525437681],
  [53.529792,-113.5253167],
  [53.5297776202,-113.525209217],
  [53.5303012328,-113.530709621],
  [53.5297606,-113.525082],
  [53.5302114118,-113.530706891],
  [53.5302034,-113.5299001],
  [53.5301949476,-113.529786252],
  [53.5300378174,-113.529369079],
  [53.5300294452,-113.529249746],
  [53.5299915,-113.5290266],
  [53.5299487858,-113.526639135],
  [53.5301215908,-113.530704161],
  [53.5300294303,-113.529473878],
  [53.5300317697,-113.530701431],
  [53.5298858,-113.5302995],
  [53.529887003,-113.530101784],
  [53.5298879245,-113.529950953],
  [53.5299616,-113.5296249],
  [53.5299400593,-113.528950067],
  [53.5299620085,-113.527567843],
  [53.530026757,-113.527521319],
  [53.5297409797,-113.524968961],
  [53.5299419487,-113.530698702],
  [53.5298888486,-113.529801745],
  [53.5298712872,-113.528902862],
  [53.5298012099,-113.528842228],
  [53.5298778488,-113.527603268],
  [53.5298521277,-113.530695972],
  [53.5298520611,-113.529646802],
  [53.529732661,-113.528771391],
  [53.529575961,-113.528508241],
  [53.529791424,-113.527632218],
  [53.5297622219,-113.530693587],
  [53.5297631002,-113.530296494],
  [53.5297634694,-113.52998337],
  [53.5297640807,-113.529643778],
  [53.529674959,-113.5287163],
  [53.5297221625,-113.527655419],
  [53.5297205277,-113.52485143],
  [53.5296723777,-113.530692342],
  [53.529673269,-113.530294294],
  [53.5296736492,-113.529980601],
  [53.529674268,-113.52964069],
  [53.5294911459,-113.528943809],
  [53.5295072106,-113.52834434],
  [53.5295825335,-113.530691096],
  [53.5295834377,-113.530292093],
  [53.5295838291,-113.529977832],
  [53.5295844552,-113.529637602],
  [53.5295422996,-113.528841228],
  [53.529586465,-113.52875246],
  [53.5294293119,-113.528127957],
  [53.5295847469,-113.527656605],
  [53.5294926893,-113.530689851],
  [53.5294374,-113.5303384],
  [53.5294494694,-113.530103974],
  [53.529492366,-113.529975012],
  [53.5294502023,-113.529802402],
  [53.52949281,-113.529634451],
  [53.5294400183,-113.529539275],
  [53.5294071652,-113.529382325],
  [53.5294058822,-113.529131516],
  [53.5294067332,-113.527825536],
  [53.5294930429,-113.527653351],
  [53.5293125785,-113.527584576],
  [53.5296894753,-113.52470667],
  [53.5294028451,-113.530688606],
  [53.5293892315,-113.530556327],
  [53.5294630701,-113.528229917],
  [53.5293994236,-113.527994082],
  [53.5294206046,-113.527698144],
  [53.5292416946,-113.527517586],
  [53.5291178835,-113.527314575],
  [53.5290576,-113.5271949],
  [53.5293129988,-113.53068738],
  [53.5293317462,-113.53045101],
  [53.5292489217,-113.530278028],
  [53.5291794023,-113.527435534],
  [53.5291019994,-113.524365314],
  [53.5292231543,-113.530686159],
  [53.5291333099,-113.530684938],
  [53.5290233941,-113.524446711],
  [53.5290434655,-113.530683716],
  [53.5293948,-113.5292709],
  [53.5289978326,-113.527124766],
  [53.5289536209,-113.530682495],
  [53.5288637765,-113.530681273],
  [53.5288586664,-113.527124559],
  [53.5289195,-113.5244462],
  [53.5287739321,-113.530680052],
  [53.5284023,-113.5301238],
  [53.5287688354,-113.527126778],
  [53.528807129,-113.524419221],
  [53.5286840876,-113.530678831],
  [53.5282859,-113.527388],
  [53.5285162,-113.5271383],
  [53.5286790043,-113.527128996],
  [53.5286853636,-113.524414817],
  [53.5285942431,-113.530677609],
  [53.5284029069,-113.530257548],
  [53.5285877776,-113.527131866],
  [53.5285699017,-113.524420316],
  [53.5285043987,-113.530676388],
  [53.5284035856,-113.530407183],
  [53.528219,-113.5274711],
  [53.5283424298,-113.527292753],
  [53.5284911362,-113.524429746],
  [53.5284145542,-113.530675167],
  [53.5284032557,-113.530556434],
  [53.5283978227,-113.527195672],
  [53.5284014282,-113.524435764],
  [53.5283246887,-113.530674079],
  [53.5281536,-113.5275328],
  [53.5283194211,-113.524440618],
  [53.5282348429,-113.530673013],
  [53.5282295927,-113.524442983],
  [53.528144997,-113.530671946],
  [53.5280755,-113.5275623],
  [53.5281397642,-113.524445347],
  [53.5280551511,-113.53067088],
  [53.5275427,-113.5268655],
  [53.5280499357,-113.524447712],
  [53.5279653053,-113.530669814],
  [53.5279708445,-113.5275594],
  [53.5278752919,-113.530669317],
  [53.5277854416,-113.53066935],
  [53.5276955914,-113.530669383],
  [53.5276057388,-113.530669423],
  [53.5276266185,-113.524127918],
  [53.5275158885,-113.530669471],
  [53.5268937296,-113.529948716],
  [53.5268941408,-113.529797929],
  [53.5268945518,-113.529647141],
  [53.5268949626,-113.529496354],
  [53.5268953732,-113.529345566],
  [53.5268957837,-113.529194778],
  [53.5268961939,-113.529043991],
  [53.526896604,-113.528893203],
  [53.5268970558,-113.528741546],
  [53.5268975404,-113.528590759],
  [53.5268979619,-113.528440329],
  [53.5268984153,-113.528289542],
  [53.5272138,-113.527574],
  [53.5279774,-113.5243452],
  [53.5275369981,-113.524120288],
  [53.5274260381,-113.530669518],
  [53.5274258133,-113.52686566],
  [53.5273361878,-113.530669565],
  [53.527335963,-113.526865784],
  [53.5272463375,-113.530669613],
  [53.5272461815,-113.526865908],
  [53.5271564872,-113.53066966],
  [53.5268933106,-113.530102285],
  [53.5268988593,-113.528141834],
  [53.527113939,-113.527604951],
  [53.5271724,-113.5268703],
  [53.5270666368,-113.530669707],
  [53.5268938087,-113.530257701],
  [53.5268991827,-113.527992702],
  [53.5269767865,-113.530669755],
  [53.5268946001,-113.530407134],
  [53.5268993532,-113.527842205],
  [53.5269773341,-113.527625937]
];

export default class header extends Component {
  mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        },
        {
          "weight": 1.5
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "weight": 0.5
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]


  constructor(props) {
    super(props);

    this.state = {
      latitude: 53.526,
      indicator: require('../../images/small_red.png'),
      longitude: -113.530,
      coordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      pellets: []
    };
  }

  gameMode(isPacman) {
    if (isPacman == true) {
      this.setState({indicator: require('../../images/pacman.png')});
    }
  };

  UpdateLocation = () => {
    if (first) {
      first = false;
      navigator.geolocation.getCurrentPosition(
        position => {
          const { coordinate } = this.state;
          const { latitude, longitude } = position.coords;

          var newCoordinate = {
            latitude,
            longitude
          };

          {
            (async () => {
              console.log('---------------------------------------------')
              console.log(latitude + ', ' + longitude)

              await fetch('https://roads.googleapis.com/v1/snapToRoads?path=' + latitude + ',' + longitude + '&key=AIzaSyDVfVr11MvcKgNNlW6TSRwX2a3VhTzs4k8')
                .then(response => response.json())
                .then((responseJson) => {
                  const a = responseJson.snappedPoints[0].location

                  this.setState({
                    latitude: a.latitude,
                    longitude: a.longitude
                  });

                  newCoordinate = { latitude: this.state.latitude, longitude: this.state.longitude }


                  coordinate.timing(newCoordinate).start();

                  console.log(this.state.latitude + ', ' + this.state.longitude)
                })
                .catch(error => console.log('Too far from road')) //to catch the errors if any
            })();
          }

        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      navigator.geolocation.watchPosition(
        position => {
          const { coordinate } = this.state;
          const { latitude, longitude } = position.coords;

          var newCoordinate = {
            latitude,
            longitude
          };

          {
            (async () => {
              console.log('---------------------------------------------')
              console.log(latitude + ', ' + longitude)

              await fetch('https://roads.googleapis.com/v1/snapToRoads?path=' + latitude + ',' + longitude + '&key=AIzaSyDVfVr11MvcKgNNlW6TSRwX2a3VhTzs4k8')
                .then(response => response.json())
                .then((responseJson) => {
                  const a = responseJson.snappedPoints[0].location

                  this.setState({
                    latitude: a.latitude,
                    longitude: a.longitude
                  });

                  newCoordinate = { latitude: this.state.latitude, longitude: this.state.longitude }

                  coordinate.timing(newCoordinate).start();

                  console.log(this.state.latitude + ', ' + this.state.longitude)
                })
                .catch(error => console.log('Too far from road')) //to catch the errors if any
            })();
          }

        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }

  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      <View style={styles.container}>
        
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
          customMapStyle={this.mapStyle}
        >

          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            title={'Lora'}
            description={'Sucks'}
            image={this.state.indicator}
          />

          {test_pellets.map((prop) => {
            return (
              <Marker.Animated
                coordinate={{latitude: prop[0], longitude: prop[1]}}
                image={require('../../images/pellet.png')}
              />
            );
          })}

          {serverSocket.users.map((prop) => {
            console.log(prop)
            if (this.gameMode(gameState.isPacman) == false && prop.isPacman == true) {

            } else {
              
              return (
                <Marker.Animated
                  coordinate={{latitude: prop.lat, longitude: prop.long}}
                  image={require('../../images/small_red.png')}
                />
              );            
            }
          })}

        </MapView>

        {/* <Button
          title='T3l3p0rt h4xks'
          onPress={async () => {
            var newCoordinate = {
              latitude,
              longitude
            };
            
            newCoordinate = { latitude: 53.527192 , longitude: -113.530700 }
            coordinate.timing(newCoordinate).start();

            console.log('reeee2')
          }}
        /> */}

        <Button
          title='Update Location'
          onPress={async () => {
            this.UpdateLocation()
            this.gameMode(gameState.isPacman)
          }}
        >
        </Button>   
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
