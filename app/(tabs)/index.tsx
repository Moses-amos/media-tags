import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, View, Animated } from 'react-native';
import { Text } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import LogoImage from './images/shortle.jpg';
import FacebookImage from './images/facebook.png';
import XImage from './images/xlogo.png';
import InstagramImage from './images/instagram.png';
import LinkedinImage from './images/linkedIn.png';
import GithubImage from './images/github.png';
import YoutubeImage from './images/youtube.png';
import TikTokImage from './images/tiktok.png';
import TelegramImage from './images/telegram.png';
import WhatsAppImage from './images/whatsAppicon.png';
import PinterestImage from './images/pinterest.png'; // Local import for Pinterest image
import SnapchatImage from './images/snapchat.png'; // Local import for Snapchat image
import ViberImage from './images/viber.png';
import MessengerImage from './images/messanger.png';

import FaceBookBackgrounded from './images/backgroundedImages/facebook.png';
import InstagramBackgrounded from './images/backgroundedImages/instagram.png';
import LinkedInBackgrounded from './images/backgroundedImages/linkedIn.png';
import XBackgrounded from './images/backgroundedImages/xlogo.png';
import SnapChatBackgrounded from './images/backgroundedImages/snapchat.png';
import PinterestBackgrounded from './images/backgroundedImages/pinterest.png';
import TikTokBackgrounded from './images/backgroundedImages/tiktok.png';
import YoutubeBackgrounded from './images/backgroundedImages/youtube.png';
import GithubBackgrounded from './images/backgroundedImages/github.png';

import { LinearGradient } from 'expo-linear-gradient';

import React, { useState } from 'react';
import { ButtonGroup } from '../../components/button-group'; // Adjusted import path
import { Card, CardContent } from '@/components/ui/card'; // Import Card and CardContent
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG'
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

// Add this near other imports

