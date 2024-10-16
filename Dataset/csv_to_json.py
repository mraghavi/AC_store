import pandas as pd
import os

# Get the absolute path of the current script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Build the path to the CSV file
csv_file = os.path.join(current_directory, 'Amazon-Products.csv', 'Amazon-Products.csv')

# Load the CSV file into a pandas DataFrame
df = pd.read_csv(csv_file)

# Convert the DataFrame to JSON format
json_data = df.to_json(orient='records', indent=2)

# Save the JSON data to a file in the same directory as the script
json_file = os.path.join(current_directory, 'Amazon-Products.json')
with open(json_file, 'w') as f:
    f.write(json_data)

print(f'CSV has been successfully converted to JSON and saved as {json_file}')
