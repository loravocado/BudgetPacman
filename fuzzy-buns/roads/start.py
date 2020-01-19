import urllib
import json
import apis
import time
import sys
from LatLon import Latitude, Longitude, LatLon

PELLET_DIST = 0.01
ROADS_API = "https://roads.googleapis.com/v1/nearestRoads"

radius = 0.5

def carpet_bomb(x, y, r):
    n = int(round(2*(r / PELLET_DIST)))

    pellets = [None] * (n * n)
    
    middle = LatLon(Latitude(x), Longitude(y))

    pelletAlpha = middle.offset(315, r)

    for i in range(0, n):
        pellets[n * i] = pelletAlpha.offset(180, PELLET_DIST * i)
        for j in range(1, n):
            pellets[n * i + j] = pellets[n * i].offset(90, PELLET_DIST * j)
    
    return pellets


def get_snapped(pts):
    processed = 0
    snapped = []

    n = len(pts)

    while n - processed > 0:
        if n - processed > 100:
            pt_list = pts[processed : processed + 100]
            params = [None] * 100
        else:
            pt_list = pts[processed : ]
            params = [None] * len(pt_list)

        for pt in pt_list:
            params[processed % 100] = str(pt.lat) + ',' + str(pt.lon)
            processed += 1
        
        snap_back = json.loads(urllib.urlopen(ROADS_API + '?points=' + '|'.join(params) + '&key=' + apis.KEY).read())

        if snap_back.has_key('snappedPoints'):

            hit_num = set()

            for item in snap_back['snappedPoints']:
                if item['originalIndex'] not in hit_num:
                    hit_num.add(item['originalIndex'])
                    snapped.append(LatLon(item['location']['latitude'], item['location']['longitude']))
    
    return snapped

def final_pass(pts):

    fin = []

    i = 0

    while i < len(pts):
        j = i + 1
        while j < len(pts):
            if pts[i].distance(pts[j]) < 0.007:
                del pts[j]
            else:
                j += 1
        fin.append(pts[i])
        i += 1

    return fin
        
        


if __name__ == "__main__":
    pellets = carpet_bomb(float(sys.argv[1]), float(sys.argv[2]), radius)
    snapped = get_snapped(pellets)
    for item in final_pass(snapped):
        print(item)
