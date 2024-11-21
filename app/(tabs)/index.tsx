import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, View } from 'react-native';
import { Text } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import LogoImage from './images/shortle.jpg';
import FacebookImage from './images/facebook.png'; // Local import for Facebook image
import TwitterImage from './images/xlogo.png';   // Local import for Twitter image
import InstagramImage from './images/instagram.png'; // Local import for Instagram image
import LinkedinImage from './images/linkedIn.png'; // Local import for LinkedIn image
import GithubImage from './images/github.png'; // Local import for GitHub image
import YoutubeImage from './images/youtube.png'; // Local import for YouTube image
import TikTokImage from './images/tiktok.png'; // Local import for TikTok image
import PinterestImage from './images/pinterest.png'; // Local import for Pinterest image
import SnapchatImage from './images/snapchat.png'; // Local import for Snapchat image
import React, { useState } from 'react';
import { ButtonGroup } from '../../components/button-group'; // Adjusted import path
import { Card, CardContent } from '@/components/ui/card'; // Import Card and CardContent
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG'
// Add this near other imports


const { width } = Dimensions.get('window');

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tag, setTag] = useState('@');
  const [tags, setTags] = useState<{ name: string; image: any }[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<{ name: string; image: any; color: string } | null>(null); // Include color in selected tag

  const socialMediaLinks = [
    { name: 'Facebook', image: FacebookImage, url: 'https://facebook.com', color: '#1877F2' },
    { name: 'Twitter', image: TwitterImage, url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Instagram', image: InstagramImage, url: 'https://instagram.com', color: '#E4405F' },
    { name: 'LinkedIn', image: LinkedinImage, url: 'https://linkedin.com', color: '#0A66C2' },
    { name: 'GitHub', image: GithubImage, url: 'https://github.com', color: '#181717' },
    { name: 'YouTube', image: YoutubeImage, url: 'https://youtube.com', color: '#FF0000' },
    { name: 'TikTok', image: TikTokImage, url: 'https://tiktok.com', color: '#000000' },
    { name: 'Pinterest', image: PinterestImage, url: 'https://pinterest.com', color: '#BD081C' },
    { name: 'Snapchat', image: SnapchatImage, url: 'https://snapchat.com', color: '#FFFC00' }, // Added Snapchat
  ];

  const handleAddTag = () => {
    if (tag && selectedIcon) {
      const selectedSocial = socialMediaLinks.find(social => social.name === selectedIcon);
      if (selectedSocial) {
        setTags([...tags, { name: tag, image: selectedSocial.image }]);
      }
      setTag('@');
      setSelectedIcon(null);
      setModalVisible(false);
    }
  };

  const handleTagClick = (tag: { name: string; image: any; color: string }) => {
    setSelectedTag(tag); // Set the selected tag for QR code display
  };

  const selectIcon = (name: string) => {
    setSelectedIcon(name === selectedIcon ? null : name);
  };

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

      {/* Tags Container */}
      <View style={styles.tagsContainer}>
        <View style={styles.tagItem}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.addtagButton}>
              <MaterialIcons name="add" size={24} color="white" />
            </View>
            <Text style={styles.tagText}>Add tag</Text>
          </TouchableOpacity>
        </View>

        {/* Render placeholders if no tags are added */}
        {tags.length === 0 && (
          <>
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
          </>
        )}

        {/* Render added tags in a Card */}
        <Card style={styles.card}>
          <CardContent>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} // Hide default scrollbar
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 5, paddingVertical: 2 }} // Add padding for better spacing
            >
              {tags.map((platform, index) => (
                <TouchableOpacity key={index} onPress={() => handleTagClick(platform)}> {/* Handle tag click */}
                  <View style={styles.tagItem}>
                    <View style={styles.tagRing}>
                      <Image source={platform.image} style={styles.tagImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </CardContent>
        </Card>
      </View>

      {/* Modal for adding a tag */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tags</Text>
            {/* Social Media Icons at the top of the modal */}
            <View style={styles.iconGrid}>
              {socialMediaLinks.map((social) => (
                <TouchableOpacity
                  key={social.name}
                  onPress={() => selectIcon(social.name)}
                  style={[
                    styles.iconButton,
                    selectedIcon === social.name ? styles.iconSelected : styles.iconDefault,
                  ]}
                  aria-label={`Select ${social.name}`}
                  aria-pressed={selectedIcon === social.name}
                >
                  <Image
                    source={social.image} // Use the local image
                    style={styles.iconImage} // Apply styles to the image
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="tag (e.g., @username)"
              value={tag}
              onChangeText={text => setTag(text.startsWith('@') ? text : `@${text}`)}
            />
            
            {/* Connect Button */}
            <TouchableOpacity 
              style={styles.connectButton} 
              onPress={() => {
                handleAddTag(); // Call the function to add the tag
                setModalVisible(false); // Close the modal
              }}
            >
              <Text style={styles.connectButtonText}>
                {selectedIcon ? `Connect ${selectedIcon}` : 'Connect'} {/* Dynamic button text */}
              </Text>
            </TouchableOpacity>
            <ButtonGroup 
              onSubmit={handleAddTag}
              onCancel={() => setModalVisible(false)} 
            />
          </View>
        </View>
      </Modal>

      {/* Modal for displaying QR code */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedTag} // Show modal if a tag is selected
        onRequestClose={() => setSelectedTag(null)} // Close modal
      >
        <View style={styles.modalView}>
          <View style={[styles.modalContent, { backgroundColor: selectedTag?.color || '#fff' }]}> {/* Set modal background color */}
            <Text style={styles.modalTitle}>{selectedTag?.name}</Text>
            <QRCodeSVG
              value={selectedTag?.name} // Use the tag name for QR code
              size={150}
              bgColor={"#ffffff"} // Background color of the QR code
              fgColor={selectedTag?.color || '#000000'} // Match QR code foreground color to the selected social media icon color
              level={"L"}
              includeMargin={false}
            />
            <TouchableOpacity onPress={() => setSelectedTag(null)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Card */}
      {/* Profile Card */}
<View style={styles.profileCardContainer}>
  <View style={styles.profileCard}>
    <View style={styles.profileImageContainer}>
      <Image
        source={require('./images/prof.jpeg')}
        style={styles.profileImage}
      />
    </View>
    <View style={styles.profileContent}>
      <Text style={styles.profileName}>Moses. Gamaseb</Text>
      <Text style={styles.profileBio}>Talk to me about Formula 1 ✨</Text>
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={16} color="#666" />
        <Text style={styles.locationText}>Walvis Bay, Namibia</Text>
      </View>
      {/* QR Code Button */}
<TouchableOpacity
  style={styles.qrButton}>
  <MaterialIcons name="qr-code" size={24} color="white" />
</TouchableOpacity>

    </View>
  </View>
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Align items at the start
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
  qrButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#26a69a',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 25,
  marginTop: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},
qrButtonText: {
  color: 'white',
  marginLeft: 8,
  fontSize: 16,
  fontWeight: '500',
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
    flexDirection: 'row', // Use flex direction for horizontal scrolling
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 300, // Set to 100% to allow full width
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden', // Ensure the card has rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  tagItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  addtagButton: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#26a69a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tagRing: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tagImage: {
    width: 32, // Set the width for the icon image
    height: 32, // Set the height for the icon image
    resizeMode: 'contain', // Ensure the image scales properly
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '80%', // Adjusted width for the modal
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
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
    marginTop: 5
  },
  submitButton: {
    color: 'blue',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d', // Example color for close button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  placeholder: {
    width: 64, // Set a standard width for the placeholder
    height: 64, // Set a standard height for the placeholder
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dotted', // Dotted border style
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconButton: {
    width: 64, // Set the width for the icon button
    height: 64, // Set the height for the icon button
    borderRadius: 32, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Add border width
    borderColor: 'transparent', // Default border color
    margin: 5, // Add margin between buttons
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow radius
    elevation: 5, // For Android shadow
  },
  iconSelected: {
    borderColor: 'blue', // Change border color to blue when selected
  },
  iconDefault: {
    // Default styles for unselected icons
  },
  iconImage: {
    width: 32, // Set the width for the icon image
    height: 32, // Set the height for the icon image
  },
  gridContainer: {
    flexDirection: 'row', // Equivalent to grid layout
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'space-between', // Space between items
    paddingVertical: 16, // Equivalent to py-4
    paddingHorizontal: 8, // Adjust as needed for horizontal spacing
  },
  iconGrid: {
    flexDirection: 'row', // Use flex direction for grid layout
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'space-between', // Space between items
    paddingVertical: 16, // Equivalent to py-4
    paddingHorizontal: 8, // Adjust as needed for horizontal spacing
  },
  connectButton: {
    backgroundColor: '#26a69a', // Button color
    borderRadius: 8, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    marginVertical: 10, // Margin for spacing
    alignItems: 'center', // Center the text
    width: '100%', // Full width
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  connectButtonText: {
    color: 'white', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },// Add to the existing styles object
  profileCardContainer: {
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 19,
    flex: 1, // Add this to take up available space
},
  
profileCard: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 24,
    width: '90%',
    maxWidth: 320,
    alignItems: 'center',
    justifyContent: 'center', // Add this
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.09,
    shadowRadius: 50,
    elevation: 5,
},
  
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 64,
    overflow: 'hidden',
    marginBottom: 16,
  },
  
  profileImage: {
    width: '100%',
    height: '100%',
  },
  
  profileContent: {
    alignItems: 'center',
    width: '100%',
  },
  
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  profileBio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  profileEmoji: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
    marginTop: 20,
  },
  
  profileStatus: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  }
  
});


