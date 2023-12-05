# USAGE
# python /home/nmorales/cxgn/DroneImageScripts/ImageStitching/PanoramaStitchZipfile.py --zipfile_path /home/myimagezipfile.zip --extract_path /home/unzip/here/ --outfile_path /export/archive/mystitchedimage.png

# import the necessary packages
import argparse
import cv2
import zipfile
from pathlib import Path
import datetime

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--zipfile_path", required=True, help="complete file path to zipfile with images")
ap.add_argument("-e", "--extract_path", required=True, help="file path where to extract images")
ap.add_argument("-o", "--outfile_path", required=True, help="complete file path for output stitched image")
args = vars(ap.parse_args())

zipfile_path = Path(args["zipfile_path"])
extract_path = Path(args["extract_path"])
outfile_path = Path(args["outfile_path"])

start_time = datetime.datetime.now()

images = []
zfile = zipfile.ZipFile(file=zipfile_path)
zfile.extractall(path=extract_path)
# print(zfile.infolist())
for finfo in zfile.infolist():
    file_name = extract_path / finfo.filename
    if file_name.is_file():
        # print(file_name)
        image = cv2.imread(str(file_name))
        images.append(image)

zip_extract_time = datetime.datetime.now() - start_time
print(f"Extracted {len(images)} images in {zip_extract_time.seconds} seconds ({zip_extract_time})")
start_time = datetime.datetime.now()

stitcher = cv2.Stitcher.create(cv2.Stitcher_PANORAMA) #Try GPU #Stitcher::SCANS or Stitcher::PANORAMA
stitch_result = stitcher.stitch(images)
status = stitch_result[0]
print(status)
# OK = 0
# ERR_NEED_MORE_IMGS = 1
# ERR_HOMOGRAPHY_EST_FAIL = 2
# ERR_CAMERA_PARAMS_ADJUST_FAIL = 3
result = stitch_result[1]

cv2.imwrite(str(outfile_path), result)
#cv2.imshow("Result", result)
#cv2.imwrite("streakedimage.png", result)
#cv2.waitKey(0)


image_stitch_time = datetime.datetime.now() - start_time
print(f"Stitched images in {image_stitch_time.seconds} seconds ({image_stitch_time})")
