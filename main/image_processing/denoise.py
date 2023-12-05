import os
import cv2

def denoiseImage(input_image: str | os.PathLike, outfile_path: str | os.PathLike ):
    img = cv2.imread(input_image)

    # Denoising
    dst = cv2.fastNlMeansDenoising(img,None,1,7,21)

    cv2.imwrite(outfile_path, dst)
