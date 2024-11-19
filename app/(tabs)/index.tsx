import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, View } from 'react-native';
import { Text } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import LogoImage from './images/shortle.jpg'
import React, { useState } from 'react';
import { ButtonGroup } from '../../components/button-group';

const { width } = Dimensions.get('window');

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tag, setTag] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image source={LogoImage} style={styles.logo} resizeMode="cover" />

      </View>

      {/* tags */}
      <ScrollView horizontal style={styles.tagsContainer} showsHorizontalScrollIndicator={false}>
        <View style={styles.tagItem}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.addtagButton}>
              <MaterialIcons name="add" size={24} color="black" />
            </View>
            <Text style={styles.tagText}>Add tag</Text>
          </TouchableOpacity>
        </View>
        {/* Sample tag items with social media icons */}
        {['facebook', 'twitter', 'instagram'].map((platform, index) => (
          <View key={index} style={styles.tagItem}>
            <View style={styles.tagRing}>
              {/* Use MaterialIcons for social media logos */}
              <MaterialIcons name={platform} size={32} color="white" style={styles.iconCenter} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for adding a tag */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Social Media Tag</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter tag (e.g., @username)"
              value={tag}
              onChangeText={setTag}
            />
            <ButtonGroup 
              onSubmit={() => { /* Handle tag submission here */ setModalVisible(false); }} 
              onCancel={() => setModalVisible(false)} 
            />
          </View>
        </View>
      </Modal>

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
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  tagsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tagItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  addtagButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tagRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    overflow: 'hidden',
  },
  tagImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    backgroundColor: '#dedede',
  },
  tagText: {
    fontSize: 12,
    textAlign: 'center',
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
  },
  iconCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }], // Adjust based on icon size
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    color: 'blue',
    marginBottom: 10,
  },
  closeButton: {
    color: 'red',
  },
});
