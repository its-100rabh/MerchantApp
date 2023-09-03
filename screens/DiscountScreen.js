import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import ProductDetailsScreen from './ProductScreen';

const DiscountsScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation(); // Initialize the navigation hook

    useEffect(() => {
        // Fetch products from the FakeStoreAPI
        axios
            .get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = (text) => {
        // Filter products based on the search text
        setSearchText(text);
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Function to navigate to the product details screen
    const navigateToProductDetails = (product) => {
        navigation.navigate('Product', { product }); // Navigate to 'ProductDetails' screen with the selected product
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, backgroundColor: "gainsboro" }}>
                <FontAwesome5 style={{ paddingLeft: 15 }} name="bars" size={18} color="#32363b" />
                <Text style={{ fontSize: 30, color: '#32363b' }}>Discounts</Text>
                <FontAwesome style={{ paddingRight: 15 }} name="bell-o" size={24} color="black" />
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for products"
                    onChangeText={handleSearch}
                    value={searchText}
                />
            </View>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity // Wrap the product item with TouchableOpacity
                        onPress={() => navigateToProductDetails(item)} // Navigate to product details when pressed
                    >
                        <View style={styles.productItem}>
                            <View style={styles.imageAndInfo}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.productImage}
                                />
                                <View style={styles.productText}>
                                    <Text style={styles.productTitle}>{item.title}</Text>
                                    <Text style={styles.productPrice}>${item.price}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        backgroundColor: 'darkgrey',
        padding: 16,
        paddingBottom: 10,
    },
    searchInput: {
        marginTop: 10,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: "white",
    },
    productItem: {
        marginTop: 10,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: 'grey',
        paddingBottom: 16,
    },
    imageAndInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 8,
    },
    productText: {
        flex: 1,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
});

export default DiscountsScreen;
