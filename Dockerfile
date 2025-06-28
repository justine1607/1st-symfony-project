# Use official PHP image with required extensions
FROM php:8.2

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git unzip curl zip libzip-dev libicu-dev libpng-dev \
    libonig-dev libxml2-dev nodejs npm && \
    docker-php-ext-install intl pdo pdo_mysql zip opcache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Set the working directory
WORKDIR /app

# Copy all project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts && \
    ls -al /app/vendor/autoload_runtime.php


# Install and build frontend assets
RUN npm install && npm run build

# Set environment variables
ENV APP_ENV=prod
ENV APP_DEBUG=0

# Expose the Symfony app on port 8000
EXPOSE 8080

# Start the Symfony app using PHP's built-in server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]

