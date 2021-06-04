import { StyleSheet, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../theme/ColorConstants';
import { FONTS } from '../../theme/ColorConstants';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    searchBarContainer: {
        marginTop: verticalScale(50)
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: scale(350),
        height: scale(45),
        borderRadius: scale(8),
        backgroundColor: COLOR_CONST.white,
    },

    searchIcon: {
        width: scale(35),
        height: scale(35),
        marginLeft: scale(10),
        marginRight: scale(10),
    },

    searchedIcon:{
        width: scale(25),
        height: scale(25),
        marginLeft: scale(5),
    },

    inputTextColor:{
        color:COLOR_CONST.black,
        width: scale(270),
    },

    searchedListContainer:{
        alignSelf: 'center',
        alignItems: 'center',
        width: scale(340),
        borderBottomLeftRadius: scale(8),
        borderBottomRightRadius: scale(8),
        backgroundColor: 'transparent'
    },

    descriptionContainer:{
        marginTop: verticalScale(4),
        borderRadius: scale(4),
        width: scale(340),
        height: scale(50),
        justifyContent: 'center',
        backgroundColor: COLOR_CONST.white
    },

    descriptionText:{
        fontSize: scale(12), 
        width: scale(300),
        fontFamily: FONTS.MetropolisSemiBold,
        color: COLOR_CONST.darkTitle,
        marginLeft: scale(10)
    },

    tourPlaceListContainer:{
        alignSelf: 'center',
        marginTop: verticalScale(30),
        height: scale(650),

    },

    tourPlaceCellContainer:{
        borderWidth: 1,
        borderRadius: scale(4),
        backgroundColor: COLOR_CONST.white,
        width: scale(166),
        marginHorizontal: scale(5),
        marginBottom: verticalScale(11),
        overflow: 'hidden'
    },

    tourImage: {
        width: scale(170),
        height: scale(170),
    },

    tourName: {
        width: scale(164),
        fontSize: scale(14),
        fontWeight: 'bold',
        color: COLOR_CONST.darkTitle,
        marginTop: verticalScale(11),
        marginHorizontal: scale(10)
    },

    cityName:{
        width: scale(164),
        fontSize: scale(12),
        color: COLOR_CONST.darkTitle,
        marginTop: verticalScale(8),
        marginHorizontal: scale(10),
        marginBottom: verticalScale(10)
    } 
});