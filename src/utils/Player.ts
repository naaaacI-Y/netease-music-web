import { getAlbumInfo } from '@/service/api/album';
import { getSingelSingerSong } from '@/service/api/singer';
// import { trackScrobble, trackUpdateNowPlaying } from '@/api/lastfm';
import { fmTrash, personalFM } from '@/service/api/personalFm';
import { getSongListDetail } from '@/service/api/music';
import { getMusicUrl, getMusicDetail, scrobble } from '@/service/api/music';
// import store from '@/store';
// import { isAccountLoggedIn } from '@/utils/auth';
// import { cacheTrackSource, getTrackSource } from '@/utils/db';
import { Howl, Howler } from 'howler';
// import shuffle from 'lodash/shuffle';
import { Song } from '@/service/api/music/types';
import { checkLogin, shuffleAList } from '.';

const PLAY_PAUSE_FADE_DURATION = 200;

const delay = (ms: number) =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve('');
        }, ms);
    });
const excludeSaveKeys = [
    '_playing',
    '_personalFMLoading',
    '_personalFMNextLoading',
];




class Player {
    // 播放器状态
    private _playing: boolean = false // 是否正在播放中
    private _progress: number = 0 // 当前播放歌曲的进度
    private _enabled: boolean = false // 是否启用Player
    private _repeatMode: string = "off" // off | on | one
    private _shuffle: boolean = false // true | false
    private _reversed: boolean = false
    private _volume: number = 1 // 0 to 1
    private _volumeBeforeMuted: number = 1 // 用于保存静音前的音量
    private _personalFMLoading: boolean = false  // 是否正在私人FM中加载新的track
    private _personalFMNextLoading: boolean = false // 是否正在缓存私人FM的下一首歌曲

    // 播放信息
    private _list: number[] = []  // 播放列表
    private _current: number = 0 // 当前播放歌曲在播放列表里的index
    private _shuffledList: number[] = [] // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
    private _shuffledCurrent: number = 0 // 当前播放歌曲在随机列表里面的index
    private _playlistSource = { type: 'album', id: 123 } // 当前播放列表的信息
    private _currentTrack = { id: 86827685 } as Song // 当前播放歌曲的详细信息
    private _playNextList: number[] = [] // 当这个list不为空时，会优先播放这个list的歌
    private _isPersonalFM: boolean = false // 是否是私人FM模式
    private _personalFMTrack = { id: 0 } as Song // 私人FM当前歌曲
    private _personalFMNextTrack = { id: 0 } as Song // 私人FM下一首歌曲信息（为了快速加载下一首）
    private createdBlobRecords: string[] = [] // The blob records for cleanup.
    private _howler: Howl = null as unknown as Howl
    constructor() {
        // howler (https://github.com/goldfire/howler.js)
        Object.defineProperty(this, '_howler', {
            enumerable: false,
        });
        // init
        this._init();

        // window.yesplaymusic = {};
        // window.yesplaymusic.player = this;
    }

    get repeatMode() {
        return this._repeatMode;
    }
    set repeatMode(mode) {
        if (this._isPersonalFM) return;
        if (!['off', 'on', 'one'].includes(mode)) {
            console.warn("repeatMode: invalid args, must be 'on' | 'off' | 'one'");
            return;
        }
        this._repeatMode = mode;
    }
    get shuffle() {
        return this._shuffle;
    }
    set shuffle(shuffle) {
        if (this._isPersonalFM) return;
        if (shuffle !== true && shuffle !== false) {
            console.warn('shuffle: invalid args, must be Boolean');
            return;
        }
        this._shuffle = shuffle;
        if (shuffle) {
            this._shuffleTheList();
        }
    }
    get reversed() {
        return this._reversed;
    }
    set reversed(reversed) {
        if (this._isPersonalFM) return;
        if (reversed !== true && reversed !== false) {
            console.warn('reversed: invalid args, must be Boolean');
            return;
        }
        console.log('changing reversed to:', reversed);
        this._reversed = reversed;
    }
    get volume() {
        return this._volume;
    }
    set volume(volume) {
        this._volume = volume;
        Howler.volume(volume);
    }
    get list() {
        return this.shuffle ? this._shuffledList : this._list;
    }
    set list(list) {
        this._list = list;
    }
    get current() {
        return this.shuffle ? this._shuffledCurrent : this._current;
    }
    set current(current) {
        if (this.shuffle) {
            this._shuffledCurrent = current;
        } else {
            this._current = current;
        }
    }
    get enabled() {
        return this._enabled;
    }
    get playing() {
        return this._playing;
    }
    get currentTrack() {
        return this._currentTrack;
    }
    get playlistSource() {
        return this._playlistSource;
    }
    get playNextList() {
        return this._playNextList;
    }
    get isPersonalFM() {
        return this._isPersonalFM;
    }
    get personalFMTrack() {
        return this._personalFMTrack;
    }
    get currentTrackDuration() {
        const trackDuration = this._currentTrack.dt || 1000;
        let duration = ~~(trackDuration / 1000);
        return duration > 1 ? duration - 1 : duration;
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        console.log(value, '更新播放进度=======');
        if (this._howler) {
            this._howler.seek(value);
        }
    }
    // get isCurrentTrackLiked() { // 喜欢的歌曲 TODO
    //     return store.state.liked.songs.includes(this.currentTrack.id);
    // }

