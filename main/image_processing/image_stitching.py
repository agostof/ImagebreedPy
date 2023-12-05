import cv2
import datetime
import os
import asyncio

async def stitchImages(image_paths: list[str | os.PathLike], out_path: str | os.PathLike):
    print("begin stitching images")
    start_time = datetime.datetime.now()
    
    await asyncio.sleep(20)

    images = []
    for path in image_paths:
        if path.is_file():
            image = cv2.imread(str(path))
            images.append(image)

    stitcher = cv2.Stitcher.create(cv2.Stitcher_PANORAMA) #Try GPU #Stitcher::SCANS or Stitcher::PANORAMA
    status, result = stitcher.stitch(images)
    print(f"stitching status: {status}")

    # OK = 0
    # ERR_NEED_MORE_IMGS = 1
    # ERR_HOMOGRAPHY_EST_FAIL = 2
    # ERR_CAMERA_PARAMS_ADJUST_FAIL = 3

    cv2.imwrite(str(out_path), result)

    image_stitch_time = datetime.datetime.now() - start_time
    print(f"Stitched images in {image_stitch_time.seconds} seconds ({image_stitch_time})")
