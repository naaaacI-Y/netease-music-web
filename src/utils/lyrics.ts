import { LyricsResult, LyricUser } from "@/service/api/music/types";
export type LyricItem = { time: number, rawTime: string, content: string }

// regexr.com/6e52n
const extractLrcRegex = /^(?<lyricTimestamps>(?:\[.+?\])+)(?!\[)(?<content>.+)$/gm;
const extractTimestampRegex = /\[(?<min>\d+):(?<sec>\d+)(?:\.|:)*(?<ms>\d+)*\]/g;


/**
 * @param {string} content
 */
const trimContent = (content: string) => {
    let t = content.trim();
    return t.length < 1 ? content : t;
}

/**
 * 二分查找单行歌词在所有歌词中是第几项
 * @param lyric
 * @param parsedLyrics
 * @param playingTime 播放进度，根据进度查找是第几行
 * @returns
 */
export const binarySearch = (parsedLyrics: LyricItem[], lyric?: LyricItem, playingTime?: number) => {
    let time = lyric?.time || playingTime;

    let low = 0;
    let high = parsedLyrics.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midTime = parsedLyrics[mid].time;
        if (midTime === time) {
            return mid;
        } else if (midTime < time!) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return low;
};
export type ParseResult = {
    lyric: LyricItem[]
    lyricuser?: LyricUser;
    transuser?: LyricUser;
}
export const lyricParser = (lrc: LyricsResult): ParseResult => {
    const lyric = parseLyric(lrc?.lrc?.lyric || '')
    const tlyric = parseLyric(lrc?.tlyric?.lyric || '')
    if (tlyric.length) {
        tlyric.forEach(item => {
            // 查找中文歌词在英文歌词当中是第几行
            const idx = binarySearch(lyric, item)
            lyric[idx].content += `&&${item.content}` // 为了不破坏结构，使用&&连接中英文歌词,可能会有问题
        })
    }
    return {
        lyric,
        // tlyric: parseLyric(lrc?.tlyric?.lyric || ''), // 如果是英文歌曲 会有对应的中文歌词
        lyricuser: lrc.lyricUser,
        transuser: lrc.transUser,
    };
}




/**
 * 解析歌词字符串
 * @param {string} lrc 歌词.
 * @returns {ParsedLyric[]}
 * @example 要解析的结构("[00:00.00] Hello, World!\n[00:00.10] Test\n")
 */
const parseLyric = (lrc: string) => {
    const parsedLyrics: LyricItem[] = [];
    for (const line of lrc.trim().matchAll(extractLrcRegex)) {
        const { lyricTimestamps, content } = line.groups as any;
        for (const timestamp of lyricTimestamps.matchAll(extractTimestampRegex)) {
            const { min, sec, ms } = timestamp.groups;
            const rawTime = timestamp[0];
            const time = Number(min) * 60 + Number(sec) + Number(ms ?? 0) * 0.001;
            const parsedLyric = { rawTime, time, content: trimContent(content) };
            // parsedLyrics.splice(binarySearch(parsedLyric), 0, parsedLyric);
            parsedLyrics.push(parsedLyric)
        }
    }
    return parsedLyrics;
}


