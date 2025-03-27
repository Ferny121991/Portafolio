# Portfolio Website with PHP Contact Form

This portfolio website is built with React, TypeScript, and Vite, featuring a PHP-powered contact form.

## Setup Instructions

### 1. Running the React Application

To start the React development server:

```bash
npm run dev
```

This will start the Vite development server, typically on http://localhost:5173.

### 2. Setting Up the PHP Server

For the contact form to work, you need to run a PHP server alongside your React application. You can use PHP's built-in server:

```bash
cd public
php -S localhost:8000
```

This will start a PHP server on port 8000, which will handle your contact form submissions.

### 3. How the Contact Form Works

The contact form in your portfolio site:

1. Collects user input (name, email, message)
2. Sends data to the PHP backend (`/api/enviar.php`)
3. PHP processes the form data and sends an email
4. Returns success/error messages to the frontend

### 4. Configuration

- **Email Recipient**: Edit the `$destinatario` variable in `public/api/enviar.php` to change where form submissions are sent.
- **Email Subject**: Modify the `$asunto` variable to customize the email subject line.

### 5. Production Deployment

When deploying to production:

1. Build your React app: `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Make sure to copy the `public/api` folder to your server
4. Configure your server to handle PHP files

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- PHP (for form processing)

## Notes

- The contact form is configured to work with the PHP `mail()` function, which requires a properly configured mail server.
- For local development, you may need to configure a local mail server or use a service like Mailtrap for testing.
