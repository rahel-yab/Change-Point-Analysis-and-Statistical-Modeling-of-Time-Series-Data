# Use a slim version of Python 3.12
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Install system dependencies (needed for some math libraries)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the Flask port
EXPOSE 5000

# Start with Gunicorn (4 workers is a good standard for production)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]