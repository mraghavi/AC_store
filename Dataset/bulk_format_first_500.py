import json

# Use forward slashes in the file paths
input_file = 'D:/personal learnings/mern_website/Dataset/Amazon-Products.json'  # Forward slashes
output_file = 'D:/personal learnings/mern_website/Dataset/bulk_data_first_500.json'  # Forward slashes

# Read the input JSON file
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Limit to the first 500 products
first_500_products = data[:500]

# Open the output file for writing the bulk ingest formatted data
with open(output_file, 'w', encoding='utf-8') as bulk_file:
    for i, record in enumerate(first_500_products):
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

print(f"First 500 products have been successfully converted to bulk format and saved as {output_file}")
