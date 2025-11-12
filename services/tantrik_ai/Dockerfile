# Use an officially supported Python 3.11 image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Avoid buffering (helpful for logs)
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Copy requirements first for layer cache
COPY requirements.txt .

# Use a non-root user
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Use a small entrypoint via gunicorn for production
CMD ["gunicorn", "app:app", "--workers", "1", "--bind", "0.0.0.0:8080", "--timeout", "120"]
