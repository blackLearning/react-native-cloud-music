import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  Image
} from 'react-native';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import detailActionCreators from 'ACTIONS/currentPlayListDetail';
import playerActionCreators from 'ACTIONS/player';
import color from 'THEMES/color';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // PlayList Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    height: 50
  },
  headerText: { color: '#fff', fontSize: 18, flex: 1 },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: 'transparent',
    height: 45,
    width: 45,
    margin: 0
  },

  // PlayList Section

  playListInfo: {
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },

  playListSection: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },

  playListCover: {
    position: 'relative',
    marginRight: 15
  },
  sectionItemLabel: {
    position: 'absolute',
    right: 5,
    top: 5,
    flexDirection: 'row'
  },
  sectionItemLabelText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 5
  },

  playListDesc: {
    justifyContent: 'flex-start',
    flex: 1
  },

  playListTitle: {
    color: '#fff',
    marginTop: 7,
    fontSize: 20,
    flexWrap: 'wrap'
  },

  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  creatorName: {
    color: '#f0f0f0',
    fontSize: 12,
    marginLeft: 5,
    marginRight: 3
  },

  avatar: {
    width: 20,
    height: 20
  },

  // PlayList OperatorBar

  operateBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  operateItem: {
    flex: 1,
    alignItems: 'center'
  },
  operateText: {
    color: '#fff'
  },

  // PlayList songs

  playAllContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  playAll: {
    flex: 1,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  playAllText: {
    color: '#333',
    marginLeft: 15,
    fontSize: 16
  },
  playAllCountText: {
    fontSize: 14,
    color: '#999'
  },

  selectAll: {
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },

  selectAllText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333'
  }
});

const songItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 65
  },

  songOrder: {
    width: 65,
    textAlign: 'center',
    color: '#999',
    fontSize: 18
  },

  songInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#f1f1f1',
    height: 65,
    borderBottomWidth: 1
  },

  songInfo: {
    flex: 1
  },

  songName: {
    fontSize: 14,
    color: '#333'
  },

  songCreator: {
    fontSize: 12,
    color: '#999'
  },

  songMore: {
    paddingRight: 20,
    height: 65,
    justifyContent: 'center',
    paddingLeft: 10
  }
});
const loadingStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200
  },
  loadingText: {
    color: '#333',
    fontSize: 12,
    marginLeft: 8
  }
});

@connect(
  state => ({
    detail: state.currentPlayListDetail,
    isFetching: state.currentPlayListDetail.isFetching
  }),
  Object.assign({}, detailActionCreators, playerActionCreators)
)
export default class PlayListDetail extends React.Component {
  state = {
    isDrawerOpen: false
  };

  componentDidMount() {
    const { playListBasicInfo } = this.props.navigation.state.params;
    this.props.getDetail(playListBasicInfo.id);
  }

  onSongPress = song => {
    this.props.play(song);
    this.props.addPlayList(this.songsData);
  };

  playAll = () => {
    this.props.playAll(this.songsData);
  };

  openControlPanel = () => {
    this.setState({ isDrawerOpen: true });
  };

