# App Name: Recapify

## Description

Recapify is your ultimate audio companion, designed to streamline and simplify the way you manage and digest your important discussions. With Recapify, lengthy audio files and complex conversations become effortlessly manageable.

## Key Features

Audio Summaries: Transform lengthy audio into concise, actionable summaries. Recapify's intelligent algorithms capture the essence of your discussions, ensuring you never miss a crucial point.

Effortless Storage: Store all your audio transcripts securely in one place. Easily access past audio whenever you need to reference key information.

Customization: Tailor your summaries to fit your unique needs. Choose the type of summary, highlights, and models you want to emphasize.

Actionable Insights: Identify action items, follow-ups, and decisions made during your audio files, turning insights into actions.

Search and Retrieve: Quickly find the information you need with a powerful search function. No more digging through pages of notes or transcripts.

Recapify simplifies the audio experience, helping you stay organized, make informed decisions, and drive productivity. Make every recording count with Recapify. Try it today and experience more productive, efficient recordings.

## HOW TO USE

## COMPOSE LOCAL DEVELOPMENT

1. Generate new django secret key ex. --> python manage.py shell -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
2. RUN-COMPOSE-LOCAL.SH, enter assemblyAI api key (signup for free test key) and Django secret key
3. CD into frontend -- npm install -- npm run dev

## COMPOSE DEVELOPMENT (PRE LAUNCH)

1. RUN-COMPOSE-DEV.SH with assemblyAI api key (signup for free test key) and django secret key
2. Open browser on localhost:80

## COMPOSE PRODUCTION

1. BUILD-AND-PUSH-IMAGES.sh with EC2 IP ADDRESS, updated Docker username, and version.
2. COPY SETUP-EC2.sh, docker-compose.prod.yml, RUN-COMPOSE-PROD.sh into ec2
3. RUN SETUP-EC2.sh --> RUN-COMPOSE-PROD.sh with all required environment variables.
