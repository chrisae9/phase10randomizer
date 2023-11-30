
# Phase 10 Randomizer

## Description

This project is a web application for generating random Phase 10 game phases. Built using the Fresh framework in Deno, it provides a simple and interactive way to randomize phases for the card game Phase 10. Users can view randomized phases, share the current state through a URL, and copy the URL to the clipboard.

## Features

- Randomize Phase 10 game phases.
- Shareable URL state for each randomization.
- Copy current state URL to clipboard with visual feedback.
- Responsive and user-friendly interface.

## Installation

To run this project, you have two options depending on your setup and requirements:

### 1. Running Locally Using `local.sh`:

This method uses a script to start a Docker container where you can run Deno.

1. **Start the Docker Container**:

   Execute the `local.sh` script to start a Docker container pre-configured for Deno development:

   ```bash
   ./local.sh
   ```

   This script initializes a Docker container with the necessary environment for running the app.

2. **Run the App Inside the Container**:

   Once inside the Docker container, start the application by running:

   ```bash
   deno task start
   ```

   This will start the development server inside the container.

### 2. Running Using Docker Compose:

This method is suitable for hosting the app on a server, making it accessible on port 6116.

1. **Start the App with Docker Compose**:

   Use the following command to start the application using Docker Compose:

   ```bash
   docker-compose up
   ```

   This command reads the `docker-compose.yml` file in your project and starts the application as specified.

2. **Access the App**:

   Once the application is running, it can be accessed on your server at `http://localhost:6116`.

## Usage

Once the application is running, use the following functionalities:

- **Randomize Phases**: Click on the 'Randomize' button to generate a new set of random phases.
- **Copy URL**: Click on the 'Copy URL' button to copy the current state's URL to your clipboard. A visual cue will confirm the action.
- **Shareable URL**: Share the current state of the application via URL.

## Contributing

Contributions to this project are welcome. Please ensure to follow the existing code style and add unit tests for any new or changed functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
