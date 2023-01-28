
import { Howl, Howler } from 'howler';
import { defineStore } from "pinia"
import Message from "@/components/message"
import { Song } from '@/service/api/music/types';
import { Song as PersonalSong } from "@/service/api/recommend/types"
import { fmTrash, personalFM } from '@/service/api/personalFm';
import { checkLogin, shuffleAList } from '@/utils';
import { getAlbumInfo } from '@/service/api/album';
import { getSongListDetail, getLikedSongList, getMusicUrl, getMusicDetail, scrobble } from '@/service/api/music';
import { getSingelSingerSong } from '@/service/api/singer';
import useUserProfileStore from "./user"
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



const usePlayerStore = defineStore("player", {
    state: () => {
        return {
            likedList: [] as number[],
            player: {
                playing: false, // 是否正在播放中
                progress: 0, // 当前播放歌曲的进度
                enabled: false, // 是否启用Player
                repeatMode: "one", // off:列表播放，最后一首播放完成了就暂停 | on: 列表循环 | one:单曲循环
                shuffle: false,// true | false
                reversed: false,
                volume: 0.5, // 0 to 1
                volumeBeforeMuted: 0.5, // 用于保存静音前的音量
                personalFMLoading: false, // 是否正在私人FM中加载新的track
                personalFMNextLoading: false, // 是否正在缓存私人FM的下一首歌曲
                progressInterval: undefined as unknown as number,
                // 播放信息
                list: [] as number[],  // 播放列表
                current: 0, // 当前播放歌曲在播放列表里的index
                shuffledList: [] as number[], // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
                shuffledCurrent: 0, // 当前播放歌曲在随机列表里面的index
                playlistSource: {} as { id: number, type: string }, // 当前播放列表的信息
                currentTrack: {} as Song, // 当前播放歌曲的详细信息
                playNextList: [] as number[], // 当这个list不为空时，会优先播放这个list的歌
                isPersonalFM: false, // 是否是私人FM模式
                personalFMTrack: { id: 0 } as PersonalSong, // 私人FM当前歌曲
                personalFMNextTrack: { id: 0 } as PersonalSong, // 私人FM下一首歌曲信息（为了快速加载下一首）
                reatedBlobRecords: [] as string[], // The blob records for cleanup.
                howler: null as unknown as Howl  // 标识播放器 存储的时候把这个属性剔除掉
            }
        }
    },
    getters: {
        currentTrackDuration(state) {
            const trackDuration = state.player.currentTrack.dt || 1000;
            let duration = ~~(trackDuration / 1000);
            return duration > 1 ? duration - 1 : duration;
        },
        isLiked(state) {
            return state.likedList.includes(state.player.currentTrack.id)
        }
    },
    actions: {

        init() {
            this.loadSelfFromLocalStorage();
            Howler.volume(this.player.volume);

            if (this.player.enabled) {
                // 恢复当前播放歌曲
                this.replaceCurrentTrack(this.player.currentTrack.id, false).then(() => {
                    const i = Number(localStorage.getItem('playerCurrentTrackTime'))
                    this.player.howler?.seek(i ?? 0);
                }); // update audio source and init howler
                // this._initMediaSession();
                // this.setIntervals();
            }

            this.setIntervals();

            // 初始化私人FM
            if (
                this.player.personalFMTrack.id === 0 ||
                this.player.personalFMNextTrack.id === 0 ||
                this.player.personalFMTrack.id === this.player.personalFMNextTrack.id
            ) {
                personalFM().then(result => {
                    this.player.personalFMTrack = result.data[0] as unknown as PersonalSong;
                    this.player.personalFMNextTrack = result.data[1] as unknown as PersonalSong;
                    return this.player.personalFMTrack;
                });
            }
        },
        loadSelfFromLocalStorage() {
            const player = localStorage.getItem('player')
            const playCurrentTime = localStorage.getItem("playCurrentTime") ?? 0
            if (!player) return;
            for (const [key, value] of Object.entries(JSON.parse(player))) {
                if (key === "progress" && value !== playCurrentTime) {
                    (this.$state.player as any)[key] = playCurrentTime;
                    continue
                }
                (this.$state.player as any)[key] = value;
            }
        },
        saveSelfToLocalStorage() {
            let player = {} as any;
            for (let [key, value] of Object.entries(this.$state.player)) {
                if (excludeSaveKeys.includes(key)) continue;
                player[key] = value;
            }
            localStorage.setItem('player', JSON.stringify(player));
            Object.defineProperty(player, 'howler', {
                enumerable: false,
            });

        },
        /**
         * 同步播放进度
         */
        setIntervals() {
            // 可能还有问题 TODO
            setInterval(() => {
                if (this.player.howler === null) return;
                const seekTime = this.player.howler.seek()
                if (this.player.progress == 0) {
                    this.player.progress = seekTime;
                } else {
                    if (seekTime) {
                        this.player.progress = seekTime;
                    }
                }
            }, 1000)

        },
        /**
         * 设置播放模式
         * @param mode
         * @returns
         */
        setRepeatMode(mode: string) {
            if (this.player.isPersonalFM) return;
            this.player.repeatMode = mode;
            this.saveSelfToLocalStorage()
        },
        /**
         * 设置声音
         * @param volume 0-1
         */
        setVolume(volume: number) {
            this.player.volume = volume;
            Howler.volume(volume);
            this.saveSelfToLocalStorage()
        },

        /**
         * 设置播放进度
         * @param value
         */
        setProgress(value: number) {
            if (this.player.howler) {
                this.player.howler.seek(value);
            }
        },
        /**
         * 获取下一首歌
         * @returns [trackID, index] 下一首的id和索引
         */
        getNextTrack(): [number, number] {
            const next = this.player.current + 1;
            // if (this.player.playNextList.length > 0) {
            //     let trackID = this.player.playNextList.shift();
            //     return [trackID || 0, this.player.current];
            // }
            // 循环模式开启，则重新播放当前模式下的相对的下一首
            if (this.player.repeatMode === 'on') {
                // 如果已经是最后一首 则播放第一手
                if (this.player.list.length === this.player.current + 1) {
                    // 正序模式，当前歌曲是最后一首，则重新播放第一首
                    return [this.player.list[0], 0];
                }
            }

            // 如果是顺序播放
            if (next > this.player.list.length) {
                // 播放的是最后一首 暂停播放
                return [undefined as unknown as number, next]

            }
            return [this.player.list[next], next];
        },
        /**
         * 获取上一首
         * @returns [trackID, index]
         */
        getPrevTrack() {
            const next: number = this.player.reversed ? this.player.current + 1 : this.player.current - 1;
            // 循环模式开启，则重新播放当前模式下的相对的下一首
            if (this.player.repeatMode === 'on') {
                if (this.player.reversed && this.player.current === 0) {
                    // 倒序模式，当前歌曲是最后一首，则重新播放列表第一首
                    return [this.player.list[0], 0];
                } else if (this.player.list.length === this.player.current + 1) {
                    // 正序模式，当前歌曲是第一首，则重新播放列表最后一首
                    return [this.player.list[this.player.list.length - 1], this.player.list.length - 1];
                }
            }
            return [this.player.list[next], next];
        },

        /**
         * 播放音乐
         * @param source 音歌曲资源
         * @param autoplay 是否自动播放
         */
        playAudioSource(source: any, autoplay = true) {
            Howler.unload();
            // 需要在这里重构howler 如果是1的话 就重构
            this.player.howler = new Howl({
                src: [source],
                html5: true,
                preload: true,
                format: ['mp3', 'flac'],
                onend: () => {
                    this.nextTrackCallback();
                },
            });
            if (autoplay) {
                this.play();
            }
        },

        /**
         * 听歌记录
         * @param track 歌曲详情信息
         * @param time 时间
         * @param completed 是否完成
         */
        async _scrobble(track: Song, time: number, completed = false) {
            const trackDuration = ~~(track.dt / 1000);
            time = completed ? trackDuration : ~~time;
            scrobble({
                id: track.id,
                sourceid: this.player.playlistSource.id,
                time,
            });
        },

        /**
         * 下一首的回调
         */
        nextTrackCallback() {
            // this._scrobble(this.player.currentTrack, 0, true);
            // 如果非私人fm并且循环模式是单曲的继续播放当前歌曲
            if (!this.player.isPersonalFM && this.player.repeatMode === 'one') {
                this.replaceCurrentTrack(this.player.currentTrack.id);
            } else if (this.player.isPersonalFM) {
                // 私人fm的下一首
                this.playNextFMTrack();
            } else {
                //
                this.playNextTrack();
            }
        },

        /**
         * 下一首 私人fm
         * @returns
         */
        async playNextFMTrack() {
            if (this.player.personalFMLoading) {
                return false;
            }

            this.player.isPersonalFM = true;

            if (!this.player.personalFMNextTrack.id) {
                this.player.personalFMLoading = true;
                let result = null;
                let retryCount = 5;
                for (; retryCount >= 0; retryCount--) {
                    result = await personalFM().catch(() => null);
                    if (!result) {
                        this.player.personalFMLoading = false;
                        // store.dispatch('showToast', 'personal fm timeout');
                        return false;
                    }
                    if (result.data?.length > 0) {
                        break;
                    } else if (retryCount > 0) {
                        await delay(1000);
                    }
                }
                this.player.personalFMLoading = false;

                if (retryCount < 0) {
                    let content = '获取私人FM数据时重试次数过多，请手动切换下一首';
                    // store.dispatch('showToast', content);
                    return false;
                }
                // 这里只能拿到一条数据
                this.player.personalFMTrack = result!.data[0] as unknown as PersonalSong;
            } else {
                if (this.player.personalFMNextTrack.id === this.player.personalFMTrack.id) {
                    return false;
                }
                this.player.personalFMTrack = this.player.personalFMNextTrack;
            }
            if (this.player.isPersonalFM) {
                this.replaceCurrentTrack(this.player.personalFMTrack.id);
            }
            this.loadPersonalFMNextTrack();

            return true;
        },

        /**
         * 加载私人fm下一首
         * @returns
         */
        loadPersonalFMNextTrack() {
            if (this.player.personalFMNextLoading) {
                return [false, undefined];
            }
            this.player.personalFMNextLoading = true;
            return personalFM()
                .then(result => {
                    if (!result || !result.data) {
                        this.player.personalFMNextTrack = undefined as unknown as PersonalSong;
                    } else {
                        this.player.personalFMNextTrack = result.data[0] as unknown as PersonalSong;
                        this.cacheNextTrack(); // cache next track
                    }
                    this.player.personalFMNextLoading = false;
                    return [true, this.player.personalFMNextTrack];
                })
                .catch(() => {
                    this.player.personalFMNextTrack = undefined as unknown as PersonalSong;
                    this.player.personalFMNextLoading = false;
                    return [false, this.player.personalFMNextTrack];
                }).finally(() => {
                    this.saveSelfToLocalStorage()
                });
        },

        cacheNextTrack() {
            let nextTrackID = this.player.isPersonalFM
                ? this.player.personalFMNextTrack?.id ?? 0
                : this.getNextTrack()[0];
            if (!nextTrackID) return;
            if (this.player.personalFMTrack.id == nextTrackID) return;
            getMusicDetail(String(nextTrackID)).then(data => {
                let track = data.songs[0];
                this.getAudioSource(track);
            });
        },

        /**
         * 更新当前播放歌曲
         * @param id 歌曲id
         * @param autoplay 是否自动播放
         * @param ifUnplayableThen  如果不能播放的时候是否自动下一首
         * @returns
         */
        async replaceCurrentTrack(
            id: number | string,
            autoplay = true,
            ifUnplayableThen = 'playNextTrack'
        ) {
            // 听歌打卡  TODO
            // if (autoplay && this.player.currentTrack.name) {
            //     this._scrobble(this.player.currentTrack, this.player.howler?.seek());
            // }
            return getMusicDetail(String(id)).then(data => {
                let track = data.songs[0];
                this.player.currentTrack = track;
                // this._updateMediaSessionMetaData(track);
                return this.getAudioSource(track).then(source => {
                    if (source) {
                        this.playAudioSource(source, autoplay);
                        // this._cacheNextTrack();
                        // return source;
                    } else {
                        // 如果获取不到资源
                        console.log("没有获取到资源");
                        // if (ifUnplayableThen === 'playNextTrack') {
                        //     if (this.player.isPersonalFM) {
                        //         this.playNextFMTrack();
                        //     } else {
                        //         this.playNextTrack();
                        //     }
                        // } else {
                        //     this.playPrevTrack();
                        // }
                    }
                }).finally(() => {
                    this.saveSelfToLocalStorage()
                });
            });
        },

        /**
         * 播放上一首
         * @returns
         */
        playPrevTrack() {
            const [trackID, index] = this.getPrevTrack();
            if (trackID === undefined) return false;
            this.player.current = index;
            this.replaceCurrentTrack(trackID, true, 'playPrevTrack');
            return true;
        },

        /**
         * 播放下一首
         * @returns
         */
        playNextTrack() {
            const [trackID, index] = this.getNextTrack();
            if (trackID === undefined) {
                this.player.howler?.stop();
                this.player.playing = false
                this.player.progress = 0
                return false;
            }
            this.player.current = index!;
            this.replaceCurrentTrack(trackID);
            return true;
        },

        /**
         * 获取音频资源
         * @param track
         * @returns
         */
        getAudioSource(track: Song) {
            // 从缓存获取 TODO ，怎么从缓存获取
            return this.getAudioSourceFromNetease(track).then(source => {
                return source
            })
            // return this._getAudioSourceFromCache(track.id)
            //     .then(source => {
            //         return source ?? this._getAudioSourceFromNetease(track);
            //     })
            //     .then(source => {
            //         return source ?? this._getAudioSourceFromUnblockMusic(track);
            //     });
        },

        /**
         * 获取音乐资源
         * @param track
         * @returns
         */
        getAudioSourceFromNetease(track: Song) {
            if (checkLogin()) {
                return getMusicUrl(String(track.id)).then(result => {
                    if (!result.data[0]) return null;
                    if (!result.data[0].url) return null;
                    if (result.data[0].freeTrialInfo !== null) return null; // 跳过只能试听的歌曲
                    // const source = result.data[0].url.replace(/^http:/, 'https:');
                    const source = result.data[0].url
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
        },

        /**
         * 列个表添加歌曲
         * @param trackID
         */
        appendTrack(trackID: number) {
            this.player.list.push(trackID);
            this.saveSelfToLocalStorage()
        },

        /**
         * 暂停播放
         */
        pause() {
            this.player.howler?.fade(this.player.volume, 0, PLAY_PAUSE_FADE_DURATION);

            this.player.howler?.once('fade', () => {
                this.player.howler?.pause();
                // this._setPlaying(false);
                this.player.playing = false
                this.saveSelfToLocalStorage()
                // setTitle(null);
                // this._pauseDiscordPresence(this._currentTrack);
            });
        },

        /**
         * 开始播放
         */
        play() {
            if (this.player.howler?.playing()) return;
            this.player.howler?.play();
            this.player.howler?.once('play', () => {
                this.player.howler?.fade(0, this.player.volume, PLAY_PAUSE_FADE_DURATION);
                this.player.playing = true
                this.saveSelfToLocalStorage()
            });
        },

        playOrPause() {
            if (this.player.howler?.playing()) {
                this.pause();
            } else {
                this.play();
            }
        },
        /**
         * 移动歌曲进度
         * @param time 时间
         * @returns
         */
        seek(time?: number) {
            if (time !== null) {
                this.player.howler?.seek(time);
                // if (this._playing)
                // this._playDiscordPresence(this._currentTrack, this.seek());
            }
            this.player.howler && this.player.howler.seek();
            this.saveSelfToLocalStorage()
            return
        },

        /**
         * 静音
         */
        mute() {
            if (this.player.volume === 0) {
                this.player.volume = this.player.volumeBeforeMuted;
            } else {
                this.player.volumeBeforeMuted = this.player.volume;
                this.player.volume = 0;
            }
            this.saveSelfToLocalStorage()
            Howler.volume(this.player.volume);
        },

        /**
         * 替换当前播放歌曲列表
         * @param trackIDs 歌曲列表 number[]
         * @param playlistSourceID 播放列表中的某一首的id
         * @param playlistSourceType 播放歌曲类型
         * @param autoPlayTrackID 如果传入autoPlayTrackID表示开始播放这首歌  否则从第一首开始
         */
        replacePlaylist(
            trackIDs: number[],
            playlistSourceID: number,
            playlistSourceType: string,
            autoPlayTrackID = -1,
        ) {
            this.player.isPersonalFM = false;
            if (!this.player.enabled) this.player.enabled = true;
            this.player.list = trackIDs;
            this.player.current = 0; // 这里不应是0 应该根据具体点击的是哪首歌对应的索引 TODO
            this.player.playlistSource = {
                type: playlistSourceType,
                id: playlistSourceID,
            };
            // if (this.shuffle) this.shuffleTheList(autoPlayTrackID);
            if (autoPlayTrackID === -1) {
                // 播放第一首
                this.replaceCurrentTrack(this.player.list[0]);
            } else {
                // 如果传了歌曲 id ==> autoPlayTrackID 播放该首歌
                this.player.current = trackIDs.indexOf(autoPlayTrackID);
                this.replaceCurrentTrack(autoPlayTrackID);
            }
        },
        // shuffleTheList(firstTrackID = currentTrack.id) {
        //     let list = this.list.filter(tid => tid !== firstTrackID);
        //     if (firstTrackID === -1) list = this.list;
        //     this.shuffledList = shuffleAList(list);
        //     if (firstTrackID !== -1) this.shuffledList.unshift(firstTrackID);
        // },

        /**
         * 通过id播放专辑
         * @param id 专辑id
         * @param trackID 专辑中某一首歌的id
         */
        playAlbumByID(id: number, trackID = -1) {
            getAlbumInfo({ id }).then(data => {
                let trackIDs = data.songs.map(t => t.id);
                this.replacePlaylist(trackIDs, id, 'album', trackID);
            });
        },

        /**
         * 通过id播放歌单
         * @param id
         * @param trackID 歌单内某一首歌曲id
         * @param noCache
         */
        playPlaylistByID(id: number, trackID = -1) {
            getSongListDetail({ id }).then(data => {
                let trackIDs = data.playlist.trackIds!.map(t => t.id);
                this.replacePlaylist(trackIDs, id, 'playlist', trackID);
            });
        },

        /**
         * 通过id播放歌手歌曲
         * @param id 歌手id
         * @param trackID
         */
        playArtistByID(id: number, trackID = -1) {
            getSingelSingerSong({ id }).then(data => {
                let trackIDs = data.hotSongs.map(t => t.id);
                this.replacePlaylist(trackIDs, id, 'artist', trackID);
            });
        },

        /**
         * 通过id播放列表中的数据
         * @param id 歌曲id
         * @param listName 如果是默认的话说明是同一个歌单，更改当前的播放索引
         */
        playTrackOnListByID(id: number, listName = 'default') {
            if (listName === 'default') {
                this.player.current = this.player.list.findIndex(t => t === id);
            }
            this.replaceCurrentTrack(id);
        },


        /**
         * 添加到播放列表 并且播放
         * @param trackID 歌曲id
         * @param playNow 是否立即播放
         * @param type 类型 追加 | 头添加 | 中间添加
         */
        addTrackToPlayNext(trackID: any, playNow = false, type: "push" | "unshift" | "splice") {
            this.player.playNextList.push(trackID);
            if (playNow) {
                if (this.player.isPersonalFM) {
                    this.playNextFMTrack();
                } else {
                    this.playNextTrack();
                }
            }
        },

        /**
         * 插入单首歌曲到播放列表中 并且播放
         * @param trackID
         */
        addTrackToPlay(trackID: number) {
            // 如果当前列表能找到这个歌曲就不用往里面插入了，找到索引直接播放即可
            const idx = this.player.list.findIndex(item => item === trackID)
            if (idx === -1) {
                this.player.list.splice(this.player.current + 1, 0, trackID)
                // this.playNextTrack()
                // 下一首id和索引
                this.player.current = this.player.current + 1!;
            } else {
                this.player.current = idx
            }

            this.replaceCurrentTrack(trackID);
        },

        /**
         * 播放私人fm
         */
        playPersonalFM() {
            this.player.isPersonalFM = true;
            if (!this.player.enabled) this.player.enabled = true;
            if (this.player.currentTrack.id !== this.player.personalFMTrack.id) {
                this.replaceCurrentTrack(this.player.personalFMTrack.id).then(() =>
                    this.playOrPause()
                );
            } else {
                this.playOrPause();
            }
        },

        /**
         * 移动垃圾桶
         */
        async moveToFMTrash() {
            this.player.isPersonalFM = true;
            let id = this.player.personalFMTrack.id;
            if (await this.playNextFMTrack()) {
                fmTrash({ id });
            }
        },

        /**
         * 切换播放模式
         */
        switchRepeatMode() {
            if (this.player.repeatMode === 'on') {
                this.player.repeatMode = 'one';
            } else if (this.player.repeatMode === 'one') {
                this.player.repeatMode = 'off';
            } else {
                this.player.repeatMode = 'on';
            }
            this.saveSelfToLocalStorage()
        },

        switchShuffle() {
            this.player.shuffle = !this.player.shuffle;
            this.saveSelfToLocalStorage()
        },
        switchReversed() {
            this.player.reversed = !this.player.reversed;
            this.saveSelfToLocalStorage()
        },

        clearPlayNextList() {
            this.player.playNextList = [];
            this.saveSelfToLocalStorage()
        },
        removeTrackFromQueue(index: number) {
            this.player.playNextList.splice(index, 1);
            this.saveSelfToLocalStorage()
        },

        /**
         * 获取个人喜欢音乐列表
         */
        getLikedSongs() {
            if (!checkLogin()) return;
            getLikedSongList({ uid: useUserProfileStore().userFile?.profile?.userId }).then(res => {
                this.likedList = res.ids
            })
        },

        /**
         * 更新个人喜欢列表
         * @param id 歌曲id
         * @param flag true: 添加， false: 删除
         */
        updateLikedSong(id: number, flag: boolean) {
            if (flag) {
                return this.likedList.push(id)
            }
            const idx = this.likedList.findIndex(item => item === id)
            this.likedList.splice(idx, 1)

        }

    },
    // persist: true
})
export default usePlayerStore