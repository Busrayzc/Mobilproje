import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ShoeStore = () => {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (item) => {
      setCartItems([...cartItems, item]);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ayakkabı Mağazası</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>Spor Ayakkabı</Text>
          <Text style={styles.itemPrice}>$50</Text>
          <Button title="Sepete Ekle" onPress={() => addToCart('Spor Ayakkabı')} />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>Klasik Ayakkabı</Text>
          <Text style={styles.itemPrice}>$70</Text>
          <Button title="Sepete Ekle" onPress={() => addToCart('Klasik Ayakkabı')} />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>Yürüyüş Ayakkabısı</Text>
          <Text style={styles.itemPrice}>$80</Text>
          <Button title="Sepete Ekle" onPress={() => addToCart('Yürüyüş Ayakkabısı')} />
        </View>
        <Text style={styles.cartTitle}>Sepetinizde {cartItems.length} ürün var:</Text>
        {cartItems.map((item, index) => (
          <Text key={index} style={styles.cartItem}>{item}</Text>
        ))}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  cartItem: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default ShoeStore;
