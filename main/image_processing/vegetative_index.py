import os
import cv2
import numpy as np

def threshold_ccc(image_b, image_g, image_r):
    theta1 = 0.95
    theta2 = 0.95
    theta3 = 20

    # grab the image dimensions
    h = image_b.shape[0]
    w = image_b.shape[1]

    image = np.zeros((h,w,1), dtype=np.uint8)

    # loop over the image
    for y in range(0, h):
        for x in range(0, w):
            # threshold the pixel
            image[y, x] = 255 if image_r[y, x]/image_g[y, x] < theta1 and image_b[y, x]/image_g[y, x] < theta2 and 2*image_g[y, x] - image_r[y, x] - image_b[y, x] > theta3 else 0

    # return the thresholded image
    return image

def CCC(rgb_image_path:str = None, 
        r_image_path:str = None, 
        g_image_path:str = None, 
        b_image_path:str = None,
        outfile_path:str = None):
    
    b=None
    g=None
    r=None

    if rgb_image_path:
        img = cv2.imread(str(rgb_image_path))
        b,g,r = cv2.split(img)
    elif r_image_path and g_image_path and b_image_path:
        r = cv2.imread(str(r_image_path))
        g = cv2.imread(str(g_image_path))
        b = cv2.imread(str(b_image_path))
    else:
        return

    ccc = threshold_ccc(b,g,r)

    cv2.imwrite(str(outfile_path), ccc)

def NDRE(image_path:str = None, 
        nir_image_path:str = None, 
        re_image_path:str = None, 
        outfile_path:str = None):
    nir,re,x = None
    if image_path:
        img = cv2.imread(str(image_path))
        nir,re,x = cv2.split(img)
    elif nir_image_path and re_image_path:
        nir = cv2.imread(str(nir_image_path))
        re = cv2.imread(str(re_image_path))
    else:
        return
    
    numerator = nir - re
    denominator = nir + re
    ndre = np.divide(numerator, denominator)
    ndre[np.isnan(ndre)] = 0

    ndre = ndre * 255
    ndre = ndre.astype(np.uint8)

    cv2.imwrite(str(outfile_path), ndre)

def NDVI(image_path:str = None, 
        nir_image_path:str = None, 
        r_image_path:str = None, 
        outfile_path:str = None):
    nir,r,x = None
    if image_path:
        img = cv2.imread(str(image_path))
        nir,r,x = cv2.split(img)
    elif nir_image_path and r_image_path:
        nir = cv2.imread(str(nir_image_path))
        r = cv2.imread(str(r_image_path))
    else:
        return
        
    numerator = nir - r
    denominator = nir + r
    ndvi = np.divide(numerator, denominator)
    ndvi[np.isnan(ndvi)] = 0

    ndvi = ndvi * 255
    ndvi = ndvi.astype(np.uint8)

    cv2.imwrite(str(outfile_path), ndvi)

def TGI(rgb_image_path:str = None, 
        r_image_path:str = None, 
        g_image_path:str = None, 
        b_image_path:str = None,
        outfile_path:str = None):
    
    b=None
    g=None
    r=None

    if rgb_image_path:
        img = cv2.imread(str(rgb_image_path))
        b,g,r = cv2.split(img)
    elif r_image_path and g_image_path and b_image_path:
        r = cv2.imread(str(r_image_path))
        g = cv2.imread(str(g_image_path))
        b = cv2.imread(str(b_image_path))
    else:
        return
    
    tgi = g - 0.39*r - 0.61*b

    cv2.imwrite(str(outfile_path), tgi)

def VARI(rgb_image_path:str = None, 
        r_image_path:str = None, 
        g_image_path:str = None, 
        b_image_path:str = None,
        outfile_path:str = None):
    
    b=None
    g=None
    r=None
    if rgb_image_path:
        img = cv2.imread(str(rgb_image_path))
        b,g,r = cv2.split(img)
    elif r_image_path and g_image_path and b_image_path:
        r = cv2.imread(str(r_image_path))
        g = cv2.imread(str(g_image_path))
        b = cv2.imread(str(b_image_path))
    else:
        return
    
    numerator = g - r
    denominator = g + r - b
    vari = np.divide(numerator, denominator)
    vari[np.isnan(vari)] = 0

    vari = vari * 255
    vari = vari.astype(np.uint8)

    cv2.imwrite(str(outfile_path), vari)