  render() {
    const { playListBasicInfo } = this.props.navigation.state.params;
    const { goBack } = this.props.navigation;
    const { playlist } = this.props.detail;
    const { isFetching } = this.props;
    if (!playlist) return null;

    const songsData = playlist.tracks.map((track, index) => ({
      order: index + 1,
      key: track.id,
      id: track.id,
      name: track.name,
      alia: track.alia.join(','),
      artist: track.ar.map(item => item.name).join('/'),
      album: track.al.name,
      picUrl: track.al.picUrl
    }));
    this.songsData = songsData;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0, 0, 0, .3)" />
        <View style={styles.header}>
          <Icon
            type="ionicon"
            size={35}
            reverse
            color="rgba(0,0,0,.1)"
            reverseColor="#fff"
            name="ios-arrow-round-back"
            containerStyle={styles.iconContainer}
            onPress={() => goBack(null)}
          />
          <Text style={styles.headerText}>歌单</Text>
          <View style={styles.headerRight}>
            <Icon
              type="feather"
              size={22}
              reverse
              reverseColor="#fff"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.iconContainer}
              onPress={() => goBack(null)}
              name="search"
            />
            <Icon
              type="entypo"
              size={20}
              reverse
              reverseColor="#fff"
              color="rgba(0,0,0,.1)"
              containerStyle={styles.iconContainer}
              onPress={() => goBack(null)}
              name="dots-three-vertical"
            />
          </View>
        </View>

        <Drawer
          side="bottom"
          type="overlay"
          tapToClose
          acceptTap
          panCloseMask={0.6}
          openDrawerOffset={0.6}
          useInteractionManager
          open={this.state.isDrawerOpen}
          style={{
            drawer: {
              shadowColor: '#000000',
              shadowOpacity: 0.8,
              shadowRadius: 3,
            },
            drawerOverlay: {
              backgroundColor: '#00000'
            },
            mainOverlay: {
              background: '#00000'
            }
          }}
          content={
            <View style={{
              width,
              height: 300,
              position: 'relative',
              zIndex: 9999,
              backgroundColor: '#fff'
            }}
            >
              <Text>1234ss44</Text>
            </View>
          }
        >
          <ScrollView>
            <View style={styles.playListInfo}>
              <View style={styles.playListSection}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.playListCover}
                  onPress={() => {}}
                >
                  <Image
                    source={{ uri: playListBasicInfo.picUrl }}
                    style={{ width: 140, height: 140 }}
                    resizeMode="contain"
                  />
                  <View style={styles.sectionItemLabel}>
                    <Icon
                      type="feather"
                      name="headphones"
                      size={11}
                      color="white"
                    />
                    <Text style={styles.sectionItemLabelText}>
                      {playListBasicInfo.playCount > 100000
                        ? `${+Math.floor(playListBasicInfo.playCount / 10000)}万`
                        : parseInt(playListBasicInfo.playCount, 10)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.playListDesc}>
                  <Text style={styles.playListTitle}>
                    {playListBasicInfo.name}
                  </Text>
                  {!isFetching &&
                    playlist.creator && (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.creatorInfo}
                        onPress={() => {}}
                      >
                        <Image
                          source={{ uri: playlist.creator.avatarUrl }}
                          style={styles.avatar}
                          resizeMode="cover"
                          borderRadius={15}
                        />
                        <Text style={styles.creatorName}>
                          {playlist.creator.nickname}
                        </Text>
                        <Icon
                          name="arrow-right"
                          type="simple-line-icon"
                          size={8}
                          color="#f0f0f0"
                        />
                      </TouchableOpacity>
                    )}
                </View>
              </View>

              <View style={styles.operateBar}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled={isFetching}
                  style={styles.operateItem}
                >
                  <Icon name="add-to-queue" size={22} color="white" />
                  <Text style={styles.operateText}>
                    {isFetching ? '收藏' : playlist.subscribedCount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled={isFetching}
                  style={styles.operateItem}
                >
                  <Icon
                    type="material-community"
                    name="comment-text-outline"
                    size={22}
                    color="white"
                  />
                  <Text style={styles.operateText}>
                    {isFetching ? '评论' : playlist.commentCount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled={isFetching}
                  style={styles.operateItem}
                >
                  <Icon
                    type="simple-line-icon"
                    name="share"
                    size={22}
                    color="white"
                  />
                  <Text style={styles.operateText}>
                    {isFetching ? '分享' : playlist.shareCount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled={isFetching}
                  style={styles.operateItem}
                >
                  <Icon
                    type="feather"
                    name="download"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.operateText}>下载</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isFetching ? (
              <Loading />
            ) : (
              <View>
                <View style={styles.playAllContainer}>
                  <TouchableNativeFeedback onPress={this.playAll}>
                    <View style={styles.playAll}>
                      <Icon name="play-circle-outline" size={28} color="#333" />
                      <Text style={styles.playAllText}>
                        播放全部
                        <Text style={styles.playAllCountText}>
                          (共{playlist.trackCount}首)
                        </Text>
                      </Text>
                    </View>
                  </TouchableNativeFeedback>

                  <TouchableNativeFeedback onPress={() => {}}>
                    <View style={styles.selectAll}>
                      <Icon name="list" type="feather" size={18} color="#333" />
                      <Text style={styles.selectAllText}>多选</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>

                <View>
                  <FlatList
                    data={songsData}
                    renderItem={({ item }) => (
                      <Song
                        song={item}
                        onSongPress={this.onSongPress}
                        openControlPanel={this.openControlPanel}
                      />
                    )}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </Drawer>
      </View>
    );
  }
}

function Song({ song, onSongPress, openControlPanel }) {
  return (
    <TouchableNativeFeedback onPress={() => onSongPress(song)}>
      <View style={songItemStyles.container}>
        <View style={songItemStyles.songLeft}>
          <Text style={songItemStyles.songOrder}>{song.order}</Text>
        </View>

        <View style={songItemStyles.songInfoContainer}>
          <View style={songItemStyles.songInfo}>
            <Text style={songItemStyles.songName}>
              {song.name}
              <Text>{song.alia}</Text>
            </Text>
            <Text style={songItemStyles.songCreator}>
              {song.artist}-{song.album}
            </Text>
          </View>
          <TouchableNativeFeedback onPress={() => openControlPanel(song)}>
            <View style={songItemStyles.songMore}>
              <Icon
                type="entypo"
                size={15}
                color="#999"
                name="dots-three-vertical"
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

function Loading() {
  return (
    <View style={loadingStyles.loadingContainer}>
      <ActivityIndicator size="small" color={color.mainColor} />
      <Text style={loadingStyles.loadingText}>努力加载中...</Text>
    </View>
  );
}
