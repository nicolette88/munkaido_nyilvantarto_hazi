import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { signOutUser } from '../auth';
import { removeUserData } from '../localStorage';

export default function SettingsPage(props) {
  const handleLogout = async () => {
    await signOutUser();
    await removeUserData();
    props.setUserData(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleLogout()} style={[styles.button, styles.shadow]}>
        <Text style={styles.buttonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 30,
  },
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    color: 'blue',
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
