import cv2
import os
import numpy as np

def rotateImage(input_image: str | os.PathLike, outfile_path: str | os.PathLike, angle: float, centered: bool = False, original_size: bool = False):
    img = cv2.imread(input_image)
    height, width = img.shape[:2]

    image_center = (width/2,height/2)
    if centered:
        image_center = (0,0)

    rotation_mat = cv2.getRotationMatrix2D(image_center,angle,1)

    abs_cos = abs(rotation_mat[0,0])
    abs_sin = abs(rotation_mat[0,1])

    bound_w = int(height * abs_sin + width * abs_cos)
    bound_h = int(height * abs_cos + width * abs_sin)

    if centered:
        rotation_mat[0, 2] += image_center[0]
        rotation_mat[1, 2] += image_center[1]
    else:
        rotation_mat[0, 2] += bound_w/2 - image_center[0]
        rotation_mat[1, 2] += bound_h/2 - image_center[1]

    bounding = (bound_w, bound_h)
    src = cv2.warpAffine(img, rotation_mat, bounding)

    if original_size:
        rotated_image_center = (bound_w/2, bound_h/2)
        original_x_offset = rotated_image_center[0] - image_center[0]
        original_y_offset = rotated_image_center[1] - image_center[1]

        original_bounds = [
            [original_x_offset, original_y_offset],
            [original_x_offset + width, original_y_offset],
            [original_x_offset + width, original_y_offset + height],
            [original_x_offset, original_y_offset + height]
        ]

        pts_array = []
        for point in original_bounds:
            x = point[0]
            y = point[1]

            x = int(round(x))
            y = int(round(y))
            pts_array.append([x,y])

        pts = np.array(pts_array)
        rect = cv2.boundingRect(pts)
        print(rect)
        x,y,w,h = rect
        src = src[y:y+h, x:x+w]

    cv2.imwrite(str(outfile_path), src)
