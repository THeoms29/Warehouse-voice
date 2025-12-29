FROM php:8.2-cli
# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*
# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
# Install Composer manually
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Verify Composer is installed
RUN composer --version
# Set working directory
WORKDIR /app
# Copy composer files first
COPY composer.json composer.lock* ./
# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction
# Copy the rest of application
COPY . .
# Set permissions
RUN chmod -R 775 storage bootstrap/cache
# Expose port
EXPOSE 8080
# Start command
CMD ["sh", "-c", "php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=8080"]
