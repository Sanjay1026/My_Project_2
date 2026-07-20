pipeline {
    agent any

    parameters {
        choice(
            name: 'script',
            choices: ['smoke', 'regression'],
            description: 'Select the test suite to run'
        )
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Sanjay1026/My_Project_2.git'
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

        stage('Run Tests') {
            steps {
                bat "npm run ${params.script}"
            }
        }
    }
}