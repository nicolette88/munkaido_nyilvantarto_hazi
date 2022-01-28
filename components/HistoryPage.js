import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';

import trashSimpson from '../assets/Trash_simpson.js';
import { getHistory, deleteHistoryById } from '../database';

export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);

  const deleteHistoryItem = () => {
    Alert.alert(
      'Biztos tötöljem?',
      'Biztos törlöd a bejegyzést?',
      [
        { text: 'Mégse', onPress: () => console.log('Mégse'), style: 'cancel' },
        {
          text: 'Törlés',
          onPress: () => {
            const fisrtItemId = history[0].id;
            deleteHistoryById(props.userData.email, fisrtItemId);
            setHistory(history.slice(1));
            props.toggleUserState();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        item.state === 'in' ? styles.containerIn : styles.containerOut,
      ]}>
      <View style={styles.historyTextContainer}>
        <Text style={styles.currentStateText}>{item.date.toDate().toLocaleString('hu-HU')}</Text>
        <Text
          style={[
            styles.currentStateText,
            item.state === 'in' ? styles.currentStateTextIn : styles.currentStateTextOut,
          ]}>
          {item.state === 'in' ? 'bejött' : 'távozott'}
        </Text>
      </View>
      {index === 0 ? (
        <TouchableOpacity onPress={() => deleteHistoryItem()} style={styles.trashButton}>
          <SvgXml xml={trashSimpson} width={50} height={50} style={styles.removeTrashIcon} />
        </TouchableOpacity>
      ) : (
        <Text />
      )}
    </View>
  );

  useEffect(() => {
    (async () => {
      console.log(props.userData.email);
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  removeTrashIcon: {},
  trashButton: {
    position: 'absolute',
    right: 20,
  },
});
