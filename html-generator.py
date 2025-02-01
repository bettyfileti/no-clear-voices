import os
from datetime import datetime
import re

def is_valid_filename_format(filename):
    # Check if filename matches pattern: YYYY-MM-DD_rest-of-filename.m4a
    pattern = r'^\d{4}-\d{2}-\d{2}_.*\.m4a$'
    return bool(re.match(pattern, filename))

def generate_html_block(filename):
    if not is_valid_filename_format(filename):
        print(f"Skipping {filename} - doesn't match required format YYYY-MM-DD_description.m4a")
        return None
    
    # Extract date from filename
    date_str = filename[:10]  # Gets "YYYY-MM-DD"
    
    try:
        # Convert to datetime and format as "Month DD, YYYY"
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        formatted_date = date_obj.strftime('%B %d, %Y')
    except ValueError:
        print(f"Skipping {filename} - invalid date format")
        return None
    
    html_template = f"""                <div class="sound-item">
                    <div>
                        <h3>EDIT HERE</h3>
                        <p>Collected on {formatted_date}</p>
                        <p>EDIT HERE</p>
                    </div>
                    <figure>
                        <audio controls src="./media/{filename}">
                            Your browser does not support the
                            <code>audio</code> element.
                        </audio>
                        <figcaption>EDIT HERE</figcaption>
                    </figure>
                </div>
"""
    return html_template

def process_directory(directory_path):
    # Get all .m4a files in the directory
    audio_files = [f for f in os.listdir(directory_path) if f.endswith('.m4a')]
    
    if not audio_files:
        print(f"No .m4a files found in {directory_path}")
        return
    
    # Generate HTML for each file
    all_html = ""
    processed_count = 0
    skipped_count = 0
    
    for filename in sorted(audio_files):
        html_block = generate_html_block(filename)
        if html_block:
            all_html += html_block + "\n"
            processed_count += 1
        else:
            skipped_count += 1
    
    # Write to output file
    with open('output.html', 'w') as f:
        f.write(all_html)
    
    print(f"Processed {processed_count} files, skipped {skipped_count} files")
    print("Output written to output.html")

# Usage
if __name__ == "__main__":
    directory_path = "./media"  # Change this to your audio files directory
    process_directory(directory_path)