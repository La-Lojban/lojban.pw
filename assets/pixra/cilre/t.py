import os
import cv2
from imwatermark import WatermarkDecoder, WatermarkEncoder
def testit(img_path):
    bgr = cv2.imread(img_path)
    decoder = WatermarkDecoder('bytes', 136)
    watermark = decoder.decode(bgr, 'dwtDct')
    try:
        dec = watermark.decode('utf-8')
    except:
        dec = ""
    return dec

check = True
# Get the current directory
current_dir = os.getcwd()+""

if check == True:
    current_dir=current_dir

# Get a list of all files in the current directory
files = os.listdir(current_dir)

# Iterate over each file
for file in files:
    # Construct the full file path
    file_path = os.path.join(current_dir, file)

    # Check if the file is a regular file (not a directory)
    if os.path.isfile(file_path) and os.path.splitext(file)[1]=='.png':
        # Apply the testit command to the file
        res = testit(file_path)
        if res != '':
            print((res), file)

        if check == False:
            bgr = cv2.imread(file_path)
            wm = 'jbo'

            encoder = WatermarkEncoder()
            encoder.set_watermark('bytes', wm.encode('utf-8'))
            bgr_encoded = encoder.encode(bgr, 'dwtDct')

            cv2.imwrite(os.path.join(current_dir, 'archive', file), bgr_encoded)
