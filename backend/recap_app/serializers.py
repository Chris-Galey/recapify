from rest_framework import serializers
from .models import Recap, RecapSummary, RecapTranscript

class RecapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recap
        fields = '__all__'

class RecapSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecapSummary
        fields = '__all__'

class RecapTranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecapTranscript
        fields = '__all__'