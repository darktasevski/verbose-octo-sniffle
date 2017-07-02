#!/usr/bin/env python3

import sys
import subprocess

import parse_video_info
import highest_resolutions_video_cmd

def you_get_i_url(video_url):
    # print(video_url)
    if video_url.startswith('/watch?'):
        youtube_video = 'https://www.youtube.com' + video_url
    elif video_url.startswith('https://www.youtube.com'):
        youtube_video = video_url
    else:
        print('Not supported URL, exit.')
        sys.exit(1)
    p = subprocess.Popen(['you-get' , '-i', '{0}'.format(youtube_video)],
                        stdout = subprocess.PIPE, stderr = subprocess.STDOUT)
    p.wait()

    video_info = p.stdout.read().decode('utf8')
    with open('video_info.txt', 'w') as fp:
        fp.write(video_info)
    return video_info


if __name__ == '__main__':
    you_get_i_url(sys.argv[1])
    video = parse_video_info.parse_video_info('video_info.txt')
    final_you_get_cmd = highest_resolutions_video_cmd.get_highest_resolution_video_cmd(video)
    if not final_you_get_cmd:
        print('No highest resolution mp4 format found!')
        sys.exit(1)
    if sys.argv[1].startswith("https://www.youtube.com"):
        print(final_you_get_cmd + ' "' + sys.argv[1] + '"')
    else:
        print(final_you_get_cmd + ' "https://www.youtube.com' + sys.argv[1].strip('"') + '"')

