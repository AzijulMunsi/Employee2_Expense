# Use Python base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (better for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose service port
EXPOSE 5002

# Run the service
CMD ["python", "app.py"]
