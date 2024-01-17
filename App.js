import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getContents, getContentsByType } from './src/config/firebaseConfig';
import { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default function App() {
  const [loading, setLoading] = useState(false)
  const [contents, setContents] = useState([]);

  const handleContents = async () => {
    setLoading(true)
    try {
      const contents = await getContentsByType("Film")
      setContents(contents)
      console.log("contents", contents)
    } catch (error) {
      console.log("error", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleContents()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={loading}
      />
      <View style={styles.contentsContainer}>
        {contents.map((content, index) => (
          <Text key={index}>{content.isim}</Text>
        ))}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 10
  }
});
