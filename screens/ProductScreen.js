import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        // Fetch product details from the API
        axios
            .get(`https://fakestoreapi.com/products/${product.id}`)
            .then((response) => {
                setProductDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [product.id]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome
                    name="chevron-left"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Merchant Screen</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
            </View>
            <ScrollView style={styles.detailsContainer}>
                {productDetails && (
                    <>
                        <Text style={styles.productTitle}>{productDetails.title}</Text>
                        <Text style={styles.productPrice}>Price: ${productDetails.price}</Text>
                        <Text style={styles.productDescription}>
                            {productDetails.description}
                        </Text>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    imageContainer: {
        backgroundColor: 'gainsboro',
        alignItems: 'center',
    },
    productImage: {
        width: 200,
        height: 200,
        marginTop: 16,
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 16,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    productDescription: {
        fontSize: 16,
    },
});

export default ProductDetailsScreen;