const { width } = Dimensions.get('window');

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tag, setTag] = useState('@');
  const [tags, setTags] = useState<{ name: string; image: any }[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedChatApp, setSelectedChatApp] = useState('Messenger');
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [ShowAllTagsLogo, setShowAllTagsLogo] = useState(true);

  const [selectedTag, setSelectedTag] = useState<{ 
    name: string; 
    image: any; 
    color: string; 
    qrData?: string 
  } | null>(null);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ollie Bearman",
    bio: "✨ I really like Formula 1 ✨",
    location: "Chelmsford",
    image: require('./images/backgroundedImages/ollie.jpg'),
    bgColor: '#26a69a',
    borderColor: '#4db6ac',
    chatApp: null,
    isPublic: true
  });

  const [followedPlatforms, setFollowedPlatforms] = useState<{ [key: string]: boolean }>({});

  const handleFollow = (platformName: string) => {
    setFollowedPlatforms(prev => ({
      ...prev,
      [platformName]: !prev[platformName]
    }));
  };

  const [pressedChat, setPressedChat] = useState<{[key: string]: boolean}>({});

  const handleChatPress = (profileId: string) => {
    setPressedChat(prev => ({
      ...prev,
      [profileId]: true
    }));
    
    // Reset the pressed state after a short delay
    setTimeout(() => {
      setPressedChat(prev => ({
        ...prev,
        [profileId]: false
      }));
    }, 200);
  };

  const profiles = [
    {
      ...profileData, // Keep the first profile editable
    },

    {
      name: "Lando Norris",
      bio: "Photography enthusiast 📸",
      location: "Bristol",
      image: require('./images/backgroundedImages/lando.jpeg'),
      bgColor: '#5c6bc0',
      borderColor: '#7986cb'
    },
    {
      name: "Oscar Piastri",
      bio: "Digital Artist 🎨",
      location: "Melbourne",
      image: require('./images/backgroundedImages/Oscar.jpg'),
      bgColor: '#ff5722',
      borderColor: '#ff7043'
    }
  ];

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add this function to handle card transitions
  const handleNextCard = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
      setTimeout(() => setIsAnimating(false), 300); // Match with animation duration
    }
  };

  const socialMediaLinks = [
    { 
      name: 'Facebook', 
      image: FacebookImage, 
      url: 'https://facebook.com', 
      gradient: ['#1877F2', '#0A4FA8']  // Facebook blue gradient
    },
    { 
      name: 'X', 
      image: XImage, 
      url: 'https://x.com', 
      gradient: ['#1DA1F2', '#0C85D0']  // x blue gradient
    },
    { 
      name: 'Instagram', 
      image: InstagramImage, 
      url: 'https://instagram.com', 
      gradient: ['#E4405F', '#D81F5A']  // Instagram pink gradient
    },
    { 
      name: 'LinkedIn', 
      image: LinkedinImage, 
      url: 'https://linkedin.com', 
      gradient: ['#0A66C2', '#004182']  // LinkedIn blue gradient
    },
    { 
      name: 'GitHub', 
      image: GithubImage, 
      url: 'https://github.com', 
      color: '#181717' 
    },
    { 
      name: 'YouTube', 
      image: YoutubeImage, 
      url: 'https://youtube.com', 
      color: '#FF0000' 
    },
    { 
      name: 'TikTok', 
      image: TikTokImage, 
      url: 'https://tiktok.com', 
      color: '#000000' 
    },
    { 
      name: 'Pinterest', 
      image: PinterestImage, 
      url: 'https://pinterest.com', 
      color: '#BD081C' 
    },
    { 
      name: 'Snapchat', 
      image: SnapchatImage, 
      url: 'https://snapchat.com', 
      color: '#FFFC00' 
    }, // Added Snapchat
  ];

  const SocialMediaLogos = [
    { 
      name: 'Facebook', 
      image: FaceBookBackgrounded, 
      url: 'https://facebook.com', 
      gradient: ['#1877F2', '#0A4FA8']  // Facebook blue gradient
    },
    { 
      name: 'X', 
      image: XBackgrounded, 
      url: 'https://x.com', 
      gradient: ['#1DA1F2', '#0C85D0']  // x blue gradient
    },
    { 
      name: 'Instagram', 
      image: InstagramBackgrounded, 
      url: 'https://instagram.com', 
      gradient: ['#E4405F', '#D81F5A']  // Instagram pink gradient
    },
    { 
      name: 'LinkedIn', 
      image: LinkedInBackgrounded, 
      url: 'https://linkedin.com', 
      gradient: ['#0A66C2', '#004182']  // LinkedIn blue gradient
    },
    { 
      name: 'Pinterest', 
      image: PinterestBackgrounded, 
      url: 'https://pinterest.com', 
      gradient: ['#BD081C', '#8B0000']  // Pinterest red gradient
    },
    { 
      name: 'Snapchat', 
      image: SnapChatBackgrounded, 
      url: 'https://snapchat.com', 
      gradient: ['#FFFC00', '#FDEE00']  // Snapchat yellow gradient
    },
    { 
      name: 'TikTok', 
      image: TikTokBackgrounded, 
      url: 'https://tiktok.com', 
      gradient: ['#000000', '#000000']  // TikTok black gradient
    },
    { 
      name: 'YouTube', 
      image: YoutubeBackgrounded, 
      url: 'https://youtube.com', 
      gradient: ['#FF0000', '#FF0000']  // YouTube red gradient
    },
    { 
      name: 'GitHub', 
      image: GithubBackgrounded, 
      url: 'https://github.com', 
      gradient: ['#181717', '#181717']  // GitHub black gradient
    }
  ];

  const chatApps = [
    { name: 'WhatsApp', image: WhatsAppImage },
    { name: 'Messenger', image: MessengerImage },
    { name: 'Telegram', image: TelegramImage },
    { name: 'Viber', image: ViberImage },
  ];

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
          setProfileData(prev => ({ ...prev, image: { uri: result.assets[0].uri } })); // Update profile image
        }
      };

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
  setSelectedTag({ ...tag, qrData: tag.name }); // Set the selected tag for QR code display
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
                <TouchableOpacity key={index} onPress={() => {handleTagClick(platform); setShowAllTagsLogo(false)}}> {/* Handle tag click */}
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

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditProfileModalVisible}
        onRequestClose={() => setIsEditProfileModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.modalContentContainer}>
            <View style={styles.modalContentEdit}>
            <View style={styles.modalHeader}>
            <TouchableOpacity 
                  style={styles.closeButtonProfile}
                  onPress={() => setIsEditProfileModalVisible(false)}
                >
                  <MaterialIcons 
                    name="close" 
                    size={24} 
                    color="#666" 
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
              {/* Profile Picture Edit */}
              <TouchableOpacity style={styles.profileImageEdit} onPress={pickImage}>
                <Image
                  source={profileData.image}
                  style={styles.editProfileImage}
                />
                <View style={styles.editImageOverlay}>
                  <MaterialIcons name="camera-alt" size={20} color="white" />
                </View>
              </TouchableOpacity>

              {/* Name Input */}
              <TextInput
                style={styles.editInput}
                placeholder="Name"
                value={profileData.name}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
              />

              {/* Bio Input */}
              <TextInput
                style={[styles.editInput, styles.bioInput]}
                placeholder="Bio"
                value={profileData.bio}
                onChangeText={(text) => setProfileData(prev => ({ ...prev, bio: text }))}
                multiline
              />

              {/* Location Input */}
              <View style={styles.locationInputContainer}>
                <MaterialIcons name="location-on" size={20} color="#666" />
                <TextInput
                  style={[styles.editInput, styles.locationInput]}
                  placeholder="Location"
                  value={profileData.location}
                  onChangeText={(text) => setProfileData(prev => ({ ...prev, location: text }))}
                />
              </View>

              {/* Chat Apps Selection */}
              <Text style={styles.sectionTitle}>Select Chat</Text>
              <View style={styles.chatAppsContainer}>
                {chatApps.map((app) => (
                  <TouchableOpacity
                    key={app.name}
                    style={[
                      styles.chatAppButton,
                      selectedChatApp === app.name && styles.chatAppButtonSelected
                    ]}
                    onPress={() => setSelectedChatApp(app.name)}
                  >
                    <Image source={app.image} style={styles.chatAppIcon} />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Privacy Toggle */}
              <View style={styles.privacyToggleContainer}>
                <Text style={styles.privacyLabel}>Share Chat</Text>
                <TouchableOpacity
                  style={[
                    styles.privacyToggle,
                    { backgroundColor: isProfilePublic ? '#26a69a' : '#666' }
                  ]}
                  onPress={() => setIsProfilePublic(!isProfilePublic)}
                >
                  <Text style={styles.privacyToggleText}>
                    {isProfilePublic ? 'Public' : 'Private'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Save Button */}
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setIsEditProfileModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsEditProfileModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Profile Card */}
      <View style={styles.profileCardContainer}>
  {profiles.map((profile, index) => {
    const offset = index - currentIndex;
    const isVisible = offset >= 0 && offset < 3; // Show only next 3 cards

    if (!isVisible) return null;

    return (
      <Animated.View
        key={index}
        style={[
          styles.profileCard,
          {
            backgroundColor: profile.bgColor,
            borderColor: profile.borderColor,
            position: 'absolute',
            transform: [
              { translateY: offset * 20 }, // Stack cards with vertical offset
              { translateX: offset * 20 }, // Add slight horizontal offset
              { scale: 1 - (offset * 0.05) }, // Slightly scale down each card
            ],
            opacity: 1 - (offset * 0.2), // Fade out cards progressively
            zIndex: profiles.length - offset, // Stack order
          }
        ]}
      >
        {index === 0 ? (
          // Original layout for the first card
          <>
            <TouchableOpacity 
              style={[
                styles.settingsButton, 
                { 
                  backgroundColor: profile.borderColor,
                  position: 'absolute', 
                  top: 12, 
                  right: 12, 
                  width: 36, 
                  height: 36, 
                  borderRadius: 18, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  zIndex: 1, 
                  shadowColor: '#000', 
                  shadowOffset: { width: 0, height: 2 }, 
                  shadowOpacity: 0.25, 
                  shadowRadius: 3.84, 
                  elevation: 5 
                }
              ]}
              onPress={() => setIsEditProfileModalVisible(true)}
            >
              <MaterialIcons name="settings" size={19} color="white" />
            </TouchableOpacity>
            <View style={[styles.profileImageContainer, { borderColor: profile.borderColor, borderWidth: 5 }]}>
              <Image
                source={profile.image}
                style={styles.profileImageFirst}
              />
            </View>

            <View style={styles.profileContent}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileBioFirst}>{profile.bio}</Text>
              <TouchableOpacity 
                style={[
                  styles.locationContainerFirst,
                  {
                    backgroundColor: profile.borderColor,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.10,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }
                ]}
                onPress={() => {/* handle location press */}}
              >
                <MaterialIcons name="location-on" size={16} color="white" />
                <Text style={[styles.locationText, { color: 'white' }]}>{profile.location}</Text>
              </TouchableOpacity>
              <View style={styles.actionButtonsContainer}>
                <View style={styles.actionButtonsWrapper}>
                  <View style={styles.buttonSpacer} />
                  
                  <TouchableOpacity
                    style={[
                      styles.qrButton, 
                      { 
                        backgroundColor: profile.borderColor,
                        width: 48, 
                        height: 48, 
                        borderRadius: 24, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        shadowColor: '#000', 
                        shadowOffset: { width: 0, height: 2 }, 
                        shadowOpacity: 0.25, 
                        shadowRadius: 3.84, 
                        elevation: 5 
                      }
                    ]}
                    onPress={() => {
                      if (tags.length > 0) {
                        const tagsData = tags.map(tag => tag.name).join('\n');
                        setSelectedTag({ name: 'All tags', image: null, color: profile.borderColor, qrData: tagsData });
                      } else {
                        setModalVisible(true);
                      }
                    }}
                  >
                    <MaterialIcons name="qr-code" size={24} color="white" />
                  </TouchableOpacity>

                  {isProfilePublic && selectedChatApp && (
                    <TouchableOpacity
                      style={[
                        styles.chatButtonFirst,
                        { backgroundColor: profile.borderColor }
                      ]}
                      onPress={() => {/* handle chat app action */}}
                    >
                      <Image 
                        source={chatApps.find(app => app.name === selectedChatApp)?.image}
                        style={styles.chatIconFirst}
                      />
                    </TouchableOpacity>
                  )}
                  {(!isProfilePublic || !selectedChatApp) && <View style={styles.buttonSpacer} />}
                </View>
              </View>
            </View>
          </>
        ) : (
          // New layout for subsequent cards
          <>
            <View style={styles.newCardHeader}>
              <View style={styles.newCardInfo}>
                <View style={styles.nameLocationContainer}>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <View style={styles.locationContainer}>
                    <MaterialIcons name="location-on" size={16} color="white" />
                    <Text style={[styles.locationText, { color: 'white' }]}>{profile.location}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.chatButton,
                      pressedChat[profile.name] && styles.chatButtonPressed
                    ]}
                    onPress={() => handleChatPress(profile.name)}
                  >
                    <Text style={styles.chatButtonText}>Chat</Text>
                    <Image 
                      source={index === 2 ? ViberImage : TelegramImage} 
                      style={styles.chatIcon} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.newProfileImageContainer, { borderColor: profile.borderColor, borderWidth: 3 }]}>
                <Image
                  source={profile.image}
                  style={[
                    styles.profileImage,
                    {
                      borderWidth: 3,
                      borderColor: profile.borderColor,
                      borderRadius: 50,
                    }
                  ]}
                />
              </View>
            </View>
            
            <Text style={styles.profileBio}>{profile.bio}</Text>
            
            <View style={styles.socialButtonsContainer}>
              {SocialMediaLogos.slice(0, 4).map((platform, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.socialButtonWrapper}
                  onPress={() => handleFollow(platform.name)}
                >
                  {followedPlatforms[platform.name] ? (
                    <View style={[styles.socialButton, styles.socialButtonFollowed]}>
                      <Image source={platform.image} style={styles.socialButtonIcon} />
                      <Text style={styles.socialButtonTextFollowed}>Followed</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={platform.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.socialButton}
                    >
                      <Image source={platform.image} style={styles.socialButtonIcon} />
                      <Text style={styles.socialButtonText}>Follow</Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.closedButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.closedButton,
                  {
                    backgroundColor: profile.borderColor,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }
                ]}
                onPress={() => {/* handle save press */}}
              >
                <Text style={styles.closedButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>
    );
  })}
  <TouchableOpacity 
    style={[styles.nextButton, isAnimating && styles.nextButtonDisabled]}
    onPress={handleNextCard}
  >
    <MaterialIcons name="chevron-right" size={24} color="#000" />
  </TouchableOpacity>
</View>
<Modal
  animationType="slide"
  transparent={true}
  visible={!!selectedTag}
  onRequestClose={() => setSelectedTag(null)}
>
  <View style={styles.modalView}>
    <View style={[styles.modalContentwo, { backgroundColor: selectedTag?.color || '#fff' }]}>
      {selectedTag?.image && (
        <Image
          source={selectedTag.image}
          style={styles.modalLogo}
          resizeMode="contain"
        />
      )}
      <Text style={styles.modalTitle}>{selectedTag?.name}</Text>
          {ShowAllTagsLogo ? (
            <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsScrollContainer}
      >
        {tags.map((tag, index) => (
          <Image
            key={index}
            source={tag.image}
            style={styles.qrTagLogo}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
          )
        :
        (<></>)}
           
      <QRCodeSVG
        value={selectedTag?.qrData || selectedTag?.name || ''}
        size={150}
        bgColor={"#ffffff"}
        fgColor={selectedTag?.color || '#000000'}
        level={"L"}
        includeMargin={false}
      />
      <TouchableOpacity onPress={() => {setSelectedTag(null); setShowAllTagsLogo(true)}} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

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
    paddingTop: 12,
    paddingBottom: 8,
  },
  qrButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    paddingVertical: 2,
    paddingHorizontal: 0,
    width: 310, // Set to 100% to allow full width
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
    marginRight: 14,
  },
  settingsButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsIcon: {
    // opacity: 0.8,
  },
  modalLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
  qrTagLogo: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  tagsScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  nextButtonDisabled: {
    opacity: 0.5,
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
    width: 50, // Set the width for the icon image
    height: 50, // Set the height for the icon image
    resizeMode: 'contain', // Ensure the image scales properly
    borderRadius: 15,
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
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  closeButtonProfile: {
    position: 'relative',
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(229, 231, 235, 0.6)', // bg-gray-200 with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: '#666', // text-gray-600
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
  chatAppsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  
  chatAppButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  
  chatAppButtonSelected: {
    borderColor: '#26a69a',
    backgroundColor: 'rgba(38, 166, 154, 0.1)',
  },
  
  chatAppIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  
  privacyToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },
  
  privacyLabel: {
    fontSize: 16,
    color: '#666',
  },
  
  privacyToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  privacyToggleText: {
    color: 'white',
    fontWeight: '500',
  },
  
  actionButtonsContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  actionButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  buttonSpacer: {
    width: 48, // Same width as buttons for symmetry
  },
  
  chatButtonFirst: {
    width: 38,
    height: 38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatIconFirst: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: [{ scale: 0.96 }],
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  chatButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
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
  modalContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    width: '80%', // Adjusted width for the modal
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  modalScrollView: {
    width: '100%',
    maxHeight: '90%',
  },
  editInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  
  locationInput: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 0,
  },
  
  profileImageEdit: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  
  editProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  
  editImageOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#26a69a',
    borderRadius: 15,
    padding: 6,
  },
  
  saveButton: {
    backgroundColor: '#26a69a',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  cancelButton: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContentEdit: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleEdit: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContentwo: {
    width: '80%', // Adjusted width for the modal
    maxWidth: 400,
    borderRadius: 40,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
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
    backgroundColor: '#e0e0e0', // Example color for close button
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
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
    marginRight: 14,
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
    width: 38, // Set the width for the icon image
    height: 38, // Set the height for the icon image
    resizeMode: 'contain',
    borderRadius: 10,
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
    marginTop: 12,
    height: 450, // Increased height to accommodate stacked cards
    position: 'relative',
},
profileCard: {
  borderRadius: 32,
  padding: 24,
  width: '90%',
  maxWidth: 320,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 8,
  transition: 'all 0.3s ease-out',
},

nextButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(10px)',
  zIndex: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
  elevation: 5,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
},
  
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
  },
  
  profileImageFirst: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  
  profileContent: {
    alignItems: 'center',
    width: '100%',
  },
  profileBioFirst: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
    marginTop: 8,
    textAlign: 'center',
  },
  profileEmoji: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  locationContainerFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  
  locationText: {
    fontSize: 14,
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
  },
  newCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  newCardInfo: {
    flex: 1,
    paddingRight: 16,
  },
  newProfileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
  },
  socialButtonWrapper: {
    width: '46%',
    shadowColor: '#000',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  socialButtonFollowed: {
    backgroundColor: '#E5E7EB',
  },
  socialButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 10
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  socialButtonTextFollowed: {
    color: '#4B5563',
  },
  profileBio: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  nameLocationContainer: {
    alignItems: 'flex-start',
    marginLeft: -8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 8,
  },
  closedButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  closedButton: {
    width: 80,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  closedButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});