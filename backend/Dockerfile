# Using official python base image
FROM python:3.9-slim-buster as builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Work directory
WORKDIR /app
COPY ./pyproject.toml ./poetry.lock /app/

# Install poetry
RUN pip install poetry
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

# Now, we build the final, smaller image
FROM python:3.9-slim-buster

# Copy files from builder and install dependencies
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY . /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app

# Run the application
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


