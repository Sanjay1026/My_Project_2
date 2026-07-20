
pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    // url: 'https://github.com/Sanjay1026/Playwright-E2E-Framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Test') {
            steps {
                bat "npm run ${params.script})"
            }   
        }
    }
}