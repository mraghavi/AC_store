import json

# Use forward slashes in the file paths
input_file = 'D:/personal learnings/mern_website/Dataset/Amazon-Products.json'  # Forward slashes
output_file = 'D:/personal learnings/mern_website/Dataset/bulk_data.json'  # Forward slashes

# Read the input JSON file
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Open the output file for writing the bulk ingest formatted data
with open(output_file, 'w', encoding='utf-8') as bulk_file:
    for i, record in enumerate(data):
        # Create the action line with index metadata (replace 'amazon-products' with your index name)
        action_line = {
            "index": {
                "_index": "amazon-products",  # OpenSearch index name
                "_id": i + 1  # Unique document ID, you can adjust this as needed
            }
        }
        # Write the action line
        bulk_file.write(json.dumps(action_line) + '\n')
        # Write the data line (the actual product record)
        bulk_file.write(json.dumps(record) + '\n')

print(f"Data has been successfully converted to bulk ingest format and saved as {output_file}")
