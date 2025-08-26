# Use a lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements (create this if not present)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files into container
COPY . .

# Expose port
EXPOSE 5001

# Run the app
CMD ["python", "app.py"]
