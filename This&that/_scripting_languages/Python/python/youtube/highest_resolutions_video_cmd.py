#!/usr/bin/env python3

import parse_video_info

def get_highest_resolution_video_cmd(video_json_info):
    resolutions = video_json_info.get('resolutions')
    max_resolution = 0
    final_you_get_cmd = None
    for resolution in resolutions:
        quality = resolution.get('quality')
        container = resolution.get('container')
        if quality[0].isalpha():
            pass
        else:
            you_get_cmd = resolution.get('download-with')
            width, height = quality.split('x')
            current_resolution = int(width) * int(height)
            if current_resolution >= max_resolution and container == 'mp4':
                max_resolution = current_resolution
                final_you_get_cmd = you_get_cmd

    return final_you_get_cmd


if __name__ == '__main__':
    video = parse_video_info.parse_video_info('video_info.txt')
    final_you_get_cmd = get_highest_resolution_video_cmd(video)
    print(final_you_get_cmd)
