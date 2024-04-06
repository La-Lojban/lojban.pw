#!/bin/bash

# Loop through each .webp file in the current directory
for file in *.webp; do
    # Extract the filename without the extension
    filename=$(basename -- "$file")
    filename="${filename%.*}"
    
    # Define the input and output file paths for the conversion
    input_file="$file"
    png_file="${filename}.png"
    
    # Convert the .webp file to .png using dwebp
    dwebp "$input_file" -o "$png_file"
    
    # Define the output file path for vtracer
    svg_file="${filename}.svg"
    
    # Apply the command to the .png file

    vtracer --input "$png_file" --output "$svg_file"
    
    # Delete the .png file after processing
    rm "$png_file"
    
    # Define the output file path for the final .webp conversion
    final_webp_file="${filename}_final.webp"
    
    # Convert the .svg file back to .webp using cairosvg
    flatpak run org.inkscape.Inkscape "$svg_file" --export-type=png --export-filename="$png_file"
    cwebp -q 100 "$png_file" -o "$final_webp_file"
    
    rm "$svg_file"
done
