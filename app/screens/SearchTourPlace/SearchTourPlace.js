/**
 * Restaurant Google Map
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    FlatList,
    ImageBackground
} from 'react-native';
import styles from './SearchTourPlaceStyle';
import * as IMG_CONST from '../../theme/ImageConstants';
import { Keyboard } from 'react-native';

class SearchTourPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showSearchedListContainer: false,
            NearByTouristPlace: []
        }
    }

    componentDidMount() { }

    onChangeSearch = async (text) => {
        this.setState({ searchText: text });
        if (text.length > 3) {
            try {
                setTimeout(async () => {
                    let response = null;

                    response = await fetch(
                        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=establishment&language=en&key=AIzaSyDB2lOK0zfndMYAnrPqc2L7gDSfxQ2Ib7I`
                    );
                    let json = await response.json();
                    this.setState({ searchedList: json.predictions, showSearchedListContainer: true }, () => {
                        if (json.status !== 'OK') {
                            // alert('not found');
                            return;
                        }
                    })
                }, 300)
            } catch (error) {
            }
        } else if (text === '') {
            this.setState({ showSearchedListContainer: false })
        }
    }

    onPressSearchedPlace = async (item) => {
        Keyboard.dismiss();
        this.setState({ searchText: item.description });
        let placeID = item.place_id
        try {
            let response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=address_component,name,geometry&key=AIzaSyDB2lOK0zfndMYAnrPqc2L7gDSfxQ2Ib7I`
            );
            let json = await response.json();
            console.log("@@@ Selected Place Geomatry Details=======", json)
            this.setState({ showSearchedListContainer: false }, () => {
                if (json.status !== 'OK') {
                    // alert('not found');
                    return;
                }
                let localsearchedLocation = json.result.geometry.location;
                let searchedLatitude = localsearchedLocation.lat;
                let searchedLongitude = localsearchedLocation.lng;
                this.searchNearByTouristPlace(searchedLatitude, searchedLongitude);
            })
        } catch (error) {
        }
    }

    searchNearByTouristPlace = async (lat, long) => {
        try {
            let response = await fetch(
                `https://staging.tourmega.com/api/v2/tours?lat=${lat}&lng=${long}`
            );
            let json = await response.json();
            this.setState({ NearByTouristPlace: json.data }, () => {
                console.log("@@@ Searched NearBy Tour Place by state=======", this.state.NearByTouristPlace)
                if (json.status !== 'OK') {
                    // alert('not found');
                    return;
                }
            })
        } catch (error) {
        }
    }

    renderSearchedPlaces = (item, index) => {
        return (
            <TouchableOpacity style={styles.descriptionContainer} activeOpacity={0.5} onPress={() => this.onPressSearchedPlace(item)}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={IMG_CONST.GOOGLE_MAP_SEARCH_ICON}
                        style={styles.searchedIcon}
                    />
                    <Text numberOfLines={3} style={styles.descriptionText}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderMapContainer = () => {
        console.log('@@@ Location latitude =============', this.state.lat, this.state.lng);
        return (
            <View style={styles.searchBarContainer} >
                <View style={styles.searchBar}>
                    <Image
                        source={IMG_CONST.GOOGLE_MAP_ICON}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.inputTextColor}
                        placeholder='Search here'
                        placeholderTextColor='black'
                        value={this.state.searchText}
                        onChangeText={(text) => this.onChangeSearch(text)}
                    />
                </View>
                {this.state.showSearchedListContainer ?
                    <View style={styles.searchedListContainer}>
                        <FlatList
                            keyboardShouldPersistTaps={'handled'}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            data={this.state.searchedList}
                            extraData={this.state}
                            renderItem={({ item, index }) => this.renderSearchedPlaces(item, index)}
                        />
                    </View>
                    : null}
            </View>
        )
    }

    renderNearByTourPlace = (item, index) => {
        const imageUri = item.thumbnail_url != null ? item.thumbnail_url : ""
        return (
            <View style={styles.tourPlaceCellContainer}>
                <Image source={{ uri: imageUri }} style={styles.tourImage} />
                <Text numberOfLines={2} style={styles.tourName}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.cityName}>City: {item.city}</Text>
            </View>
        )
    }

    renderTouristPlaceList = () => {
        return (
            <View style={styles.tourPlaceListContainer}>
                <FlatList
                    numColumns={2}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={this.state.NearByTouristPlace}
                    extraData={this.state}
                    renderItem={({ item, index }) => this.renderNearByTourPlace(item, index)}
                />
            </View>
        )
    }

    render() {
        return (
            <ImageBackground source={IMG_CONST.SPLASH_BG} style={styles.container} >
                <StatusBar hidden />
                <View style={styles.container}>
                    {this.renderMapContainer()}
                    {this.renderTouristPlaceList()}
                </View>
            </ImageBackground>
        );
    }
};

export default SearchTourPlace;



