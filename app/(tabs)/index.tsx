import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import LogoImage from './shortle.jpg'

const { width } = Dimensions.get('window');

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} resizeMode="cover" />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories */}
      <ScrollView horizontal style={styles.storiesContainer} showsHorizontalScrollIndicator={false}>
        <View style={styles.storyItem}>
          <View style={styles.addStoryButton}>
            <MaterialIcons name="add" size={24} color="black" />
          </View>
          <Text style={styles.storyText}>Your story</Text>
        </View>
        {/* Sample story items */}
        {['JBL22', 'Mark', 'Hera'].map((name, index) => (
          <View key={index} style={styles.storyItem}>
            <View style={styles.storyRing}>
              <View style={styles.storyImage} />
            </View>
            <Text style={styles.storyText}>{name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Profile Card */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: width > 600 ? '100%' : 'auto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 25,
    paddingBottom: 8,
    marginRight: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  storiesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  addStoryButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: '#ff8501',
    marginBottom: 4,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    backgroundColor: '#dedede',
  },
  storyText: {
    fontSize: 12,
  },
  feed: {
    flex: 1,
  },
  post: {
    width: '100%',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  smallProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff8501',
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
  },
  imageGrid: {
    flexDirection: 'row',
    height: 400,
    gap: 2,
    paddingHorizontal: 16,
  },
  mainImage: {
    flex: 2,
    backgroundColor: '#dedede',
    borderRadius: 4,
  },
  sideImages: {
    flex: 1,
    gap: 2,
  },
  sideImage: {
    flex: 1,
    backgroundColor: '#dedede',
    borderRadius: 4,
  },
  logo: {
    width: 110,
    height: 80,
    borderRadius: 40,
    marginRight: 120
  },
});
