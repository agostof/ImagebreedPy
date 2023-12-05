import os
import cv2
import numpy as np

def cropToPolygon(input_image: str | os.PathLike, outfile_path: str | os.PathLike, polygon_json: list[dict], polygon_type: str = 'rectangular_polygon' ):
    polygons = polygon_json
    print(polygons)

    img = cv2.imread(input_image, cv2.IMREAD_UNCHANGED)

    if polygon_type == 'rectangular_square':
        finalImage = cropPolygonsToSingleSquareRectangularImage(img, polygons)
    elif polygon_type == 'rectangular_polygon':
        finalImage = cropPolygonsToSingleImage(img, polygons)

    cv2.imwrite(outfile_path, finalImage)


def cropPolygonsToSingleImage(input_image, polygons):
    input_image_size = input_image.shape
    original_y = input_image_size[0]
    original_x = input_image_size[1]
    minY = original_y
    minX = original_x
    maxX = -1
    maxY = -1

    for polygon in polygons:
        for point in polygon:
            x = point['x']
            y = point['y']

            x = int(round(x))
            y = int(round(y))
            point['x'] = x
            point['y'] = y

            if x < minX:
                minX = x
            if x > maxX:
                maxX = x
            if y < minY:
                minY = y
            if y > maxY:
                maxY = y

    cropedImage = np.zeros_like(input_image)
    for y in range(0,original_y):
        for x in range(0, original_x):

            if x < minX or x > maxX or y < minY or y > maxY:
                continue

            for polygon in polygons:
                polygon_mat = []
                for p in polygon:
                    polygon_mat.append([p['x'], p['y']])

                if cv2.pointPolygonTest(np.asarray([polygon_mat]),(x,y),False) >= 0:
                    if len(input_image_size) == 3:
                        for j in range(input_image_size[2]):
                            cropedImage[y, x, j] = input_image[y, x, j]
                    else:
                        cropedImage[y, x] = input_image[y, x]

    # Now we can crop again just the envloping rectangle
    finalImage = cropedImage[minY:maxY,minX:maxX]

    return finalImage


def cropPolygonsToSingleSquareRectangularImage(input_image, polygons):
    pts_array = []
    for polygon in polygons:
        for point in polygon:
            x = point['x']
            y = point['y']

            x = int(round(x))
            y = int(round(y))
            pts_array.append([x,y])

    pts = np.array(pts_array)
    rect = cv2.boundingRect(pts)
    x,y,w,h = rect
    finalImage = input_image[y:y+h, x:x+w]

    return finalImage