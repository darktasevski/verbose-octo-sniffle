#!/usr/bin/env python3

# import pprint
import json


def parse_video_info(info_file):
    video_info = {}

    start_mode = False
    resolution_mode = False
    with open(info_file) as fp:
        for line in fp:
            if line.startswith('site:'):
                video_info['site'] = line.replace('site:', '').strip()
            elif line.startswith('title:'):
                video_info['title'] = line.replace('title:', '').strip()
            elif '[ DASH ] ____________________________________' in line:
                start_mode = True
                resolutions = []
            elif '- itag:' in line and start_mode:
                resolution_mode = True
                resolution = {}
            elif resolution_mode and 'container:' in line:
                resolution['container'] = line.strip().replace('container:', '').strip()
            elif resolution_mode and 'quality:' in line:
                resolution['quality'] = line.strip().replace('quality:', '').strip()
            elif resolution_mode and 'size:' in line:
                resolution['size'] = line.strip().replace('size:', '').strip()
            elif resolution_mode and '# download-with:' in line:
                resolution['download-with'] = line.strip().replace(
                    '# download-with:', '').replace('[4m', '').replace(' [URL][0m', '').strip()
                resolutions.append(resolution)
                resolution_mode = True
            else:
                pass
    video_info['resolutions'] = resolutions
    return video_info



if __name__ == '__main__':
    video = parse_video_info('video_info.txt')
    # pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(video)
    print(json.dumps(video, indent=4))
    resolutions = video.get('resolutions')
