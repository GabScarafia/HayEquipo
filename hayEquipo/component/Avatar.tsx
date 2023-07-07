import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Asset, launchCamera, ImagePickerResponse } from 'react-native-image-picker';

interface AvatarProps{
    photo: string | null;
    onChange: (value: string | null) => void; 
}
const Avatar: React.FC<AvatarProps> = ({ photo, onChange }) => {
    const [avatarSource, setAvatarSource] = useState<string | null>(null);

    useEffect(() => {
      setAvatarSource(photo);
    }, [photo]);

  const handleAvatarPress = () => {
    launchCamera({ mediaType: 'photo', includeBase64: true }, (response: ImagePickerResponse) => {
        console.log(response)
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        const image: Asset = response.assets[0];
        const photito = image.base64 || null
        setAvatarSource(photito);
        onChange(photito);
      }
    });
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAvatarPress}>
        {avatarSource ? (
            <Image source={{ uri:`data:image/png;base64,${avatarSource}` }} style={styles.avatar} />
        ) : (
            <Image
                source={require('../assets/default-avatar.png')}
                style={styles.avatar}
            />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Avatar;
