FROM python:3.12-slim
WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from root (assuming context is root)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy only the backend folder
COPY . .

# Set working directory to where app.py is
WORKDIR /app/backend

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
