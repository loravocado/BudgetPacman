import urllib
import json
from LatLon import Latitude, Longitude, LatLon

PELLET_DIST = 0.01
ROADS_API = "https://roads.googleapis.com/v1/nearestRoads"
ROADS_API_KEY = "AIzaSyD2bOeRG2HdczvPBMfE1E0CppzngijYcp0"

cord_x = 45
corc_y = 45

radius = 1

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

    # while n - processed > 0:
    if n - processed > 100:
        pt_list = pts[processed : processed + 100]
        params = [None] * 100
    else:
        pt_list = pts[processed : ]
        params = [None] * len(pt_list)

    for pt in pt_list:
        params[processed % 100] = str(pt.lat) + ',' + str(pt.lon)
        processed += 1
    
    snap_back = json.loads(urllib.urlopen(ROADS_API + '?points=' + '|'.join(params) + '&key=' + ROADS_API_KEY).read())

    hit_num = set()

    for item in snap_back['snappedPoints']:
        if item['originalIndex'] not in hit_num:
            hit_num.add(item['originalIndex'])
            snapped.append(LatLon(item['location']['latitude'], item['location']['longitude']))
    
    return snapped

def final_pass(pts):
    for pt in pts:
        print(pt)

    return None


if __name__ == "__main__":
    pellets = carpet_bomb(cord_x, corc_y, radius)
    snapped = get_snapped(pellets)
    final = final_pass(snapped)
