import fs from 'fs/promises';
import path from 'path';
import { Client } from "@gradio/client";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust paths to project root
// src/lib/korpora -> ../../../
const ROOT_DIR = path.resolve(__dirname, '../../..');
const INPUT_DIR = path.join(ROOT_DIR, 'data/source_assets/cilre-lowres');
const OUTPUT_DIR = path.join(ROOT_DIR, 'data/source_assets/cilre-upscaled');

async function upscaleImage(filename) {
    const inputPath = path.join(INPUT_DIR, filename);
    const outputPath = path.join(OUTPUT_DIR, filename);

    try {
        await fs.access(outputPath);
        console.log(`Skipping ${filename} (already exists)`);
        return;
    } catch {
        // File doesn't exist, proceed
    }

    console.log(`Processing ${filename}...`);

    const MAX_RETRIES = 5;
    const RETRY_DELAY_MS = 30000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Read file as Blob
            const imageBuffer = await fs.readFile(inputPath);
            const imageBlob = new Blob([imageBuffer]);
    
            const token = process.env.HF_TOKEN;
            if (!token) console.warn("Warning: No HF_TOKEN provided in environment variables.");
            // else console.log(`Using token starting with: ${token.substring(0, 5)}...`); // Reduce log spam
    
            const client = await Client.connect("gokaygokay/TileUpscalerV2", { 
                token,
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            // Using defaults from the API description for better results
            const result = await client.predict("/wrapper", { 
                param_0: imageBlob, 		
                param_1: 1024,   // Resolution (Default: 1024)
                param_2: 20,     // Inference Steps (Default: 20)
                param_3: 0.1,    // Strength (Default: 0.2)
                param_4: 0,      // HDR Effect (Default: 0)
                param_5: 6,      // Guidance Scale (Default: 6)
                param_6: 0.75,   // ControlNet Strength (Default: 0.75)
                param_7: "DDIM", // Scheduler (Default: "DDIM")
            });
    
            if (result.data && result.data.length > 0) {
                let output = result.data[0];
                
                // Handle if output is an array (e.g. Gallery or multiple images)
                if (Array.isArray(output)) {
                    if (output.length > 1) {
                         output = output[1];
                    } else if (output.length > 0) {
                         output = output[0];
                    }
                }
                
                let bufferToSave;
    
                if (output instanceof Blob) {
                     bufferToSave = Buffer.from(await output.arrayBuffer());
                } else if (output?.url) {
                     const response = await fetch(output.url);
                     bufferToSave = Buffer.from(await response.arrayBuffer());
                } else {
                     console.log("Output type:", typeof output);
                     if (output?.path) {
                         const fileUrl = output.url; 
                         if (fileUrl) {
                            const response = await fetch(fileUrl);
                            bufferToSave = Buffer.from(await response.arrayBuffer());
                         }
                     }
                }
    
                if (bufferToSave) {
                    await fs.writeFile(outputPath, bufferToSave);
                    console.log(`Saved ${filename}`);
                    return; // Success, exit function
                } else {
                    throw new Error(`Failed to interpret output: ${JSON.stringify(output)}`);
                }
            } else {
                throw new Error("No result data from API");
            }
    
        } catch (err) {
            console.error(`Error processing ${filename} (Attempt ${attempt}/${MAX_RETRIES}):`, err.message || err);
            if (attempt < MAX_RETRIES) {
                console.log(`Waiting ${RETRY_DELAY_MS/1000}s before retrying...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            } else {
                console.error(`Failed to upscale ${filename} after ${MAX_RETRIES} attempts.`);
            }
        }
    }
}

async function main() {
    try {
        // Ensure output dir exists (though we created it in step 1, good practice)
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        const files = await fs.readdir(INPUT_DIR);
        const webpFiles = files.filter(file => file.endsWith('.webp'));
        
        console.log(`Found ${webpFiles.length} webp files to process.`);
        
        // Process sequentially to be nice to the API
        for (const file of webpFiles) {
            await upscaleImage(file);
        }
    } catch (err) {
        console.error("Main error:", err);
    }
}

main();
