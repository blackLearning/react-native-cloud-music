import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  albumPic: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 5
  },
  musicInfo: {
    flex: 1,
    alignItems: 'center',
    height: 55,
    flexDirection: 'row'
  },

  songTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5
  },
  artist: {
    fontSize: 10,
    color: '#999'
  },
  iconContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },

  playButtonContainer: {
    paddingTop: 10,
    width: 50,
    height: 50,
  },

  playButton: {
    position: 'absolute',
    top: 5,
  },

  backgroundVideo: {}
});

export default styles;