    _init() {
        this._loadSelfFromLocalStorage();
        Howler.volume(this.volume);

        if (this._enabled) {
            // 恢复当前播放歌曲
            this._replaceCurrentTrack(this._currentTrack.id, false).then(() => {
                const time = Number(localStorage.getItem('playerCurrentTrackTime')) ?? 0
                this._howler?.seek(time);
            }); // update audio source and init howler
            this._initMediaSession();
        }

        this._setIntervals();

        // 初始化私人FM
        if (
            this._personalFMTrack.id === 0 ||
            this._personalFMNextTrack.id === 0 ||
            this._personalFMTrack.id === this._personalFMNextTrack.id
        ) {
            personalFM().then(result => {
                this._personalFMTrack = result.data[0] as unknown as Song;
                this._personalFMNextTrack = result.data[1] as unknown as Song;
                return this._personalFMTrack;
            });
        }
    }
    _setPlaying(isPlaying: boolean) {
        this._playing = isPlaying;
    }
    _setIntervals() {
        // 同步播放进度
        // TODO: 如果 _progress 在别的地方被改变了，
        // 这个定时器会覆盖之前改变的值，是bug
        setInterval(() => {
            if (this._howler === null) return;
            this._progress = this._howler.seek();
            localStorage.setItem('playerCurrentTrackTime', String(this._progress));
            // if (isCreateMpris) {
            //     ipcRenderer.send('playerCurrentTrackTime', this._progress);
            // }
        }, 1000);
    }
    _getNextTrack(): [number, number] {
        const next = this._reversed ? this.current - 1 : this.current + 1;

        if (this._playNextList.length > 0) {
            let trackID = this._playNextList.shift();
            return [trackID || 0, this.current];
        }

        // 循环模式开启，则重新播放当前模式下的相对的下一首
        if (this.repeatMode === 'on') {
            if (this._reversed && this.current === 0) {
                // 倒序模式，当前歌曲是第一首，则重新播放列表最后一首
                return [this.list[this.list.length - 1], this.list.length - 1];
            } else if (this.list.length === this.current + 1) {
                // 正序模式，当前歌曲是最后一首，则重新播放第一首
                return [this.list[0], 0];
            }
        }

        // 返回 [trackID, index]
        return [this.list[next], next];
    }
    _getPrevTrack() {
        const next = this._reversed ? this.current + 1 : this.current - 1;

        // 循环模式开启，则重新播放当前模式下的相对的下一首
        if (this.repeatMode === 'on') {
            if (this._reversed && this.current === 0) {
                // 倒序模式，当前歌曲是最后一首，则重新播放列表第一首
                return [this.list[0], 0];
            } else if (this.list.length === this.current + 1) {
                // 正序模式，当前歌曲是第一首，则重新播放列表最后一首
                return [this.list[this.list.length - 1], this.list.length - 1];
            }
        }

        // 返回 [trackID, index]
        return [this.list[next], next];
    }
    async _shuffleTheList(firstTrackID = this._currentTrack.id) {
        let list = this._list.filter(tid => tid !== firstTrackID);
        if (firstTrackID === -1) list = this._list;
        this._shuffledList = shuffleAList(list);
        if (firstTrackID !== -1) this._shuffledList.unshift(firstTrackID);
    }
    async _scrobble(track: Song, time: number, completed = false) {
        console.debug(
            `[debug][Player.js] scrobble track 👉 ${track.name} by ${track.ar[0].name} 👉 time:${time} completed: ${completed}`
        );
        const trackDuration = ~~(track.dt / 1000);
        time = completed ? trackDuration : ~~time;
        scrobble({
            id: track.id,
            sourceid: this.playlistSource.id,
            time,
        });
        // if (
        //     store.state.lastfm.key !== undefined &&
        //     (time >= trackDuration / 2 || time >= 240)
        // ) {
        //     const timestamp = ~~(new Date().getTime() / 1000) - time;
        //     trackScrobble({
        //         artist: track.ar[0].name,
        //         track: track.name,
        //         timestamp,
        //         album: track.al.name,
        //         trackNumber: track.no,
        //         duration: trackDuration,
        //     });
        // }
    }
    _playAudioSource(source: any, autoplay = true) {
        Howler.unload();
        this._howler = new Howl({
            src: [source],
            html5: true,
            preload: true,
            format: ['mp3', 'flac'],
            onend: () => {
                this._nextTrackCallback();
            },
        });
        if (autoplay) {
            this.play();
            // if (this._currentTrack.name) {
            //     setTitle(this._currentTrack);
            // }
            // setTrayLikeState(store.state.liked.songs.includes(this.currentTrack.id));
        }
        // this.setOutputDevice();
    }
    // _getAudioSourceFromCache(id: number) {
    //     return getTrackSource(id).then((t: any) => {
    //         if (!t) return null;

