#!groovy

// @Library('slackNotifications-shared-library@main') _

pipeline {
    agent any
    //install the following tool is jenkins
    tools {
        maven 'Maven'
//        jdk 'JDK'
        nodejs 'Nodejs'
    }

    stages {
        stage('Initial-Checks') {
            steps {
                sendNotifications 'STARTED'
                sh "npm -v"
                sh "mvn -v"
        }}  
        stage('Policy-Code Analysis') {
            steps {
                sh "npm install -g apigeelint"
                sh "apigeelint -s hello-world/apiproxy/ -f codeframe.js"
            }
        }
        stage('Unit-Test-With-Coverage') {
            steps {
                script {
                    try {
                        sh "npm install request-promise"
                        sh "npm install"
                        sh "npm test test/unit/*.js"
                        sh "npm run coverage"
                    } catch (e) {
                        throw e
                    } finally {
                        sh "cd coverage && cp cobertura-coverage.xml $WORKSPACE"
                        step([$class: 'CoberturaPublisher', coberturaReportFile: 'cobertura-coverage.xml'])
                    }
                }
            }
        }
        stage('Approval') {
            steps {
                script {
                    def approval = input message: 'Approve to deploy in production', ok: 'Approve'
                    echo "Approval: ${approval}"
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                 // service account key from  credentials 
                withCredentials([file(credentialsId: 'apigeeuser', variable: 'MY_FILE')]) {
                    echo 'My file path: $MY_FILE'
                    //deploy using maven plugin and replace email and orgs value 
                    sh "mvn -f ./hello-world/pom.xml install -Peval -Dorg=prefab-isotope-373609 -Dsafile=$MY_FILE -Demail=apigeeuser@prefab-isotope-373609.iam.gserviceaccount.com"
                }
            }
        }
    }

    post {
        always {
            // cucumberSlackSend channel: 'apigee-cicd', json: '$WORKSPACE/reports.json'
            sendNotifications currentBuild.result
        }
    }
}
