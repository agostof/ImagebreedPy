import os
import cv2

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