    //         // Create a new object URL.
    //         const source = URL.createObjectURL(new Blob([t.source]));

    //         // Clean up the previous object URLs since we've created a new one.
    //         // Revoke object URLs can release the memory taken by a Blob,
    //         // which occupied a large proportion of memory.
    //         for (const url in this.createdBlobRecords) {
    //             URL.revokeObjectURL(url);
    //         }
    //         this.createdBlobRecords = [source];

    //         return source;
    //     });
    // }
    _getAudioSourceFromNetease(track: Song) {
        if (checkLogin()) {
            return getMusicUrl(String(track.id)).then(result => {
                if (!result.data[0]) return null;
                if (!result.data[0].url) return null;
                if (result.data[0].freeTrialInfo !== null) return null; // 跳过只能试听的歌曲
                const source = result.data[0].url.replace(/^http:/, 'https:');
                // if (store.state.settings.automaticallyCacheSongs) {
                //     cacheTrackSource(track, source, result.data[0].br);
                // }
                return source;
            });
        } else {
            return new Promise(resolve => {
                resolve(`https://music.163.com/song/media/outer/url?id=${track.id}`);
            });
        }
    }
    // async _getAudioSourceFromUnblockMusic(track: Song) {
    //     console.debug(`[debug][Player.js] _getAudioSourceFromUnblockMusic`);
    //     if (
    //         store.state.settings.enableUnblockNeteaseMusic === false
    //     ) {
    //         return null;
    //     }
    //     const source = await ipcRenderer.invoke(
    //         'unblock-music',
    //         track,
    //         store.state.settings.unmSource
    //     );
    //     if (store.state.settings.automaticallyCacheSongs && source?.url) {
    //         // TODO: 将unblockMusic字样换成真正的来源（比如酷我咪咕等）
    //         cacheTrackSource(track, source.url, 128000, 'unblockMusic');
    //     }
    //     return source?.url;
    // }
    // 获取音频源
    _getAudioSource(track: Song) {
        // 从缓存获取 TODO ，怎么从缓存获取
        return this._getAudioSourceFromNetease(track).then(source => {
            return source
        })
        // return this._getAudioSourceFromCache(track.id)
        //     .then(source => {
        //         return source ?? this._getAudioSourceFromNetease(track);
        //     })
        //     .then(source => {
        //         return source ?? this._getAudioSourceFromUnblockMusic(track);
        //     });
    }
    _replaceCurrentTrack(
        id: number | string,
        autoplay = true,
        ifUnplayableThen = 'playNextTrack'
    ) {
        if (autoplay && this._currentTrack.name) {
            this._scrobble(this.currentTrack, this._howler?.seek());
        }
        return getMusicDetail(String(id)).then(data => {
            let track = data.songs[0];
            this._currentTrack = track;
            this._updateMediaSessionMetaData(track);
            return this._getAudioSource(track).then(source => {
                if (source) {
                    this._playAudioSource(source, autoplay);
                    this._cacheNextTrack();
                    return source;
                } else {
                    // store.dispatch('showToast', `无法播放 ${track.name}`);
                    if (ifUnplayableThen === 'playNextTrack') {
                        if (this.isPersonalFM) {
                            this.playNextFMTrack();
                        } else {
                            this.playNextTrack();
                        }
                    } else {
                        this.playPrevTrack();
                    }
                }
            });
        });
    }
    _cacheNextTrack() {
        let nextTrackID = this._isPersonalFM
            ? this._personalFMNextTrack?.id ?? 0
            : this._getNextTrack()[0];
        if (!nextTrackID) return;
        if (this._personalFMTrack.id == nextTrackID) return;
        getMusicDetail(String(nextTrackID)).then(data => {
            let track = data.songs[0];
            this._getAudioSource(track);
        });
    }
    _loadSelfFromLocalStorage() {
        const player = JSON.parse(localStorage.getItem('player') || "");
        if (!player) return;
        for (const [key, value] of Object.entries(player)) {
            (this as any)[key] = value;
        }
    }
    _initMediaSession() {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', () => {
                this.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                this.pause();
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                this.playPrevTrack();
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                if (this.isPersonalFM) {
                    this.playNextFMTrack();
                } else {
                    this.playNextTrack();
                }
            });
            navigator.mediaSession.setActionHandler('stop', () => {
                this.pause();
            });
            navigator.mediaSession.setActionHandler('seekto', event => {
                this.seek(event.seekTime as any);
                this._updateMediaSessionPositionState();
            });
            navigator.mediaSession.setActionHandler('seekbackward', event => {
                this.seek(this.seek() - (event.seekOffset || 10));
                this._updateMediaSessionPositionState();
            });
            navigator.mediaSession.setActionHandler('seekforward', event => {
                this.seek(this.seek() + (event.seekOffset || 10));
                this._updateMediaSessionPositionState();
            });
        }
    }
    _updateMediaSessionMetaData(track: Song) {
        if ('mediaSession' in navigator === false) {
            return;
        }
        let artists = track.ar.map(a => a.name);
        const metadata = {
            title: track.name,
            artist: artists.join(','),
            album: track.al.name,
            artwork: [
                {
                    src: track.al.picUrl + '?param=224y224',
                    type: 'image/jpg',
                    sizes: '224x224',
                },
                {
                    src: track.al.picUrl + '?param=512y512',
                    type: 'image/jpg',
                    sizes: '512x512',
                },
            ],
            length: this.currentTrackDuration,
            trackId: this.current,
        };

        navigator.mediaSession.metadata = new window.MediaMetadata(metadata);
        // if (isCreateMpris) {
        //     ipcRenderer.send('metadata', metadata);
        // }
    }
    _updateMediaSessionPositionState() {
        if ('mediaSession' in navigator === false) {
            return;
        }
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: ~~(this.currentTrack.dt / 1000),
                playbackRate: 1.0,
                position: this.seek(),
            });
        }
    }
    _nextTrackCallback() {
        this._scrobble(this._currentTrack, 0, true);
        if (!this.isPersonalFM && this.repeatMode === 'one') {
            this._replaceCurrentTrack(this._currentTrack.id);
        } else if (this.isPersonalFM) {
            this.playNextFMTrack();
        } else {
            this.playNextTrack();
        }
    }
    _loadPersonalFMNextTrack() {
        if (this._personalFMNextLoading) {
            return [false, undefined];
        }
        this._personalFMNextLoading = true;
        return personalFM()
            .then(result => {
                if (!result || !result.data) {
                    this._personalFMNextTrack = undefined as unknown as Song;
                } else {
                    this._personalFMNextTrack = result.data[0] as unknown as Song;
                    this._cacheNextTrack(); // cache next track
                }
                this._personalFMNextLoading = false;
                return [true, this._personalFMNextTrack];
            })
            .catch(() => {
                this._personalFMNextTrack = undefined as unknown as Song;
                this._personalFMNextLoading = false;
                return [false, this._personalFMNextTrack];
            });
    }
    _playDiscordPresence(track: Song, seekTime = 0) {
        // if (
        //     store.state.settings.enableDiscordRichPresence === false
        // ) {
        //     return null;
        // }
        let copyTrack = { ...track };
        copyTrack.dt -= seekTime * 1000;
        // ipcRenderer.send('playDiscordPresence', copyTrack);
    }
    // _pauseDiscordPresence(track: Song) {
    //     if (
    //         store.state.settings.enableDiscordRichPresence === false
    //     ) {
    //         return null;
    //     }
    //     ipcRenderer.send('pauseDiscordPresence', track);
    // }

    // currentTrackID() {
    //     const { list, current } = this._getListAndCurrent();
    //     return list[current];
    // }
    appendTrack(trackID: number) {
        this.list.push(trackID);
    }
    playNextTrack() {
        // TODO: 切换歌曲时增加加载中的状态
        const [trackID, index] = this._getNextTrack();
        if (trackID === undefined) {
            this._howler?.stop();
            this._setPlaying(false);
            return false;
        }
        this.current = index!;
        this._replaceCurrentTrack(trackID);
        return true;
    }
    async playNextFMTrack() {
        if (this._personalFMLoading) {
            return false;
        }

        this._isPersonalFM = true;
        if (!this._personalFMNextTrack) {
            this._personalFMLoading = true;
            let result = null;
            let retryCount = 5;
            for (; retryCount >= 0; retryCount--) {
                result = await personalFM().catch(() => null);
                if (!result) {
                    this._personalFMLoading = false;
                    // store.dispatch('showToast', 'personal fm timeout');
                    return false;
                }
                if (result.data?.length > 0) {
                    break;
                } else if (retryCount > 0) {
                    await delay(1000);
                }
            }
            this._personalFMLoading = false;

            if (retryCount < 0) {
                let content = '获取私人FM数据时重试次数过多，请手动切换下一首';
                // store.dispatch('showToast', content);
                console.log(content);
                return false;
            }
            // 这里只能拿到一条数据
            this._personalFMTrack = result!.data[0] as unknown as Song;
        } else {
            if (this._personalFMNextTrack.id === this._personalFMTrack.id) {
                return false;
            }
            this._personalFMTrack = this._personalFMNextTrack;
        }
        if (this._isPersonalFM) {
            this._replaceCurrentTrack(this._personalFMTrack.id);
        }
        this._loadPersonalFMNextTrack();
        return true;
    }
    playPrevTrack() {
        const [trackID, index] = this._getPrevTrack();
        if (trackID === undefined) return false;
        this.current = index;
        this._replaceCurrentTrack(trackID, true, 'playPrevTrack');
        return true;
    }
    saveSelfToLocalStorage() {
        let player = {} as any;
        for (let [key, value] of Object.entries(this)) {
            if (excludeSaveKeys.includes(key)) continue;
            player[key] = value;
        }

        localStorage.setItem('player', JSON.stringify(player));
    }

    pause() {
        this._howler?.fade(this.volume, 0, PLAY_PAUSE_FADE_DURATION);

        this._howler?.once('fade', () => {
            this._howler?.pause();
            this._setPlaying(false);
            // setTitle(null);
            // this._pauseDiscordPresence(this._currentTrack);
        });
    }
    play() {
        if (this._howler?.playing()) return;

        this._howler?.play();

        this._howler?.once('play', () => {
            this._howler?.fade(0, this.volume, PLAY_PAUSE_FADE_DURATION);

            this._setPlaying(true);
            // if (this._currentTrack.name) {
            //     setTitle(this._currentTrack);
            // }
            this._playDiscordPresence(this._currentTrack, this.seek());
            // if (store.state.lastfm.key !== undefined) {
            //     trackUpdateNowPlaying({
            //         artist: this.currentTrack.ar[0].name,
            //         track: this.currentTrack.name,
            //         album: this.currentTrack.al.name,
            //         trackNumber: this.currentTrack.no,
            //         duration: ~~(this.currentTrack.dt / 1000),
            //     });
            // }
        });
    }
    playOrPause() {
        if (this._howler?.playing()) {
            this.pause();
        } else {
            this.play();
        }
    }
    seek(time?: number) {
        if (time !== null) {
            this._howler?.seek(time);
            if (this._playing)
                this._playDiscordPresence(this._currentTrack, this.seek());
        }
        return this._howler === null ? 0 : this._howler.seek();
    }
    mute() {
        if (this.volume === 0) {
            this.volume = this._volumeBeforeMuted;
        } else {
            this._volumeBeforeMuted = this.volume;
            this.volume = 0;
        }
    }
    // setOutputDevice() {
    //     if (this._howler?._sounds.length <= 0 || !this._howler?._sounds[0]._node) {
    //         return;
    //     }
    //     this._howler?._sounds[0]._node.setSinkId(store.state.settings.outputDevice);
    // }

    replacePlaylist(
        trackIDs: number[],
        playlistSourceID: number,
        playlistSourceType: string,
        autoPlayTrackID = -1
    ) {
        this._isPersonalFM = false;
        if (!this._enabled) this._enabled = true;
        this.list = trackIDs;
        this.current = 0;
        this._playlistSource = {
            type: playlistSourceType,
            id: playlistSourceID,
        };
        if (this.shuffle) this._shuffleTheList(autoPlayTrackID);
        if (autoPlayTrackID === -1) {
            this._replaceCurrentTrack(this.list[0]);
        } else {
            this.current = trackIDs.indexOf(autoPlayTrackID);
            this._replaceCurrentTrack(autoPlayTrackID);
        }
    }
    playAlbumByID(id: number, trackID = -1) {
        getAlbumInfo({ id }).then(data => {
            let trackIDs = data.songs.map(t => t.id);
            this.replacePlaylist(trackIDs, id, 'album', trackID);
        });
    }
    playPlaylistByID(id: number, trackID = -1, noCache = false) {
        console.debug(
            `[debug][Player.js] playPlaylistByID 👉 id:${id} trackID:${trackID} noCache:${noCache}`
        );
        getSongListDetail({ id }).then(data => {
            let trackIDs = data.playlist.trackIds!.map(t => t.id);
            this.replacePlaylist(trackIDs, id, 'playlist', trackID);
        });
    }
    playArtistByID(id: number, trackID = -1) {
        getSingelSingerSong({ id }).then(data => {
            let trackIDs = data.hotSongs.map(t => t.id);
            this.replacePlaylist(trackIDs, id, 'artist', trackID);
        });
    }
    playTrackOnListByID(id: number, listName = 'default') {
        if (listName === 'default') {
            this._current = this._list.findIndex(t => t === id);
        }
        this._replaceCurrentTrack(id);
    }
    // playIntelligenceListById(id: number, trackID = 'first', noCache = false) {
    //     getSongListDetail({id}).then(data => {
    //         const randomId = Math.floor(
    //             Math.random() * (data.playlist.trackIds!.length + 1)
    //         );
    //         const songId = data.playlist.trackIds![randomId].id;
    //         intelligencePlaylist({ id: songId, pid: id }).then(result => {
    //             let trackIDs = result.data.map(t => t.id);
    //             this.replacePlaylist(trackIDs, id, 'playlist', trackID);
    //         });
    //     });
    // }
    addTrackToPlayNext(trackID: any, playNow = false) {
        this._playNextList.push(trackID);
        if (playNow) {
            if (this.isPersonalFM) {
                this.playNextFMTrack();
            } else {
                this.playNextTrack();
            }
        }
    }
    playPersonalFM() {
        this._isPersonalFM = true;
        if (!this._enabled) this._enabled = true;
        if (this._currentTrack.id !== this._personalFMTrack.id) {
            this._replaceCurrentTrack(this._personalFMTrack.id).then(() =>
                this.playOrPause()
            );
        } else {
            this.playOrPause();
        }
    }
    async moveToFMTrash() {
        this._isPersonalFM = true;
        let id = this._personalFMTrack.id;
        if (await this.playNextFMTrack()) {
            fmTrash({ id });
        }
    }

    // sendSelfToIpcMain() {
    //     if (process.env.IS_ELECTRON !== true) return false;
    //     let liked = store.state.liked.songs.includes(this.currentTrack.id);
    //     ipcRenderer.send('player', {
    //         playing: this.playing,
    //         likedCurrentTrack: liked,
    //     });
    //     setTrayLikeState(liked);
    // }

    switchRepeatMode() {
        if (this._repeatMode === 'on') {
            this.repeatMode = 'one';
        } else if (this._repeatMode === 'one') {
            this.repeatMode = 'off';
        } else {
            this.repeatMode = 'on';
        }
        // if (isCreateMpris) {
        //     ipcRenderer.send('switchRepeatMode', this.repeatMode);
        // }
    }
    switchShuffle() {
        this.shuffle = !this.shuffle;
        // if (isCreateMpris) {
        //     ipcRenderer.send('switchShuffle', this.shuffle);
        // }
    }
    switchReversed() {
        this.reversed = !this.reversed;
    }

    clearPlayNextList() {
        this._playNextList = [];
    }
    removeTrackFromQueue(index: number) {
        this._playNextList.splice(index, 1);
    }
}

export default Player
