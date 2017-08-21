#!/usr/bin/env python3

import sys
import json

def get_uuid(res_rt, res_text_file = 'res.txt'):
    data = None
    with open(res_text_file) as fp:
        data = fp.read()

    resources = json.loads(data)
    for resource in resources:
        if resource.get('links')[0].get('href') == res_rt:
            return resource.get('di')
    else:
        return None


if __name__ == '__main__':
    uuid = get_uuid(sys.argv[1])
    if uuid:
        print(uuid)
    else:
        sys.exit(1)
