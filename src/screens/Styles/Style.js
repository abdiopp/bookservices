import { Dimensions, StyleSheet } from "react-native";

let ScreenHeight = Dimensions.get("window").height / 2;
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        fontFamily: "sans-serif-light",
    },
    flexCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    horizantlyCenter: {
        alignItems: "center",
    },
    flexrow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",

    },
    flexcart: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: "wrap",

    },
    flexaround: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",

    },
    // ------------------------------- heading 
    h: {
        textAlign: "center",
        fontFamily: "sans-serif-light",
        fontWeight: "bold",
        color: '#000',
        textAlign: "left",
    },
    h1: {
        fontSize: 40,

    },
    h2: {
        fontSize: 30,

    },
    h3: {
        fontSize: 20,

    },
    textlight: {
        color: "#fff",
        textAlign: "center"
    },
    p: {
        textAlign: "left",
        fontSize: 10,
    },

    // --------------------------- img styles
    img: {
        width: "50vw",
        height: 70,
    },

    // ------------------------- button styles
    smallbtn: {
        width: 70,
        backgroundColor: "white",
        paddingHorizontal: 5,
        paddingVertical: 2,

    },
    btn: {
        backgroundColor: "#EFEFEF",
        paddingHorizontal: 18,
        paddingVertical: 15,
        margin: 10,
        borderRadius: 10,

    },
    btnstylish: {
        backgroundColor: "#4f772d",
        paddingHorizontal: 18,
        paddingVertical: 15,
        margin: 10,
        borderRadius: 10,
        width: "70%",
    },
    shadowProp: {
        shadowColor: "#11fae1",
        shadowOffset: {
            width: 0,
            height: 16,
        },
        shadowOpacity: 0.25,
        shadowRadius: 18.46,
        elevation: 10

    },
    btn1: {
        backgroundColor: "#6759FF",
        paddingHorizontal: 18,
        paddingVertical: 6,
        margin: 10,
        borderRadius: 10,
        width: "70%",
        color: "#000",
    },
    shadowProp1: {
        shadowColor: "#11fae1",
        shadowOffset: {
            width: 0,
            height: 16,
        },
        shadowOpacity: 0.25,
        shadowRadius: 50.46,
        elevation: 5,
    },
    formControl: {
        width: "90%",
        backgroundColor: "#EFEFEF",
        marginVertical: 10,
        borderRadius: 10,
        color: "#000",
        paddingHorizontal: 15

    },

    Box: {
        margin: 10,
        height: 100,
        width: 250,
    },
    CategoryBox: {
        margin: 10,
        height: 500,
        width: "100vw",
    },
    Box1: {
        backgroundColor: "#EAF6EF",
    },
    Boxwhite: {
        backgroundColor: "#fff",
    },
    Box2: {
        backgroundColor: "#E9F6FC",
    },
    Box3: {
        backgroundColor: "#F6E4EB",
    },
    Box4: {
        backgroundColor: "#b7e4c7",
    },
    CatBox1: {
        backgroundColor: "#CABDFF",
    },
    CatBox2: {
        backgroundColor: "#B1E5FC",
    },
    CatBox3: {
        backgroundColor: "#FFBC99",
    },

    CatBox4: {
        backgroundColor: "#ECECEC",
    },
    CatBox5: {
        backgroundColor: "#FFD88D",
    },
    CatBox6: {
        backgroundColor: "#F8B0ED",
    },
    radius: {
        borderRadius: 10,
        padding: 10
    },
    circle: {
        borderRadius: 100,
        padding: 10,
    },
    SeeAllradius: {
        borderRadius: 50,
        padding: 16,
    },
    catradius: {
        borderRadius: 100,
        padding: 5
    },
    // ============== detail header Img
    detailHeaderBox: {
        width: '95%',
        height: 200,
        margin: 5,
        backgroundColor: '#00cc00',
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden',

    },
    detailHeaderBoxBgImage: {
        width: 382, height: 255,
    },
    overlayView: {
        height: "100%",
        width: "100%",
        position: 'absolute',
    }

})

export default styles;