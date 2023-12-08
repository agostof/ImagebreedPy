import os
import cv2
import math

def resizeImage(input_image: str | os.PathLike, outfile_path: str | os.PathLike,  width = None, height = None, ):
    inter = cv2.INTER_AREA

    if width is not None:
        width = int(width)

    if height is not None:
        height = int(height)

    image = cv2.imread(str(input_image))

    dim = None
    (h, w) = image.shape[:2]

    if width is None and height is None:
        return image

    if width is not None and height is not None:
        dim = (width, height)
    elif width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))

    resized = cv2.resize(image, dim, interpolation = inter)

    cv2.imwrite(str(outfile_path), resized)

    return resized.shape[:2]

def calculateThumbnailWidthAndMultiplier(input_image: str | os.PathLike):
    image = cv2.imread(str(input_image))
    width = image.shape[1]
    multiplier = math.floor(float(width)/1000) + 1
    return width/multiplier, multiplier
    
def multiplyPolygon(polygon:list[dict], multiplier:int = 1):
    new_polygon = []
    for point in polygon:
        new_polygon.append({'x': (point['x'] * multiplier)+(multiplier/2), 'y': (point['y'] * multiplier)+(multiplier/2)})

    return new_polygon

